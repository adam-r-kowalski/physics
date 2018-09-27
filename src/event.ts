import * as tf from "@tensorflow/tfjs";
import { produce } from "immer";

import {
  Force,
  initForce,
  initParticle,
  initPlots,
  initTime,
  Particle,
  State,
  Tab,
  Time,
} from "./state";

export interface Event {
  update: (state: State) => State;
}

export type Dispatch = (event: Event) => void;

const samplingFrequency = 500;
const scaling = 1000000;

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
    scaling,
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

export class CollectSample implements Event {
  constructor(private dispatch: Dispatch) {}

  public update = (state: State) => {
    const { acceleration, force, position, velocity } = state.particle;

    const [aX, aY] = tf.mul(acceleration, scaling).dataSync();
    const [fX, fY] = tf.mul(force, scaling).dataSync();
    const [pX, pY] = tf.mul(position, scaling).dataSync();
    const [vX, vY] = tf.mul(velocity, scaling).dataSync();

    const length = state.plots.force.length;

    if (state.playing) {
      setTimeout(
        () => this.dispatch(new CollectSample(this.dispatch)),
        samplingFrequency,
      );
    }

    return produce(state, nextState => {
      nextState.plots.acceleration.push([aX, aY, length]);
      nextState.plots.force.push([fX, fY, length]);
      nextState.plots.position.push([pX, pY, length]);
      nextState.plots.velocity.push([vX, vY, length]);
    });
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

    setTimeout(
      () => this.dispatch(new CollectSample(this.dispatch)),
      samplingFrequency,
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
      nextState.plots = initPlots();
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

export class ChangeTab implements Event {
  constructor(private tab: Tab) {}

  public update = (state: State) => ({ ...state, tab: this.tab });
}
