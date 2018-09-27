import * as mui from "@material-ui/core";
import * as React from "react";

import { ChangeParticleMass, Dispatch } from "./event";
import { Particle } from "./state";

const styles = (theme: mui.Theme) =>
  mui.createStyles({
    card: {
      margin: theme.spacing.unit,
      overflow: "visible",
    },
  });

interface Props {
  classes: {
    card: string;
  };
  dispatch: Dispatch;
  particle: Particle;
}

const ParticleEditor = (props: Props) => (
  <mui.Card className={props.classes.card}>
    <mui.CardContent>
      <mui.Typography>Particle</mui.Typography>

      <mui.TextField
        value={props.particle.mass}
        type="number"
        label="Mass"
        placeholder="Mass"
        margin="normal"
        onChange={e =>
          props.dispatch(new ChangeParticleMass(parseFloat(e.target.value)))
        }
      />
    </mui.CardContent>
  </mui.Card>
);

export default mui.withStyles(styles)(ParticleEditor);
