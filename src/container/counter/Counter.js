import React from 'react';
import { useDispatch , useSelector} from "react-redux";
import {increment , decrement} from '../../redux/action/Counter.Action';

function Counter(props) {

    const dispatch = useDispatch();
    const c=useSelector(state=>state.counter);

    const handleIncrement=()=>{
        dispatch(increment());
    }

    const handleDecrement=()=>{
        dispatch(decrement());
    }

    return (
        <div>
            <button onClick={() => handleIncrement()}>+</button>
            {c.counter}
            <button onClick={() =>handleDecrement()}>-</button>
        </div>
    );
}

export default Counter;