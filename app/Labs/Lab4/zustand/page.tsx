import ZustandCounter from "./counter";
import ZustandTodoList from "./todos/ZustandTodoList";

export default function ZustandExamples() {
  return (
    <div>
      <h1>Zustand Examples</h1>
      <ZustandCounter />
      <ZustandTodoList />
    </div>
  );
}