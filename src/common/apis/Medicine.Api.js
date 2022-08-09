
import { deleteRequest, getRequest, postRequest, putRequest } from '../Request'

export const getAllMedicine = () => {
    return getRequest('Medicines')
} 

export const postAllMedicine = (data) => {
    return postRequest('Medicines' , data)
}

export const deleteAllMedicine = (id) => {
    return deleteRequest('Medicines/' ,id)
}

export const putAllMedicine = (data) => {
    return putRequest('Medicines/' ,data)
}