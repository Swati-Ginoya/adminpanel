
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

export const postRequest = (path ,data) => {
    return sendRequest({
        method: "POST" ,
        url : path,
        data:JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    })
}

export const deleteRequest = (path ,id) => {
    return sendRequest({
        method:"DELETE",
        url : path + id,
    })
}

export const putRequest = (path ,data) => {
    return sendRequest({
        method : "PUT",
        url : path + data.id,
        data:JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
        },
    })
}