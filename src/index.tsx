import * as React from "react";
import * as ReactDOM from "react-dom";

import AppBar from "./AppBar";
import Drawer from "./Drawer";
import { Event, Resize } from "./event";
import Particle from "./Particle";
import PlayPause from "./PlayPause";
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

  public render = () => {
    const { time, forces, particle, tab, window, playing } = this.state;
    return (
      <div>
        <AppBar time={time} />
        <Drawer
          dispatch={this.dispatch}
          forces={forces}
          particle={particle}
          tab={tab}
        />
        <Scene window={window}>
          <Particle particle={particle} />
        </Scene>
        <PlayPause dispatch={this.dispatch} playing={playing} />
      </div>
    );
  };

  private dispatch = (event: Event) => this.setState(event.update(this.state));
}

ReactDOM.render(<App />, document.getElementById("app"));
