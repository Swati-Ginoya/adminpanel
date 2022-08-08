import * as ActionType from '../ActionType'

const initval = {
    counter: 0
}

export const CounterReducer = (state = initval, action) => {
    switch (action.type) {
        case ActionType.increment_counter:
            return {
                ...state,
                counter: state.counter + 1
            }

        case ActionType.decrement_counter:
            return {
                ...state,
                counter: state.counter - 1
            }
        default:
            return state
    }
}