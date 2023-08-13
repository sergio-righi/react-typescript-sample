
/**
 * function to check if the given value is an object
 * @param {any} value object to be tested
 * @returns {boolean} true if the value is an object but not an array
 */

export const isObject = (value: any): boolean => !!value && Object.prototype.toString.call(value) === "[object Object]";

/**
 * function to check if the given value is a number
 * @param {any} value number to be tested
 * @returns {boolean} true if the value is a number
 */

export const isNumber = (value?: string | number): boolean => {
  return ((value != null) &&
    (value !== '') &&
    !isNaN(Number(value.toString())));
}