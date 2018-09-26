import * as mui from "@material-ui/core";
import * as React from "react";

import { Dispatch } from "./event";
import { Particle } from "./state";

export const drawerWidth = 240;

const styles = () =>
  mui.createStyles({
    card: {
      margin: 5,
    },
    drawerPaper: {
      width: drawerWidth,
    },
  });

interface Props {
  classes: {
    card: string;
    drawerPaper: string;
  };
  dispatch: Dispatch;
  particle: Particle;
}

export const Drawer = (props: Props) => (
  <mui.Drawer
    variant="permanent"
    anchor="left"
    classes={{ paper: props.classes.drawerPaper }}
  >
    <mui.Card className={props.classes.card}>
      <mui.CardContent>
        <mui.Typography>Particle</mui.Typography>

        <mui.TextField
          value={props.particle.mass}
          type="number"
          label="Mass"
          placeholder="Mass"
          margin="normal"
        />
      </mui.CardContent>
    </mui.Card>
  </mui.Drawer>
);

export default mui.withStyles(styles)(Drawer);
