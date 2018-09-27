import * as tf from "@tensorflow/tfjs";
import { produce } from "immer";

import {
  Force,
  initForce,
  initParticle,
  initTime,
  Particle,
  State,
  Time,
} from "./state";

export interface Event {
  update: (state: State) => State;
}

export type Dispatch = (event: Event) => void;

const updateTime = (time: Time, timestamp: number): Time => {
  const delta = time.timestamp === 0 ? 0 : timestamp - time.timestamp;
  return { delta, timestamp, total: time.total + delta };
};

const updateParticle = (
  forces: Force[],
  particle: Particle,
  delta: number,
): Particle => {
  const force = tf.div<tf.Tensor1D>(
    forces.reduce(
      (previous, current) =>
        !current.active ? previous : tf.add(previous, current.vector),
      tf.zeros([2]),
    ),
    100000,
  );

  const { mass } = particle;

  const acceleration = tf.div<tf.Tensor1D>(force, mass);

  const velocity = tf.add<tf.Tensor1D>(
    tf.mul(acceleration, delta),
    particle.velocity,
  );

  const position = tf.add<tf.Tensor1D>(
    tf.mul(velocity, delta),
    particle.position,
  );

  return { acceleration, force, mass, position, velocity };
};

export class AnimationFrame implements Event {
  constructor(private timestamp: number, private dispatch: Dispatch) {}

  public update = (state: State) => {
    const time = state.playing
      ? updateTime(state.time, this.timestamp)
      : { ...initTime(), total: state.time.total };
    const particle = updateParticle(state.forces, state.particle, time.delta);

    if (state.playing) {
      requestAnimationFrame(timestamp =>
        this.dispatch(new AnimationFrame(timestamp, this.dispatch)),
      );
    }

    return { ...state, time, particle };
  };
}

export class Resize implements Event {
  public update = (state: State) => ({
    ...state,
    window: tf.tensor1d([window.innerWidth, window.innerHeight]),
  });
}

export class DeactivateForce implements Event {
  constructor(private index: number) {}

  public update = (state: State) =>
    produce(state, nextState => {
      nextState.forces[this.index].active = false;
    });
}

export class Play implements Event {
  constructor(private dispatch: Dispatch) {}

  public update = (state: State) => {
    requestAnimationFrame(timestamp =>
      this.dispatch(new AnimationFrame(timestamp, this.dispatch)),
    );

    return !state.firstPlay
      ? { ...state, playing: true }
      : produce(state, nextState => {
          nextState.forces.forEach((f, index) => {
            if (f.duration !== 0) {
              setTimeout(
                () => this.dispatch(new DeactivateForce(index)),
                f.duration * 1000,
              );
            }

            f.active = true;
          });
          nextState.firstPlay = false;
          nextState.playing = true;
        });
  };
}

export class Pause implements Event {
  public update = (state: State) => ({ ...state, playing: false });
}

export class Restart implements Event {
  public update = (state: State) =>
    produce(state, nextState => {
      nextState.firstPlay = true;
      nextState.particle = { ...initParticle(), mass: nextState.particle.mass };
      nextState.playing = false;
      nextState.forces.forEach(f => (f.active = false));
      nextState.time = initTime();
    });
}

export class ChangeParticleMass implements Event {
  constructor(private value: number) {}

  public update = (state: State) =>
    produce(state, nextState => {
      nextState.particle.mass = this.value;
    });
}

export class ChangeForceDuration implements Event {
  constructor(private value: number, private index: number) {}

  public update = (state: State) =>
    produce(state, nextState => {
      nextState.forces[this.index].duration = Math.max(this.value, 0);
    });
}

export class ChangeForceXComponent implements Event {
  constructor(private value: number, private index: number) {}

  public update = (state: State) => {
    const [_, y] = state.forces[this.index].vector.dataSync();
    return produce(state, nextState => {
      nextState.forces[this.index].vector = tf.tensor1d([this.value, y]);
    });
  };
}

export class ChangeForceYComponent implements Event {
  constructor(private value: number, private index: number) {}

  public update = (state: State) => {
    const [x, _] = state.forces[this.index].vector.dataSync();
    return produce(state, nextState => {
      nextState.forces[this.index].vector = tf.tensor1d([x, this.value]);
    });
  };
}

export class DeleteForce implements Event {
  constructor(private index: number) {}

  public update = (state: State) =>
    produce(state, nextState => {
      nextState.forces.splice(this.index, 1);
    });
}

export class InsertForce implements Event {
  public update = (state: State) =>
    produce(state, nextState => {
      nextState.forces.push(initForce());
    });
}
