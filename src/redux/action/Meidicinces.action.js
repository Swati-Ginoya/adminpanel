import { Identity } from "@mui/base";
import { BASE_URL } from "../../base-url/Base_URL";
import { deleteAllMedicine, getAllMedicine, postAllMedicine, putAllMedicine } from "../../common/apis/Medicine.Api";
import * as ActionType from "../ActionType";

export const get_Medicinces = () => (dispatch) => {
    dispatch(loading_Medicine())

    setTimeout(function () {
        getAllMedicine()
            .then((data) => dispatch({ type: ActionType.GET_MEDICINCES, payload: data.data }))
            .catch((error) => dispatch(error_Medicine(error.message)));

        //fetch(BASE_URL + 'Medicines')
        // .then(response => {
        //    if (response.ok) {
        //       return response;
        //    } else {
        //       var error = new Error('Error ' + response.status + ': ' + response.statusText);
        //       error.response = response;
        //       throw error;
        //  }
        // },
        //   error => {
        //      var errmess = new Error(error.message);
        //     throw errmess;
        //  })
        // .then((response) => response.json())
        // .then((data) => dispatch({ type: ActionType.GET_MEDICINCES, payload: data }))
        //.catch((error) => dispatch(error_Medicine(error.message)));
    }, 2000)

}

export const add_medicine = (data) => (dispatch) => {
    try {
        postAllMedicine(data)
        .then((data) => dispatch({ type: ActionType.ADD_MEDICINES, payload: data.data }))
        .catch((error) => dispatch(error_Medicine(error.message)));
        // fetch(BASE_URL + 'Medicines', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data),
        // })
        //     .then(response => {
        //         if (response.ok) {
        //             return response;
        //         } else {
        //             var error = new Error('Error ' + response.status + ': ' + response.statusText);
        //             error.response = response;
        //             throw error;
        //         }
        //     },
        //         error => {
        //             var errmess = new Error(error.message);
        //             throw errmess;
        //         })
        //     .then((response) => response.json())
        //     .then((data) => dispatch({ type: ActionType.ADD_MEDICINES, payload: data }))

    } catch (error) {
        dispatch(error_Medicine(error.message));
    }
}

export const update_medicine = (data) => (dispatch) => {
    try {
        putAllMedicine(data)
        .then((data) => dispatch({ type: ActionType.UPDATE_MEDICINES, payload: data.data }))
        .catch((error) => dispatch(error_Medicine(error.message)));
        // fetch(BASE_URL + 'Medicines/' + data.id, {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(data),
        // })
        //     .then(response => {
        //         if (response.ok) {
        //             return response;
        //         } else {
        //             var error = new Error('Error ' + response.status + ': ' + response.statusText);
        //             error.response = response;
        //             throw error;
        //         }
        //     },
        //         error => {
        //             var errmess = new Error(error.message);
        //             throw errmess;
        //         })
        //     .then((response) => response.json())
        //     .then((data) => dispatch({ type: ActionType.UPDATE_MEDICINES, payload: data }))
    } catch (error) {
        dispatch(error_Medicine(error.message));
    }
}

export const delete_medicine = (id) => (dispatch) => {
    console.log(id);
    try {
        deleteAllMedicine(id)
        .then( dispatch({ type: ActionType.DELETE_MEDICINES, payload: id }))
        .catch((error) => dispatch(error_Medicine(error.message)));

        // fetch(BASE_URL + 'Medicines/' + id, {
        //     method: 'DELETE'
        // })
        //     .then(response => {
        //         if (response.ok) {
        //             return response;
        //         } else {
        //             var error = new Error('Error ' + response.status + ': ' + response.statusText);
        //             error.response = response;
        //             throw error;
        //         }
        //     },
        //         error => {
        //             var errmess = new Error(error.message);
        //             throw errmess;
        //         })
        //     .then((response) => response.json())
        //     .then((data) => dispatch({ type: ActionType.DELETE_MEDICINES, payload: id }))


    } catch (error) {
        dispatch(error_Medicine(error.message))
    }

}

export const loading_Medicine = () => (dispatch) => {
    dispatch({ type: ActionType.LOADING_MEDICINE })
}

export const error_Medicine = (error) => (dispatch) => {
    dispatch({ type: ActionType.MEDICINE_ERROR, payload: error })
}