import * as React from "react";
import * as ReactDOM from "react-dom";

import * as context from "./context";
import { Event } from "./event";
import Scene from "./Scene";
import { initialState, State } from "./state";

document.body.style.margin = "0";
document.body.style.overflow = "hidden";

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = initialState;
  }

  public render = () => (
    <context.Provider value={{ state: this.state, dispatch: this.dispatch }}>
      <Scene />
    </context.Provider>
  );

  private dispatch = (event: Event) => this.setState(event.update(this.state));
}

ReactDOM.render(<App />, document.getElementById("app"));
