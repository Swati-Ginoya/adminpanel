import * as ActionType from '../ActionType'
const initalval = {
    isLoading : false,
    Medicine : [],
    error : ''
}

export const medicincesreducer =(state = initalval, action) => {
    switch (action.type) {
        case ActionType.GET_MEDICINCES:
            return{
                ...state,
                isLoading : false,
                Medicine : action.payload,
                error : ''
            }
            case ActionType.ADD_MEDICINES:
            return{
                ...state,
                isLoading : false,
                Medicine : state.Medicine.concat(action.payload),
                error : ''
            }
            case ActionType.UPDATE_MEDICINES:
                return{
                    ...state,
                    isLoading : false,
                    Medicine : state.Medicine.map((m) => {
                        if(m.id === action.payload.id){
                            return action.payload
                        }
                        else{
                            return m;
                        }
                    }),
                    error : ''
                }
            case ActionType.DELETE_MEDICINES:
            return{
                ...state,
                isLoading : false,
                Medicine : state.Medicine.filter((m) => m.id !== action.payload),
                error : ''
            }
            case ActionType.LOADING_MEDICINE:
            return{
                ...state,
                isLoading : true,
                error : ''
            }
            case ActionType.MEDICINE_ERROR:
            return{
                ...state,
                isLoading : false,
                error : action.payload,
                Medicine:[]
            }
    
        default:
            return state;
    }
}