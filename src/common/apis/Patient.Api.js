import { deleteRequest, getRequest, postRequest, putRequest } from "../Request"

export const getAllpatient = () =>{
    return getRequest('Patients')
}

export const postAllpatient = (data) => {
    return postRequest('Patients' ,data)
}

export const deleteAllpatient = (id) => {
    return deleteRequest('Patients/' ,id)
}

export const putAllpatient = (data) => {
    return putRequest('Patients/' ,data)
}