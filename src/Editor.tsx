import * as React from "react";

import { Dispatch } from "./event";
import ForceEditor from "./ForceEditor";
import ParticleEditor from "./ParticleEditor";
import { Force, Particle } from "./state";

interface Props {
  dispatch: Dispatch;
  particle: Particle;
  forces: Force[];
}

export default (props: Props) => (
  <>
    <ParticleEditor dispatch={props.dispatch} particle={props.particle} />
    <ForceEditor dispatch={props.dispatch} forces={props.forces} />
  </>
);
