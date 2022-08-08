import * as ActionType from '../ActionType'

export const increment=()=>(dispatch)=>{
    dispatch({type:ActionType.increment_counter});
}

export const decrement=()=>(dispatch)=>{
    dispatch({type:ActionType.decrement_counter});
}