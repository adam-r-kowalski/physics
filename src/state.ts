import * as tf from "@tensorflow/tfjs";

export interface Particle {
  readonly acceleration: tf.Tensor1D;
  readonly force: tf.Tensor1D;
  readonly position: tf.Tensor1D;
  readonly velocity: tf.Tensor1D;
}

export interface State {
  readonly particle: Particle;
  readonly window: tf.Tensor1D;
}

export const initialState: State = {
  particle: {
    acceleration: tf.zeros([2]),
    force: tf.zeros([2]),
    position: tf.zeros([2]),
    velocity: tf.zeros([2]),
  },
  window: tf.tensor([window.innerWidth, window.innerHeight]),
};
