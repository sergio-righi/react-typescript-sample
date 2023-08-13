import { HNumber, HString, HType, HValidation } from "helpers";
import { Constants } from "utils";

/**
 * function to return a friendly date
 * @param {Date} d the date to be converted
 * @param {object} t list of words (from translations)
 * @param {string} locale language to be used for formatting
 * @return {string} the friendly date message
 */

export const toRelativeDate = (d: string, t: any, locale: string = "en", dateOnly: boolean = false): string => {
  const date = toDate(d);
  const today = clearTime(new Date());
  const days = inBetween(date, today);
  const dateWithoutTime = clearTime(date);
  const tomorrow = clearTime(new Date(today).setDate(today.getDate() + 1));
  const yesterday = clearTime(new Date(today).setDate(today.getDate() - 1));

  return (isDateEquals(dateWithoutTime, today)) ? dateOnly ? t.today : HString.interpolate(t.today_at, { time: date.toLocaleTimeString(locale, { ...Constants.TIME_FORMAT }) }) :
    (isDateEquals(dateWithoutTime, tomorrow)) ? dateOnly ? t.tomorrow : HString.interpolate(t.tomorrow_at, { time: date.toLocaleTimeString(locale, { ...Constants.TIME_FORMAT }) }) :
      (isDateEquals(dateWithoutTime, yesterday)) ? dateOnly ? t.yesterday : HString.interpolate(t.yesterday_at, { time: date.toLocaleTimeString(locale, { ...Constants.TIME_FORMAT }) }) :
        Math.abs(days) <= 3 ? days > 0 ? HString.interpolate(t.day_ago, { day: Math.abs(days) }) : HString.interpolate(t.in_day, { day: Math.abs(days) }) : dateOnly ? date.toLocaleDateString(locale, { ...Constants.DATE_FORMAT }) : date.toLocaleString(locale, { ...Constants.DATE_FORMAT, ...Constants.TIME_FORMAT });
}

/**
 * function to calculate the days between two dates
 * @param {string | Date} a the date to be compared
 * @param {string | Date} b the date to be compared
 * @return {number} number of the days
 */

export const inBetween = (a: string | Date, b: string | Date): number => {
  const inBetween = new Date(b).getTime() - new Date(a).getTime();
  return Math.round(inBetween / (1000 * 60 * 60 * 24));
}

/**
 * function to remove time from date
 * @param {string} date the date to be updated
 * @return {Date} the date without time
 */

export const clearTime = (date: string | Date | number): Date => {
  const newDate = new Date(date);
  newDate.setHours(0, 0, 0, 0);
  return newDate;
}

/**
 * function to compare two given dates
 * @param {string | Date} a the date to be compared
 * @param {string | Date} b the date to be compared
 * @return {boolean} if the dates are the same
 */

export const isDateEquals = (a: Date | string, b: Date | string): boolean => {
  return clearTime(a).getTime() === clearTime(b).getTime();
};

/**
 * function to return a given date in the correct format
 * @param {Date} date date to be looked up
 * @param {string} locale locale
 * @returns {string | null} the formatted date
 */

export const formattedDate = (date: Date, locale: string = "EN"): string | null => {
  if (!date) return null;
  return date.toLocaleDateString(locale, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

/**
 * function to convert seconds to time string (00:00:00)
 * @param {number} value time to be converted (in seconds)
 * @param {boolean} seconds whether the date should include seconds
 * @returns {string} an object containing the count of days, hours, minutes and seconds as string
 */

export const toTimeString = (value: number, seconds: boolean = true): string => {
  const response = HNumber.time(value);
  if (HType.isObject(response)) {
    const length = Object.keys(response).length;
    const mapped = Object.values(response)
      .map((item: any) => HNumber.pad(item))
      .join(":");
    return length === 1
      ? "00:" + mapped
      : length === 3 && !seconds
        ? mapped.slice(0, 5)
        : mapped;
  }
  return "00:00";
};

/**
 * convert a given date to object ({ day, month, year })
 * @param {Date} date the date to be converted
 * @returns {object} an object with day, month, and year properties
 */

export const toObject = (date: Date): { day: number, month: number, year: number } => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return { day, month, year };
}

/**
 * function to convert date to ISO string
 * @param {Date} date the date to be converted
 * @param {string} time the time to be set
 * @returns {string} date as ISO string
 */

export const toISOString = (date: Date, time?: string | null): string => {
  if (!date) return "";
  const dateObject = toObject(date);
  const dateISO = dateObject.year + "-" + HNumber.pad(dateObject.month) + "-" + HNumber.pad(dateObject.day);
  const newTime = HValidation.hasValue(time)
    ? time
    : toTimeString(toSeconds(date));
  return time === null ? dateISO : dateISO + "T" + newTime + "Z";
};

/**
 * function to convert string date YYYY-MM-DD to date object
 * @param {string} date the date to be converted
 * @returns {Date} the new date object
 */

export const toDate = (date: string): Date => {
  const [year, month, day] = date.split('-').map(Number);
  return new Date(year, month - 1, day);
}

/**
 * function to convert 24-hour time string to AM/PM format
 * @param {number} value time to be converted in seconds
 * @param {boolean} seconds whether the date should include seconds
 * @returns {string} the time in AM/PM format
 */

export const toTimeAmPmString = (value: number, seconds: boolean = true, am: string = "am", pm: string = "pm"): string => {
  const timeString = toTimeString(value, seconds);
  const time = timeString.split(":");
  const hour = Number(time.shift());
  if (hour >= 12) {
    const diff = 12 - Number(hour);
    return HNumber.pad(Math.abs(diff === 0 ? 12 : diff)) + ":" + time.map((item) => HNumber.pad(item))
      .join(":") + " " + pm;
  }
  return timeString + " " + am;
};

/**
 * function to convert a given time (from date) to its equivalent in seconds
 * @param {Date} value the date to be converted
 * @returns {number} the time in seconds
 */

export const toSeconds = (value: Date): number => {
  if (!value) return 0;
  const hours = value.getHours();
  const minutes = value.getMinutes();
  const seconds = value.getSeconds();
  return hours * 3600 + minutes * 60 + seconds;
};

/**
 * function to return the name of the weekday of a given date
 * @param {Date} date date to be looked up
 * @param {string} locale locale
 * @returns {string} the name of the weekday
 */

export const weekday = (date: Date, locale: string = "EN") => {
  if (!date) return null;
  return date.toLocaleDateString(locale, {
    weekday: "long",
  });
};

/**
 * function to convert seconds to days, hours, minutes, seconds
 * @param {number} value time to be converted (in seconds)
 * @returns {any} an object containing the count of days, hours, minutes and seconds or the value itself
 */

export const time = (value: number): any => {
  if (value <= 0) return value;
  else {
    const day = Math.floor(value / 86400);
    const hour = Math.floor((value - day * 86400) / 3600);
    const min = Math.floor((value - day * 86400 - hour * 3600) / 60);
    const sec = Math.floor(value - day * 86400 - hour * 3600 - min * 60);
    return hour > 0
      ? { hour, min, sec }
      : min > 0
        ? { min, sec }
        : { sec };
  }
};