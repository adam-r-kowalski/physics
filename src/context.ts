import * as React from "react";

import { Dispatch } from "./event";
import { initialState, State } from "./state";

export interface Context {
  state: State;
  dispatch: Dispatch;
}

const context = React.createContext<Context>({
  dispatch: console.log,
  state: initialState,
});

export const Consumer = context.Consumer;
export const Provider = context.Provider;
