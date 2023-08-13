
/**
 * function to interpolate a string with their respective values
 * @param {string} str string e.g. the {{user}} must be logged in
 * @param {any} obj object e.g. { user: 'username' }
 * @return {string} the username must be logged in
 */

export const interpolate = (str: string, obj: any): string => {
  return Object.keys(obj).reduce((previousValue: string, currentValue: string) => {
    return previousValue.replaceAll(`{{${currentValue}}}`, obj[currentValue]);
  }, str);
};

/**
 * function to interpolate a URL with their respective values
 * @param {string} url string e.g. /foo/bar/:id
 * @param {any} obj object e.g. { id: 12345 }
 * @return {string} /foo/bar/12345
 */

export const interpolateURL = (url: string, obj: any): string => {
  return Object.keys(obj).reduce((previousValue: string, currentValue: string) => {
    return previousValue.replaceAll(`:${currentValue}`, obj[currentValue]);
  }, url);
};

/**
 * function to convert a given obj to query string
 * @param {string} url  string e.g. /foo/bar
 * @param {any} obj the object to be converted e.g. { id: 123, name: "xyz" }
 * @returns {string} queryString e.g. "/foo/bar?id=123&name=xyz"
 */

export const toQueryString = (url: string, obj: any): string => {
  return url + "?" + Object.keys(obj).map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])).join('&');
}

/**
 * function to return the respective greeting to the user according to the current time
 * @return {string} the greeting message
 */

export const greeting = (): string => {
  const hour = new Date().getHours();
  return hour < 12 ? 'good_morning' : hour > 12 && hour < 18 ? 'good_afternoon' : hour > 22 ? 'hello' : 'good_evening'
}

/**
 * method that returns the propert text color according to the provided background color based on the luminance
 * @param {string} backgroundColor the background to be used as reference
 * @param {string} black the color to be used in case its black
 * @param {string} white the color to be used in case its white 
 * @returns {string} the contrast color
 */

export const getContrast = (backgroundColor: string, black: string = "black", white: string = "white"): string => {
  // Helper function to convert a hex color to an RGB array
  const hexToRgb = (hex: string): [number, number, number] => {
    const bigint = parseInt(hex.replace("#", ""), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return [r, g, b];
  };

  // Helper function to calculate the luminance of an RGB color
  const getLuminance = ([r, g, b]: [number, number, number]): number => {
    const [rl, gl, bl] = [r / 255, g / 255, b / 255];
    const [rSrgb, gSrgb, bSrgb] = [
      rl <= 0.03928 ? rl / 12.92 : ((rl + 0.055) / 1.055) ** 2.4,
      gl <= 0.03928 ? gl / 12.92 : ((gl + 0.055) / 1.055) ** 2.4,
      bl <= 0.03928 ? bl / 12.92 : ((bl + 0.055) / 1.055) ** 2.4,
    ];
    return 0.2126 * rSrgb + 0.7152 * gSrgb + 0.0722 * bSrgb;
  };

  // Convert the background color to RGB format
  let rgbColor: [number, number, number];
  if (backgroundColor.startsWith("#")) {
    rgbColor = hexToRgb(backgroundColor);
  } else if (backgroundColor.startsWith("rgb(")) {
    const rgbValues = backgroundColor
      .substring(4, backgroundColor.length - 1)
      .split(",")
      .map((value) => parseInt(value.trim(), 10));
    rgbColor = [rgbValues[0], rgbValues[1], rgbValues[2]];
  } else {
    throw new Error("Invalid background color format. Please provide a color in hex or RGB format.");
  }

  // Calculate the luminance of the background color
  const luminance = getLuminance(rgbColor);

  // Determine the recommended text color based on luminance
  return luminance > 0.5 ? black : white;
}

/**
 * function to remove all non numeric characters from a string
 * @param {string} value the maked string
 * @returns {string} the new string with only numeric characters
 */

export const onlyNumber = (value: string): string => {
  return value.replace(/\D/g, "");
}