import * as tf from "@tensorflow/tfjs";

import { initTime, Particle, State, Time } from "./state";

export interface Event {
  update: (state: State) => State;
}

export type Dispatch = (event: Event) => void;

const updateTime = (time: Time, timestamp: number): Time => {
  const delta = time.timestamp === 0 ? 0 : timestamp - time.timestamp;
  return { delta, timestamp };
};

const updateParticle = (particle: Particle, delta: number): Particle => {
  const { force, mass } = particle;

  const acceleration = tf.div(force, mass);

  const velocity = tf.add<tf.Tensor1D>(
    tf.mul(acceleration, delta),
    particle.velocity,
  );

  const position = tf.add<tf.Tensor1D>(
    tf.mul(velocity, delta),
    particle.position,
  );

  return { ...particle, position, velocity };
};

export class AnimationFrame implements Event {
  constructor(private timestamp: number, private dispatch: Dispatch) {}

  public update = (state: State) => {
    const time = state.playing
      ? updateTime(state.time, this.timestamp)
      : initTime();
    const particle = updateParticle(state.particle, time.delta);

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

export class Play implements Event {
  constructor(private dispatch: Dispatch) {}
  public update = (state: State) => {
    requestAnimationFrame(timestamp =>
      this.dispatch(new AnimationFrame(timestamp, this.dispatch)),
    );
    return { ...state, playing: true };
  };
}

export class Pause implements Event {
  public update = (state: State) => ({ ...state, playing: false });
}
