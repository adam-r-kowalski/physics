import * as tf from "@tensorflow/tfjs";

export interface Particle {
  readonly acceleration: tf.Tensor1D;
  readonly force: tf.Tensor1D;
  readonly mass: number;
  readonly position: tf.Tensor1D;
  readonly velocity: tf.Tensor1D;
}

export const initParticle = (): Particle => ({
  acceleration: tf.zeros([2]),
  force: tf.zeros([2]),
  mass: 1,
  position: tf.zeros([2]),
  velocity: tf.zeros([2]),
});

export interface Time {
  readonly delta: number;
  readonly timestamp: number;
  readonly total: number;
}

export const initTime = (): Time => ({ delta: 0, timestamp: 0, total: 0 });

export interface Force {
  readonly active: boolean;
  readonly duration: number;
  readonly vector: tf.Tensor1D;
}

export const initForce = (): Force => ({
  active: false,
  duration: 0,
  vector: tf.zeros([2]),
});

export enum Tab {
  Editor,
  Graphs,
}

export interface Plots {
  acceleration: number[][];
  force: number[][];
  position: number[][];
  velocity: number[][];
}

export const initPlots = (): Plots => ({
  acceleration: [],
  force: [],
  position: [],
  velocity: [],
});

export interface State {
  readonly firstPlay: boolean;
  readonly forces: Force[];
  readonly particle: Particle;
  readonly playing: boolean;
  readonly plots: Plots;
  readonly tab: Tab;
  readonly time: Time;
  readonly window: tf.Tensor1D;
}

export const initialState: State = {
  firstPlay: true,
  forces: [initForce()],
  particle: initParticle(),
  playing: false,
  plots: initPlots(),
  tab: Tab.Editor,
  time: initTime(),
  window: tf.tensor([window.innerWidth, window.innerHeight]),
};
