"use client";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { increment, decrement } from "./counterReducer";

export default function CounterRedux() {
  const count = useSelector((state: RootState) => state.counterReducer.count);
  const dispatch = useDispatch();

  return (
    <div id="wd-counter-redux">
      <h3>Counter Redux</h3>
      <h4>{count}</h4>

      <button
        className="btn btn-primary me-2"
        id="wd-counter-redux-up-click"
        onClick={() => dispatch(increment())}
      >
        Up
      </button>

      <button
        className="btn btn-danger"
        id="wd-counter-redux-down-click"
        onClick={() => dispatch(decrement())}
      >
        Down
      </button>

      <hr />
    </div>
  );
}