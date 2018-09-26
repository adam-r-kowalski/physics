import * as mui from "@material-ui/core";
import * as icons from "@material-ui/icons";
import * as React from "react";

import { Dispatch, Pause, Play } from "./event";

interface Props {
  classes: {
    button: string;
  };
  dispatch: Dispatch;
  playing: boolean;
}

const styles = () =>
  mui.createStyles({
    button: {
      bottom: 10,
      position: "absolute",
      right: 10,
    },
  });

const PlayPause = (props: Props) => {
  const action = !props.playing
    ? () => props.dispatch(new Play(props.dispatch))
    : () => props.dispatch(new Pause());

  const icon = !props.playing ? <icons.PlayArrow /> : <icons.Pause />;

  return (
    <mui.Button
      variant="fab"
      color="primary"
      className={props.classes.button}
      onClick={action}
    >
      {icon}
    </mui.Button>
  );
};

export default mui.withStyles(styles)(PlayPause);
