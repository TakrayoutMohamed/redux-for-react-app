import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { increment , decrement,incrementByAmount } from "../state/counter/counterSlice";

/*
* interface IActionIncrementType {
*   type: string;
* }
* 
* const actionIncrementObj: IActionIncrementType = {
*   type: "counter/increment",
* };
* the commented code above is equale to the increment() function passed to dispath bellow 
*/

function Counter() {
  const count = useSelector((state: RootState) => state.counters.value);
  const dd = useSelector((state: RootState) => state.counters.dd);
  const dispatch = useDispatch();
  return (
    <div>
      <h2>{count} ---- {dd}</h2>
      <button onClick={() => dispatch(increment())} className="m-4 btn btn-success "> + </button>
      <button onClick={() => dispatch(decrement())} className="m-4 btn btn-success "> - </button>
      <button onClick={() => dispatch(incrementByAmount(3))} className="m-4 btn btn-success "> + amount 3 </button>
    </div>
  );
}

export default Counter;
