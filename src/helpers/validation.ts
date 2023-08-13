/**
 * function to check if a given string has any value
 * @param {string[]} params values to be tested
 * @returns {boolean} true if it has value, false otherwise
 */

export const hasValue = (...params: (string | undefined | null)[]): boolean => {
  for (const value of params) {
    if (!(!!(value !== null && value !== undefined && value.toString().trim().length > 0))) {
      return false;
    }
  }
  return true;
}

/**
 * check if the given value is a valid email
 * @param {string} emailAddress the email address to be tested
 * @returns {boolean} true if the value is an email
 */

export const isEmail = (emailAddress: string): boolean => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailAddress);

/**
 * check if the given value is a valid phone number
 * @param {string} phoneNumber the phone number to be tested
 * @returns {boolean} true if the value is a phone number
 */

export const isPhone = (phoneNumber: string): boolean => /^(\+1)?\s?\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/.test(phoneNumber)