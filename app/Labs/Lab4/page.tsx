"use client";

import ClickEvent from "./ClickEvent";
import PassingDataOnEvent from "./PassingDataOnEvent";
import PassingFunctions from "./PassingFunctions";
import Counter from "./Counter";
import BooleanStateVariables from "./BooleanStateVariables";
import StringStateVariables from "./StringStateVariables";
import DateStateVariables from "./DateStateVariables";
import ObjectStateVariable from "./ObjectStateVariable";
import ArrayStateVariable from "./ArrayStateVariable";
import ParentStateComponent from "./ParentStateComponent";
import Link from "next/link";
import TodoList from "./redux/todos/TodoList";


export default function Lab4() {
  function sayHello() {
    alert("Hello");
  }

  return (
    <div id="wd-lab4">
      <h2>Lab 4</h2>
      <hr />

      <ClickEvent />
      <PassingDataOnEvent />

      <div id="wd-passing-functions">
        <PassingFunctions theFunction={sayHello} />
      </div>

      <Counter />
      <BooleanStateVariables />
      <StringStateVariables />
      <DateStateVariables />
      <ObjectStateVariable />
      <ArrayStateVariable />
      <ParentStateComponent />

      <Link href="/Labs/Lab4/redux">Redux Examples</Link>
      <TodoList />
      <Link href="/Labs/Lab4/react-context">React Context Examples</Link>
<hr />
<Link href="/Labs/Lab4/zustand">Zustand Examples</Link>
    </div>
  );
}