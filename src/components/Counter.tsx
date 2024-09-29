import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState, store } from "../state/store";
import { increment , decrement,incrementByAmount, incrementAsync } from "../state/counter/counterSlice";

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
  const data = store.getState();
  const aaa = store.dispatch;
  // console.log( JSON.stringify(aaa))
  console.log(JSON.stringify(data?.counters))
  const dd = useSelector((state: RootState) => state.counters.dd);
  // console.log(incrementIfOdd);
  const dispatch = useDispatch<AppDispatch>();
  return (
    <div>
      <h2>{count} ---- {dd}</h2>
      <button onClick={() => dispatch(increment())} className="m-4 btn btn-success "> + </button>
      <button onClick={() => dispatch(decrement())} className="m-4 btn btn-success "> - </button>
      <button onClick={() => dispatch(incrementByAmount(3))} className="m-4 btn btn-success "> + amount 3 </button>
      <button onClick={() => dispatch(incrementAsync(3))} className="m-4 btn btn-success "> incrementAsync </button>
    </div>
  );
}

export default Counter;
