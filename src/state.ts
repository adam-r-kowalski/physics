import * as tf from "@tensorflow/tfjs";

export interface Particle {
  readonly acceleration: tf.Tensor1D;
  readonly force: tf.Tensor1D;
  readonly mass: number;
  readonly position: tf.Tensor1D;
  readonly velocity: tf.Tensor1D;
}

export interface Time {
  readonly delta: number;
  readonly timestamp: number;
}

export interface State {
  readonly particle: Particle;
  readonly playing: boolean;
  readonly time: Time;
  readonly window: tf.Tensor1D;
}

export const initialState: State = {
  particle: {
    acceleration: tf.zeros([2]),
    force: tf.tensor([0.00001, 0]),
    mass: 1,
    position: tf.zeros([2]),
    velocity: tf.zeros([2]),
  },
  playing: false,
  time: {
    delta: 0,
    timestamp: 0,
  },
  window: tf.tensor([window.innerWidth, window.innerHeight]),
};
