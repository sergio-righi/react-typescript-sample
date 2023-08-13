const sessionStorage = {
  sessionName: 'somename',

  /** 
   * function to return the session object
   * @returns {any} either IUser or {}
   */

  get: (): any => {
    return window.sessionStorage[sessionStorage.sessionName] ? JSON.parse(window.sessionStorage[sessionStorage.sessionName]) : {};
  },

  /** 
   * function to set the user session
   * @param {object} values the data to be stored
   */

  set: (values: object): void => {
    window.sessionStorage[sessionStorage.sessionName] = Object.keys(values).length === 0 ? "" : JSON.stringify({ ...sessionStorage.get(), ...values })
  },

  /** 
   * function to clear the user session
   */

  clear: (): void => {
    window.sessionStorage[sessionStorage.sessionName] = "";
  },
}

export {
  sessionStorage
}