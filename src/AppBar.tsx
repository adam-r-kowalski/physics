import * as mui from "@material-ui/core";
import * as React from "react";

import { drawerWidth } from "./Drawer";

export const appBarHeight = 64;

const styles = () =>
  mui.createStyles({
    appBar: {
      height: appBarHeight,
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
    },
  });

interface Props {
  classes: {
    appBar: string;
  };
  time: number;
}

const AppBar = (props: Props) => (
  <mui.AppBar position="absolute" className={props.classes.appBar}>
    <mui.Toolbar>
      <mui.Typography variant="title" color="inherit">
        Physics {(props.time / 1000).toFixed(2)} seconds
      </mui.Typography>
    </mui.Toolbar>
  </mui.AppBar>
);

export default mui.withStyles(styles)(AppBar);
