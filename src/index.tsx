import * as React from "react";
import * as ReactDOM from "react-dom";

import AppBar from "./AppBar";
import Drawer from "./Drawer";
import { Event, Resize } from "./event";
import Particle from "./Particle";
import Scene from "./Scene";
import { initialState, State } from "./state";

document.body.style.margin = "0";
document.body.style.overflow = "hidden";

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);
    this.state = initialState;
  }

  public componentDidMount = () =>
    window.addEventListener("resize", () => this.dispatch(new Resize()));

  public render = () => (
    <div>
      <AppBar />
      <Drawer />
      <Scene window={this.state.window}>
        <Particle particle={this.state.particle} />
      </Scene>
    </div>
  );

  private dispatch = (event: Event) => this.setState(event.update(this.state));
}

ReactDOM.render(<App />, document.getElementById("app"));
