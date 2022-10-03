import * as ActionType from "../ActionType";
import { db, storage } from "../../firebase/firebase";
import { addDoc, collection, deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { async } from "@firebase/util";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const Get_Patient = () => async (dispatch) => {

    try {
        const querySnapshot = await getDoc(collection(db, "patient"));
        let data = [];
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() })
        });
        dispatch({ type: ActionType.GET_PATIENTS, payload: data })
    } catch (error) {
        dispatch(error_Patient(error.message))
    }
}

export const loading_Patient = () => (dispatch) => {
    dispatch({ type: ActionType.PATIENT_LOADING })
}
export const delete_Patient = (data) => async (dispatch) => {
    try {
        console.log(data.row);
        const deletetRef = ref(storage, "patient/" + data.row.fileName);

        deleteObject(deletetRef)
            .then(async () => {
                await deleteDoc(doc(db, "Doctors", data.id));
                dispatch({ type: ActionType.DELETE_PATIENTS, payload: data.id })
            }).catch((error) => {
                dispatch(error_Patient(error.message))
            });
    } catch (error) {
        dispatch(error_Patient(error.message))
    }
}

export const add_Patient = (data) => async (dispatch) => {
    try {
        const patientRef = ref(storage, 'patient/' + data.profile.name);
        uploadBytes(patientRef, data.profile)
            .then((snapshot) => {
                getDownloadURL(ref(storage, snapshot.ref))
                    .then(async (url) => {
                        const docRef = await addDoc(collection(db, "patient"), {
                            ...data,
                            profile: url
                        });
                        dispatch({
                            type: ActionType.ADD_PATIENTS, payload: {
                                id: docRef.id,
                                ...data,
                                profile: url
                            }
                        })
                    });
            });

    } catch (error) {
        dispatch(error_Patient(error.message));
    }
}

export const update_Patients = (data) => async (dispatch) => {
    try {
        const patientRef = doc(db, "patient", data.id);
        if (typeof data.profile === "string") {
            await updateDoc(patientRef, {
                name: data.name,
                gender: data.gender,
                disease: data.disease,
                fees: data.fees,
                date: data.date
            });
            dispatch({ type: ActionType.UPDATE_PATIENTS, payload: data })
        } else {
            const delpatientRef = ref(storage, "patient/" + data.fileName);
            let radomNum = Math.floor(Math.random() * 1000000).toString();
            const uppatientRef = ref(storage, 'patient/' + radomNum);

            deleteObject(delpatientRef)
                .then(() => {
                    uploadBytes(uppatientRef, data.profile)
                        .then((snapshot) => {
                            getDownloadURL(ref(storage, snapshot.ref))
                                .then(async (url) => {
                                    await updateDoc(patientRef, {
                                        name: data.name,
                                        email: data.email,
                                        phone: data.phone,
                                        fileName: radomNum,
                                        prof_img: url
                                    });
                                    dispatch({ type: ActionType.UPDATE_PATIENTS, payload: { ...data, fileName: radomNum, profile: url } })
                                })
                        })
                })
        }

    } catch (error) {
        dispatch(error_Patient  (error.message));
    }
}

export const error_Patient = (error) => (dispatch) => {
    dispatch({ type: ActionType.PATIENT_ERROR, payload: error })
}

