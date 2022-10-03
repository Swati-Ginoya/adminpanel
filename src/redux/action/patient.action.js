import * as ActionType from "../ActionType";
import { db } from "../../firebase/firebase";
import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { async } from "@firebase/util";

export const Get_Patient = () => async (dispatch) => {

    try {
        const querySnapshot = await getDoc(collection(db, "patient"));
        let data = [];
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() })
            console.log(`${doc.id} => ${doc.data()}`);
            console.log(data);
        });
        dispatch({ type: ActionType.GET_PATIENTS, payload: data })
    } catch (error) {
        dispatch(error_Patient(error.message))
    }
}

export const loading_Patient = () => (dispatch) => {
    dispatch({ type: ActionType.PATIENT_LOADING })
}
export const delete_Patient = (id) => async (dispatch) => {
    try {
        await deleteDoc(doc(db, "patient", id));
        console.log(id);
        dispatch({ type: ActionType.DELETE_PATIENTS, payload: id })
    } catch (error) {
        dispatch(error_Patient(error.message))
    }
}

export const add_Patient = (data) => async (dispatch) => {
    try {
        const docRef = await addDoc(collection(db, "patient"), data);
        console.log("Document written with ID: ", docRef.id);
        dispatch({ type: ActionType.ADD_PATIENTS, payload: { id: docRef.id, ...data } })
    } catch (error) {
        dispatch(error_Patient(error.message));
    }
}

export const update_Patients = (data) => async (dispatch) => {
    try {
        const patientRef = doc(db, "patient", data.id);
        await updateDoc(patientRef, {
            name: data.name,
            gender: data.gender,
            disease: data.disease,
            fees: data.fees,
            date: data.date
        });
        dispatch({ type: ActionType.UPDATE_PATIENTS, payload: data })
    } catch (error) {
        dispatch(error_Patient(error.message));
    }
}

export const error_Patient = (error) => (dispatch) => {
    dispatch({ type: ActionType.PATIENT_ERROR, payload: error })
}
