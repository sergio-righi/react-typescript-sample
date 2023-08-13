import { HDate } from "helpers";

/**
 * function to add leading zeros
 * @param {number} value number to be filled with leading zeros
 * @param {number} size result length (default 2)
 * @returns {string} value if the leading zeros
 */

export const pad = (value: number | string, size: number = 2): string => {
  const num = Number(value);
  return !isNaN(num)
    ? "0".repeat(Math.max(0, size - Math.abs(num).toString().length)) +
    Math.abs(num)
    : "";
};

/**
 * function to convert seconds to days, hours, minutes, seconds
 * @param {number} value time to be converted (in seconds)
 * @returns {{hour?: number, min?: number, sec: number} | number} an object containing the count of days, hours, minutes and seconds or the value itself
 */

export const time = (value: number): { hour?: number, min?: number, sec: number } | number => {
  if (value <= 0) return value;
  else {
    const day = Math.floor(value / 86400);
    const hour = Math.floor((value - day * 86400) / 3600);
    const min = Math.floor((value - day * 86400 - hour * 3600) / 60);
    const sec = Math.floor(value - day * 86400 - hour * 3600 - min * 60);
    return hour > 0 ? { hour, min, sec } : min > 0 ? { min, sec } : { sec };
  }
};