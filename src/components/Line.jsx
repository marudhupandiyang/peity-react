import { map, concat, isEmpty, each, join, slice } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';

class Line extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ...this.computeValues(props),
    };
  }

  computeValues(props = this.props) {
    const {
      values,
      max,
      min,
      strokeWidth,
      strokeColor,
      height,
      fillColor,
      width,
    } = props;

    const chartValues = this.values(values);
    const maxValue = _.max([_.max(chartValues), Number(max)]);
    const minValue = _.min([_.min(chartValues), Number(min)]);
    const chartHeight = height - strokeWidth;
    const scaleDiff = maxValue - minValue;
    const zero = this.yScale(Math.max(minValue, 0), chartHeight, strokeWidth, scaleDiff, minValue);

    const coordsFromValues = [];
    each(chartValues, (val, key) =>
         coordsFromValues.push(this.xScale(key, width, chartValues.length), this.yScale(val, chartHeight, strokeWidth, scaleDiff, minValue)));

    const coords = concat(
      [0, zero],
      coordsFromValues,
      [width, zero],
    );

    const canDrawStroke = !(isEmpty(strokeColor) || strokeWidth === 0);
    const canDrawFill = !isEmpty(fillColor);

    return {
      coords,
      canDrawStroke,
      canDrawFill,
    };
  }


  xScale(input, width, valuesLength) {
      return input * (width / (valuesLength - 1))
  }

  yScale(input, initalHeight, strokeWidth, diff, min) {
    let yScale = initalHeight;

    if (diff) {
      yScale -= ((input - min) / diff) * initalHeight;
    }

    return yScale + strokeWidth / 2;
  }

  values(values) {
    return typeof this.props.values === 'string'
      ? _.split(this.props.values, this.props.delimiter).map(v => (Number(v)))
      : _.flatten([this.props.values]);
  }

  renderFill = () => {
    if (this.state.canDrawFill) {
      // debugger;
      return (<polygon
                fill={this.props.fillColor}
                points={_.join(this.state.coords, ' ')}
              />);
    }
  }


  renderStroke = () => {
    if  (this.state.canDrawStroke) {
      return (<polyline
                fill={this.props.strokeFillColor}
                points={join(slice(this.state.coords, 2, this.state.coords.length - 2), ' ')}
                stroke={this.props.strokeColor}
                strokeWidth={this.props.strokeWidth}
                strokeLinecap="square"
              />)
    }
  }

  render() {
    const {
      height,
      width
    } = this.props;

    return (
      <svg
        className="peity peity-line"
        height={height}
        width={width}
      >
        {this.renderFill()}
        {this.renderStroke()}
      </svg>);
  }
}


Line.defaultProps = {
  delimiter: ",",
  fillColor: "#c6d9fd",
  height: 16,
  min: 0,
  max: -Infinity,
  strokeColor: "#4d89f9",
  strokeWidth: 1,
  width: 32,
  strokeFillColor: 'none',
};


Line.propTypes = {
  values: PropTypes.any.isRequired,
  delimiter: PropTypes.string,
  fillColor: PropTypes.string,
  height: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  strokeColor: PropTypes.string,
  strokeWidth: PropTypes.number,
  width: PropTypes.number,
  strokeFillColor: PropTypes.string,
};

export default Line;
