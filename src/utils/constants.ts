import { en } from "assets/locales"

export const REGIONS = {
  EN: "EN"
};

export const LOCALE_STRINGS = {
  [REGIONS.EN]: en
};

export const COUNTRY_CONSTANTS = {
  [REGIONS.EN]: {
    phoneCode: "+1"
  }
};

export const DATE_FORMAT = {
  weekday: "long",
  year: "numeric",
  month: "short",
  day: "numeric",
} as any;

export const TIME_FORMAT = {
  hour: "2-digit",
  minute: "2-digit",
} as any;

export const INPUT_MASK = {
  DATE: "9999-99-99",
  PHONE: "(999) 999-9999"
}

export const TEXTAREA = {
  MAX: 5,
  MIN: 3
};

export const MAX_INTEGER = 2147483647;