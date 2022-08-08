import {combineReducers} from 'redux';
import { CounterReducer } from './Counter.Reducer';
import { medicincesreducer } from './Medicinces.redux';
import { Patient_Reducer } from './Patient.reducer';

export const RootReducer = combineReducers({
    counter : CounterReducer,
    medicine : medicincesreducer,
    patient: Patient_Reducer
})