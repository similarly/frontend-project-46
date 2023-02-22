import _ from 'lodash';

// node types: removed | none | added | updated | root
function createDiffTree(object1, object2) {
  const isObject = (val) => (_.isObject(val) && !_.isArray(val));
  const part1 = Object.entries(object1).map(([key, value1]) => {
    const value2 = object2[key];
    if (!Object.hasOwn(object2, key)) {
      return {
        key,
        value: value1,
        type: 'removed',
      };
    }
    if (Object.hasOwn(object2, key)) {
      if (_.isEqual(value1, value2)) {
        return {
          key,
          value: value1,
          type: 'none',
        };
      }
      if (isObject(value1) && isObject(value2)) {
        return {
          key,
          value: createDiffTree(value1, value2),
          type: 'updated object',
        };
      }
      return {
        key,
        oldValue: value1,
        value: value2,
        type: 'updated',
      };
    }
    return undefined;
  }).filter((el) => el);
  const part2 = Object.entries(object2).map(([key, value2]) => {
    if (!Object.hasOwn(object1, key)) {
      return {
        key,
        value: value2,
        type: 'added',
      };
    }
    return undefined;
  }).filter((node) => node !== undefined);
  return part1.concat(part2);
}

export default createDiffTree;
