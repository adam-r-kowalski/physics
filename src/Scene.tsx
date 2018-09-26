import * as React from "react";

import * as context from "./context";
import * as t from "./transform";

export default () => (
  <context.Consumer>
    {({ state }) => {
      const window = state.window.dataSync();
      const [width, height] = window;
      const transform = t.compose(
        t.translate(width / 2, height / 2),
        t.flipY,
        t.scale(10, 10),
      );

      return (
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          <g transform={t.toString(transform)}>
            <circle r={1} />
          </g>
        </svg>
      );
    }}
  </context.Consumer>
);
