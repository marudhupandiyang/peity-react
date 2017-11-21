import { split, flatten, isEqual } from 'lodash';


export function processValues(originalValues, delimiter) {
  return isEqual(typeof(originalValues), 'string')
    ? split(originalValues, delimiter).map(v => (Number(v)))
    : flatten([originalValues]);
}
