import * as mui from "@material-ui/core";
import * as React from "react";

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
}

export const Drawer = (props: Props) => (
  <mui.Drawer
    variant="permanent"
    anchor="left"
    classes={{ paper: props.classes.drawerPaper }}
  >
    <div>hello</div>
  </mui.Drawer>
);

export default mui.withStyles(styles)(Drawer);
