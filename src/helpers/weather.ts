import { Constants, Enums } from "utils";
import { HDate } from "helpers";

/**
 * function to return a range of dates from either today or a given date
 * @param {Date | null} date
 * @param {number} length
 * @returns {array} array of two positions (starting date and ending date)
 */

export const getRangeDate = (date: Date, length: number = 7) => {
  const today = date ?? new Date();
  const array = [HDate.toISOString(today)];
  today.setDate(today.getDate() + length);
  array.push(HDate.toISOString(today));
  return array;
};

/**
 * function to return a range of dates from either today or a given date as parameter
 * @param {Date | null} date
 * @param {number} length
 * @param {string} period
 * @returns {string} the range of dates as parameter
 */

export const getRangeDateAsParam = (
  date: Date = new Date(),
  length: number = 7,
  period: string = ""
) => {
  const [st, end] = getRangeDate(date, length);
  // return Helpers.String.interpolateURL(
  //   Constants.REQUEST_URL_FORMAT.WITHIN_RANGE_PERIOD,
  //   {
  //     [Enums.EnumKey.DateA]: st,
  //     [Enums.EnumKey.DateB]: end,
  //     [Enums.EnumKey.Period]: period,
  //   }
  // );
  return "";
};

/**
 * function to return a parameter of a given date or the current date with a period
 * @param {Date | null} date
 * @param {string} period
 * @returns
 */

export const getDateAsParam = (date: Date, period: string = "") => {
  const today = date ?? new Date();
  const startTime = HDate.toISOString(today, "0");
  const endTime = HDate.toISOString(today, "23");
  // return Helpers.String.interpolateURL(
  //   Constants.REQUEST_URL_FORMAT.WITHIN_RANGE_PERIOD,
  //   {
  //     [Enums.EnumKey.DateA]: startTime,
  //     [Enums.EnumKey.DateB]: endTime,
  //     [Enums.EnumKey.Period]: period,
  //   }
  // );
  return "";
};

/**
 * function to return a parameter of a the current date
 * @returns
 */

export const getNowAsParam = () => {
  const datenow = HDate.toISOString(new Date());
  // return Helpers.String.interpolateURL(Constants.REQUEST_URL_FORMAT.DATE_ONLY, {
  //   [Enums.EnumKey.DateA]: datenow,
  // });
  return "";
};

/**
 * function to return the string of parameters with units
 * @param {Array} params parameters
 * @returns {string} the parameters string
 */

export const getParams = (params: any) => {
  // return Helpers.String.toParam(...[...params].map((item) => item));
};

/**
 * function to check if it is day or night considering the sunrise and sunset
 * @param {Date} date current date
 * @param {string} sunrise date of sunrise
 * @param {string} sunset date of sunset
 * @returns {boolean} true if is day and false if is night
 */

export const isDay = (date: Date, sunrise: string, sunset: string) => {
  const d = new Date(date);
  const st = new Date(sunrise);
  const end = new Date(sunset);
  return d >= st && d <= end;
};

/**
 * function to return the description of the current weather status
 * @param {number} code
 * @returns {string | null} string to be used as a key on the locales
 */

export const getDescription = (code: number): string | null => {
  if (!code) return null;
  let description = null;
  // Object.keys(Constants.WEATHER).forEach((item: string) => {
  //   const value = ""; //Constants.WEATHER[item];
  //   const codes = Constants.WEATHER_CODES[value];
  //   if (codes.includes(code)) description = value;
  // });
  return description;
};
