import { max, min, map } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

import { processValues } from '../utils';

class Bar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      reactValues: this.computeValues(props),
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.computeValues(nextProps));
  }

  computeValues(props = this.props) {

    const {
      maxAxisValue,
      minAxisValue,
      width,
      height,
      padding,
      values,
      delimiter,
    } = this.props;

    const chartValues = processValues(values, delimiter);
    const maxValue = max([max(chartValues), Number(maxAxisValue)]);
    const minValue = min(chartValues);
    const scaleDiff = maxValue - minValue;

    const reactValues = map(chartValues, (value, i) => {
      const x = this.xScale(Number(i) + padding, width, chartValues.length);
      const w = this.xScale(Number(i) + 1 - padding, width, chartValues.length) - x
      const valueY = this.yScale(value, height, scaleDiff, minValue);
      let y1 = valueY
      let y2 = valueY
      let h = 0

      if (!scaleDiff) {
        h = 1
      } else if (value < 0) {
        y1 = this.yScale(min([maxAxisValue, 0]), height, scaleDiff, minValue);
      } else {
        y2 = this.yScale(max([minAxisValue, 0]), height, scaleDiff, minValue);
      }

      h = y2 - y1

      if (h === 0) {
        h = 1
        if (maxAxisValue > 0 && scaleDiff) y1--
      }

      return {
        fill: this.fill(i),
        x,
        y: y1,
        width: w,
        height: h,
      };
    });
    return { reactValues };
  }

  fill = (i) => {
    return this.props.fill[i % this.props.fill.length];
  }

  xScale(input, width, chartValuesLength) {
    return input * (width / (chartValuesLength))
  }

  yScale(input, initialHeight, scaleDiff, minValue) {
    let yScale = initialHeight;

    if(scaleDiff) {
      yScale -= ((input - minValue) / scaleDiff) * initialHeight;
    } else {
      yScale -= 1;
    }

    return yScale;
  }

  render() {
    return (
      <svg
        className="peity peity-bar"
        height={height}
        width={width}
      >
        {
          map(this.state.reactValues, (value, index) => (<rect
                                                            key={`${index}${value.x}`}
                                                            fill={this.fill(index)}
                                                            x={value.x}
                                                            y={value.y1}
                                                            width={value.w}
                                                            height={value.h}
                                                          />))
        }
      </svg>);
  }
}


Bar.defaultProps = {
  delimiter: ",",
  fill: ["#4D89F9"],
  height: 16,
  minAxisValue: 0,
  padding: 0.1,
  width: 32,
};

Bar.propTypes = {
  values: PropTypes.any.isRequired,
  delimiter: PropTypes.string,
  fill: PropTypes.array,
  height: PropTypes.number,
  minAxisValue: PropTypes.number,
  maxAxisValue: PropTypes.number,
  padding: PropTypes.number,
  width: PropTypes.number,
};

export default Bar;
