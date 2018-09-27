import * as mui from "@material-ui/core";
import * as React from "react";

import Editor from "./Editor";
import { ChangeTab, Dispatch } from "./event";
import { Force, Particle, Tab } from "./state";

export const drawerWidth = 325;

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
  tab: Tab;
}

export const Drawer = (props: Props) => (
  <mui.Drawer
    variant="permanent"
    anchor="left"
    classes={{ paper: props.classes.drawerPaper }}
  >
    <mui.Tabs value={props.tab === Tab.Editor ? 0 : 1}>
      <mui.Tab
        label="Editor"
        onClick={() => props.dispatch(new ChangeTab(Tab.Editor))}
      />
      <mui.Tab
        label="Graphs"
        onClick={() => props.dispatch(new ChangeTab(Tab.Graphs))}
      />
    </mui.Tabs>

    {props.tab === Tab.Editor ? (
      <Editor
        dispatch={props.dispatch}
        particle={props.particle}
        forces={props.forces}
      />
    ) : (
      <></>
    )}
  </mui.Drawer>
);

export default mui.withStyles(styles)(Drawer);
