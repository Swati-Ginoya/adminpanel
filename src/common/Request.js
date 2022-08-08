
import axios from 'axios';
import { BASE_URL } from '../base-url/Base_URL';

const axiInstance = axios.create({
    baseURL: BASE_URL,
    timeout: 2000
});

export const sendRequest = (config) => {
    return axiInstance.request(config)
}

export const getRequest = (path) => {
   return sendRequest({
    method: 'GET',
    url: path
   })
    
}