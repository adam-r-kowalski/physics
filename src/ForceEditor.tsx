import * as mui from "@material-ui/core";
import * as icons from "@material-ui/icons";
import * as React from "react";

import {
  ChangeForceDuration,
  ChangeForceXComponent,
  ChangeForceYComponent,
  DeleteForce,
  Dispatch,
  InsertForce,
} from "./event";
import { Force } from "./state";

const styles = (theme: mui.Theme) =>
  mui.createStyles({
    active: {
      backgroundColor: theme.palette.primary.light,
    },
    card: {
      margin: theme.spacing.unit,
      overflow: "visible",
    },
    insertButton: {
      margin: theme.spacing.unit,
    },
    textField: {
      width: "100%",
    },
  });

interface Props {
  classes: {
    active: string;
    insertButton: string;
    card: string;
    textField: string;
  };
  dispatch: Dispatch;
  forces: Force[];
}

const ForceEditor = (props: Props) => (
  <>
    {props.forces.map((force, index) => {
      const [x, y] = force.vector.dataSync();

      const className = force.active
        ? `${props.classes.card} ${props.classes.active}`
        : props.classes.card;

      return (
        <mui.Card className={className} key={index}>
          <mui.CardContent>
            <mui.Typography>Force {index + 1}</mui.Typography>

            <mui.TextField
              value={force.duration}
              type="number"
              label="Duration"
              placeholder="Duration"
              margin="normal"
              className={props.classes.textField}
              onChange={e =>
                props.dispatch(
                  new ChangeForceDuration(parseFloat(e.target.value), index),
                )
              }
            />

            <mui.TextField
              value={x}
              type="number"
              label="X Component"
              placeholder="X Component"
              margin="normal"
              className={props.classes.textField}
              onChange={e =>
                props.dispatch(
                  new ChangeForceXComponent(parseFloat(e.target.value), index),
                )
              }
            />

            <mui.TextField
              value={y}
              type="number"
              label="Y Component"
              placeholder="Y Component"
              margin="normal"
              className={props.classes.textField}
              onChange={e =>
                props.dispatch(
                  new ChangeForceYComponent(parseFloat(e.target.value), index),
                )
              }
            />
          </mui.CardContent>
          <mui.CardActions>
            <mui.Button
              color="secondary"
              onClick={() => props.dispatch(new DeleteForce(index))}
            >
              <icons.Delete />
              Delete
            </mui.Button>
          </mui.CardActions>
        </mui.Card>
      );
    })}
    <mui.Button
      color="primary"
      className={props.classes.insertButton}
      onClick={() => props.dispatch(new InsertForce())}
    >
      <icons.Add />
      Insert Force
    </mui.Button>
  </>
);

export default mui.withStyles(styles)(ForceEditor);
