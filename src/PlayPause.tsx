import * as mui from "@material-ui/core";
import * as icons from "@material-ui/icons";
import * as React from "react";

import { Dispatch, Pause, Play, Restart } from "./event";

interface Props {
  classes: {
    playPause: string;
    restart: string;
  };
  dispatch: Dispatch;
  playing: boolean;
}

const styles = () =>
  mui.createStyles({
    playPause: {
      bottom: 10,
      position: "absolute",
      right: 10,
    },
    restart: {
      bottom: 10,
      position: "absolute",
      right: 80,
    },
  });

const PlayPause = (props: Props) => {
  const action = !props.playing
    ? () => props.dispatch(new Play(props.dispatch))
    : () => props.dispatch(new Pause());

  const icon = !props.playing ? <icons.PlayArrow /> : <icons.Pause />;

  return (
    <>
      <mui.Button
        variant="fab"
        color="secondary"
        className={props.classes.restart}
        onClick={() => props.dispatch(new Restart())}
      >
        <icons.Refresh />
      </mui.Button>

      <mui.Button
        variant="fab"
        color="primary"
        className={props.classes.playPause}
        onClick={action}
      >
        {icon}
      </mui.Button>
    </>
  );
};

export default mui.withStyles(styles)(PlayPause);
