import * as React from "react";
import { Particle } from "./state";

import * as t from "./transform";

interface Props {
  particle: Particle;
}

export default (props: Props) => {
  const [x, y] = props.particle.position.dataSync();
  return <circle r={10} transform={t.toString(t.translate(x, y))} />;
};
