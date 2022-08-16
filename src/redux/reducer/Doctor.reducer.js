import * as ActionType from '../ActionType'

const initval = {
    isloading: false,
    doctor: [],
    error: ''
}


export const Doctor_Reducer = (state = initval, action) => {
    switch (action.type) {
        case ActionType.DOCTOR_LOADING:
            return {
                ...state,
                isloading: true,
                error: '',
                doctor: []
            }
        case ActionType.GET_DOCTOR:

            return {
                ...state,
                isloading: false,
                doctor: action.payload,
                error: ''
            }

        case ActionType.ADD_DOCTORS:
            return {
                ...state,
                isloading: false,
                doctor: state.doctor.concat(action.payload),
                error: ''
            }

        case ActionType.DELETE_DOCTORS:

            return {
                ...state,
                isloading: false,
                doctor: state.doctor.filter((m) => m.id !== action.payload),
                error: ''
            }

        case ActionType.UPDATE_DOCTORS:
            return {
                ...state,
                isloading: false,
                doctor: state.doctor.map((m) => {
                    if(m.id === action.payload.id){
                        return action.payload
                    }else{
                        return m;
                    }
                }),
                error: ''
            }

        default:
            return state;
    }
}