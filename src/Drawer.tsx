import * as mui from "@material-ui/core";
import * as React from "react";

import { Dispatch } from "./event";
import ForceEditor from "./ForceEditor";
import ParticleEditor from "./ParticleEditor";
import { Force, Particle } from "./state";

export const drawerWidth = 240;

const styles = () =>
  mui.createStyles({
    drawerPaper: {
      width: drawerWidth,
    },
  });

interface Props {
  classes: {
    drawerPaper: string;
  };
  dispatch: Dispatch;
  particle: Particle;
  forces: Force[];
}

export const Drawer = (props: Props) => (
  <mui.Drawer
    variant="permanent"
    anchor="left"
    classes={{ paper: props.classes.drawerPaper }}
  >
    <ParticleEditor dispatch={props.dispatch} particle={props.particle} />
    <ForceEditor dispatch={props.dispatch} forces={props.forces} />
  </mui.Drawer>
);

export default mui.withStyles(styles)(Drawer);
