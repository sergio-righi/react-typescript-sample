/**
 * get enum value by key
 * @param {enum} enumerator enum to be used
 * @param {string} key key to be searched 
 * @returns 
 */

export const getEnumByKey = (enumerator: any, key: string) => {
  const indexOf = Object.values(enumerator).indexOf(key as unknown);
  return indexOf !== -1 ? Object.keys(enumerator)[indexOf] : null;
}

/**
 * it deeply merges two objects (only given properties are replaced)
 * @param {object} source the source object 
 * @param {object} replacement the object to be merged with the source
 * @returns {object} the merged object
 */

export const deepInterpolation = (source: any, replacement: any): any => {
  // Create a copy of the original object to avoid modifying the original data
  const result = { ...source };

  // Recursively merge the replacement object into the original object
  const mergeObjects = (obj1: any, obj2: any) => {
    for (const key in obj2) {
      if (obj2.hasOwnProperty(key)) {
        if (obj2[key] instanceof Object && obj1.hasOwnProperty(key) && obj1[key] instanceof Object) {
          mergeObjects(obj1[key], obj2[key]);
        } else {
          obj1[key] = obj2[key];
        }
      }
    }
  };

  mergeObjects(result, replacement);
  return result;
}

/**
 * function to remove all properties that contains null or undefined values
 * @param {Object} obj the object to be modified
 * @returns {Object} the new object with all properties removed
 */

export const removeFromObject = (obj: any): Object => {
  Object.keys(obj).forEach((key: string) => {
    if (obj[key] === null) {
      delete obj[key];
    }
  });
  return obj;
}

/**
 * function to generate an array of a given size
 * @param {number} count size of the array 
 * @returns {array} array of numbers
 */

export const generateArray = (count: number): Array<number> => {
  return Array.from(Array(count).keys());
}

/**
 * function to join classNames
 * @param {any} args classes
 * @return {string} merged array of classes
 */

export const classNames = (...args: any): string => {
  return args.filter((x: any) => !!x).join(" ");
}

/**
 * function to change a position in the array (for state)
 * @param {any[]} arr array to be modified
 * @param {number} index index to be updated
 * @param {any} value value to be updated
 * @return {any[]} merged array of classes
 */

export const setArrayIndex = (arr: any[], index: number, value: any) => {
  const items = [...arr];
  items[index] = value;
  return items;
}

/**
 * it simulates a asynchronous call to an API function
 * @param {Function} callback the function to be called
 */

export const asyncMethod = async (callback: Function) => {
  const delayPromise = (ms: number) => new Promise(res => setTimeout(res, ms))
  await delayPromise(500)
  return callback()
}