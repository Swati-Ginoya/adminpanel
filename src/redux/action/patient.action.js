import { BASE_URL } from "../../base-url/Base_URL";
import { deleteAllpatient, getAllpatient, postAllpatient, putAllpatient } from "../../common/apis/Patient.Api";
import * as ActionType from "../ActionType";

export const Get_Patient = () => (dispatch) => {
    dispatch(loading_Patient())
    
    setTimeout(function () {
        try{
            getAllpatient()
            .then((data) => dispatch({ type: ActionType.GET_PATIENTS, payload: data.data }))
            .catch((error) => dispatch(error_Patient(error.message)));
            // fetch(BASE_URL + 'Patients')
            // .then(response => {
            //     if (response.ok) {
            //         return response;
            //     } else {
            //         var error = new Error('Error ' + response.status + ': ' + response.statusText);
            //         error.response = response;
            //         throw error;
            //     }
            // },
            //     error => {
            //         var errmess = new Error(error.message);
            //         throw errmess;
            //     })
            //     .then((response) => response.json())
            //     .then((data) => dispatch({ type: ActionType.GET_PATIENTS, payload: data }))
            //     .catch((error) => dispatch(error_Patient(error.message)));
        }catch(error){
            dispatch(error_Patient(error.message));
        }
    },2000)
}

export const loading_Patient = () => (dispatch) => {
    dispatch({ type: ActionType.PATIENT_LOADING })
}
export const delete_Patient = (id) => (dispatch) => {
    try{
        deleteAllpatient(id)
        .then( dispatch({ type: ActionType.DELETE_PATIENTS, payload:id }))
        .catch((error) => dispatch(error_Patient(error.message)));
        
        // fetch(BASE_URL + 'Patients/' + id ,{
        //     method : 'DELETE',
        // })
        // .then(response => {
        //     if (response.ok) {
        //         return response;
        //     } else {
        //         var error = new Error('Error ' + response.status + ': ' + response.statusText);
        //         error.response = response;
        //         throw error;
        //     }
        // },
        //     error => {
        //         var errmess = new Error(error.message);
        //         throw errmess;
        //     })
        //     .then((response) => response.json())
        //     .then((data) => dispatch({ type: ActionType.DELETE_PATIENTS, payload:id }))

    }catch(error){
        dispatch(error_Patient(error.message));
    }
}

export const add_Patient = (data) => (dispatch) => {
    try{
        postAllpatient(data)
        .then((data) => dispatch({ type: ActionType.ADD_PATIENTS, payload: data.data }))
        .catch((error) => dispatch(error_Patient(error.message)));

        // fetch(BASE_URL + 'Patients' , {
        //     method : 'POST',
        //     headers : {
        //         'Content-Type' : 'application/json',
        //     },
        //     body : JSON.stringify(data)
        // })
        // .then(response => {
        //     if (response.ok) {
        //         return response;
        //     } else {
        //         var error = new Error('Error ' + response.status + ': ' + response.statusText);
        //         error.response = response;
        //         throw error;
        //     }
        // },
        //     error => {
        //         var errmess = new Error(error.message);
        //         throw errmess;
        //     })
        //     .then((response) => response.json())
        //     .then((data) => dispatch({ type: ActionType.ADD_PATIENTS, payload:data}))
    }
    catch(error){
        dispatch(error_Patient(error.message));
    }
}

export const update_Patients = (data) => (dispatch) => {
    try{
        putAllpatient(data)
        .then((data) => dispatch({ type: ActionType.UPDATE_PATIENTS, payload:data.data}))
        .catch((error) => dispatch(error_Patient(error.message)));
        
        // fetch(BASE_URL + 'Patients/' + data.id , {
        //     method : 'PUT',
        //     headers : {
        //         'Content-Type' : 'application/json',
        //     },
        //     body : JSON.stringify(data)
        // })
        // .then(response => {
        //     if (response.ok) {
        //         return response;
        //     } else {
        //         var error = new Error('Error ' + response.status + ': ' + response.statusText);
        //         error.response = response;
        //         throw error;
        //     }
        // },
        //     error => {
        //         var errmess = new Error(error.message);
        //         throw errmess;
        //     })
        //     .then((response) => response.json())
        //     .then((data) => dispatch({ type: ActionType.UPDATE_PATIENTS, payload:data}))
    }
    catch(error){
        dispatch(error_Patient(error.message));
    }
}

export const error_Patient = (error) => (dispatch) => {
    dispatch({ type: ActionType.PATIENT_ERROR, payload: error })
}
