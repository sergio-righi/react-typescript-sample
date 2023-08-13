import axios from 'axios';

/**
 * responsible for creating the instance of axios to connect to some API
 */

const someapi = (baseUrl: string) => axios.create({
  baseURL: baseUrl,
});

export {
  someapi
}