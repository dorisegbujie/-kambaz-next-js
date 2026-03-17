import HelloRedux from "./hello";
import CounterRedux from "./counter";
import AddRedux from "./AddRedux";

export default function ReduxExamples() {
  return (
    <div>
      <h2>Redux Examples</h2>
      <HelloRedux />
      <CounterRedux />
      <AddRedux />
    </div>
  );
}