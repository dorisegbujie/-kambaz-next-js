"use client";

import useCounterStore from "./useCounterStore";

export default function ZustandCounter() {
  const { count, increment, decrement } = useCounterStore();

  return (
    <div id="wd-zustand-counter">
      <h2>Zustand Counter</h2>
      <h3>{count}</h3>

      <button onClick={increment} id="wd-zustand-increment-click">
        Increment
      </button>

      <button onClick={decrement} id="wd-zustand-decrement-click">
        Decrement
      </button>

      <hr />
    </div>
  );
}