import * as ActionType from '../ActionType'

const initval = {
    isloading: false,
    patient: [],
    error: ''
}

export const Patient_Reducer = (state = initval, action) => {
    switch (action.type) {
        case ActionType.PATIENT_LOADING:
            return {
                ...state,
                isloading: true,
                error: '',
                patient:[]
            }
        case ActionType.GET_PATIENTS:
            return {
                ...state,
                isloading: false,
                error: '',
                patient: action.payload
            }

        case ActionType.DELETE_PATIENTS:
            return {
                ...state,
                isloading: false,
                error: '',
                patient: state.patient.filter((m) => m.id !== action.payload)
            }

        case ActionType.ADD_PATIENTS:
            return {
                ...state,
                isloading: false,
                error: '',
                patient: state.patient.concat(action.payload)
            }

        case ActionType.UPDATE_PATIENTS:
            return {
                ...state,
                isloading: false,
                error: '',
                patient: state.patient.map((m) => {
                    if(m.id === action.payload.id){
                        return action.payload
                    }
                    else{
                        return m;
                    }
                })
            }
        default:
            return state
    }
}