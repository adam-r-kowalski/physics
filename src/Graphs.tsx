import * as mui from "@material-ui/core";
import * as React from "react";
import * as V from "victory";
import { Plots } from "./state";

const graph = (title: string, data: number[][]) => (
  <>
    <mui.Typography variant="title">{title}</mui.Typography>
    <V.VictoryChart>
      <V.VictoryLine data={data} x={2} y={1} />
      <V.VictoryLine data={data} x={2} y={0} />
    </V.VictoryChart>
  </>
);

interface Props {
  plots: Plots;
}

export default (props: Props) => (
  <>
    {graph("Force", props.plots.force)}
    {graph("Acceleration", props.plots.acceleration)}
    {graph("Velocity", props.plots.velocity)}
    {graph("Position", props.plots.position)}
  </>
);
