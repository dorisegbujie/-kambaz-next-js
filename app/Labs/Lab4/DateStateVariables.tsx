"use client";

import { useState } from "react";
import FormControl from "react-bootstrap/FormControl";

export default function DateStateVariables() {
  const [date, setDate] = useState(new Date());

  const dateString = date.toISOString().slice(0, 10);

  return (
    <div id="wd-date-state-variables">
      <h2>Date State Variables</h2>

      <p>{dateString}</p>

      <FormControl
        type="date"
        defaultValue={dateString}
        onChange={(e) => setDate(new Date(e.target.value))}
      />

      <hr />
    </div>
  );
}