import * as tf from "@tensorflow/tfjs";
import * as React from "react";

import { appBarHeight } from "./AppBar";
import { drawerWidth } from "./Drawer";
import * as t from "./transform";

const styles: { [name: string]: React.CSSProperties } = {
  scene: {
    backgroundColor: "lightgray",
    marginLeft: drawerWidth,
    marginTop: appBarHeight,
    strokeWidth: 0,
  },
};

interface Props {
  window: tf.Tensor1D;
  children: React.ReactNode;
}

export default (props: Props) => {
  const [width, height] = props.window.dataSync();
  const reducedWidth = width - drawerWidth;
  const reducedHeight = height - appBarHeight;

  const transform = t.compose(
    t.translate(reducedWidth / 2, reducedHeight / 2),
    t.flipY,
  );

  return (
    <svg
      width={reducedWidth}
      height={reducedHeight}
      viewBox={`0 0 ${reducedWidth} ${reducedHeight}`}
      style={styles.scene}
    >
      <g transform={t.toString(transform)}>{props.children}</g>
    </svg>
  );
};
