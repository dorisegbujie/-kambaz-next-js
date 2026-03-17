"use client";

import store from "./store";
import { Provider } from "react-redux";

export default function Lab4Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Provider store={store}>{children}</Provider>;
}