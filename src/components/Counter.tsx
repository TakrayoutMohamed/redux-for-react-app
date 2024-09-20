import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { increment } from "../state/counter/counterSlice";

function Counter() {
    const count = useSelector((state : RootState) => state.counter.value);
    const dispatch = useDispatch();
  return <div onClick={() => dispatch(increment())}>Counter = {count}</div>;
}

export default Counter;
