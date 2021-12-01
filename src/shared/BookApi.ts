import axios, { AxiosResponse, Method } from 'axios';
import Book from '../types/Book';

const BASE_URL = 'https://api3.angular-buch.com';

export function bookApi<T>(method: Method, path: string, callback: (data: T) => void, data = {}): void {
  axios({
    method: `${method}`,
    url: `${BASE_URL}/${path}`,
    data: data
  })
    .then((res) => callback(res.data))
    .catch((err) => console.log(err));
}

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if(response.config.url){
      const regEx = /[0-9]{10,13}$/
      response.config.url.search(regEx)
    }
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
