import * as React from "react";
import * as V from "victory";

interface Props {
  data: number[][];
}

export default (props: Props) => (
  <V.VictoryChart theme={V.VictoryTheme.material}>
    <V.VictoryLine
      style={{
        data: { stroke: "#c43a31" },
        parent: { border: "1px solid #ccc" },
      }}
      data={props.data}
      x={2}
      y={1}
    />
  </V.VictoryChart>
);
