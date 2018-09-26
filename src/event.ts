import { State } from "./state";

export interface Event {
  update: (state: State) => State;
}

export type Dispatch = (event: Event) => void;
