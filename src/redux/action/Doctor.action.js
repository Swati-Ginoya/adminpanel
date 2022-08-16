
import { BASE_URL } from "../../base-url/Base_URL";
import * as ActionType from "../ActionType";



export const get_Doctor = () => (dispatch) => {

    dispatch(loading_doctor())
    
    setTimeout(function () {
        try{
            fetch(BASE_URL + 'Doctors')
            .then(response => {
                if (response.ok) {
                    return response;
                } else {
                    var error = new Error('Error ' + response.status + ': ' + response.statusText);
                    error.response = response;
                    throw error;
                }
            },
                error => {
                    var errmess = new Error(error.message);
                    throw errmess;
                })
                .then((response) => response.json())
                .then((data) => dispatch({ type: ActionType.GET_DOCTOR, payload: data }))
                .catch((error) => dispatch(error_Doctor(error.message)));
        }catch(error){
            dispatch(error_Doctor(error.message));
        }
    },2000)
}

export const add_doctor = (data) => (dispatch) => {
  try{
  
      fetch(BASE_URL + 'Doctors' , {
          method : 'POST',
          headers : {
              'Content-Type' : 'application/json',
          },
          body : JSON.stringify(data)
      })
      .then(response => {
          if (response.ok) {
              return response;
          } else {
              var error = new Error('Error ' + response.status + ': ' + response.statusText);
              error.response = response;
              throw error;
          }
      },
          error => {
              var errmess = new Error(error.message);
              throw errmess;
          })
          .then((response) => response.json())
          .then((data) => dispatch({ type: ActionType.ADD_DOCTORS, payload:data}))
  }
  catch(error){
      dispatch(error_Doctor(error.message));
  }
}


export const delete_doctor = (id) => (dispatch) => {
    try{
  
        fetch(BASE_URL + 'Doctors/' + id, {
            method : 'DELETE',
        })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
            .then((response) => response.json())
            .then((data) => dispatch({ type: ActionType.DELETE_DOCTORS, payload:id}))
    }
    catch(error){
        dispatch(error_Doctor(error.message));
    }
}

export const update_doctor = (data) => (dispatch) => {
    try{
  
        fetch(BASE_URL + 'Doctors/' + data.id, {
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json',
            },
            body : JSON.stringify(data)
        })
        .then(response => {
            if (response.ok) {
                return response;
            } else {
                var error = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
            error => {
                var errmess = new Error(error.message);
                throw errmess;
            })
            .then((response) => response.json())
            .then((data) => dispatch({ type: ActionType.UPDATE_DOCTORS, payload:data}))
    }
    catch(error){
        dispatch(error_Doctor(error.message));
    }
}
export const error_Doctor = (error) => (dispatch) => {
  dispatch({ type: ActionType.DOCTOR_ERROR, payload: error })
}

export const loading_doctor = () => (dispatch) => {
  dispatch({ type: ActionType.DOCTOR_LOADING })
}