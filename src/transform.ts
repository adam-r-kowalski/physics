import * as tf from "@tensorflow/tfjs";

export const translate = (x: number = 0, y: number = 0): tf.Tensor2D =>
  // prettier-ignore
  tf.tensor([[1, 0, x],
             [0, 1, y],
             [0, 0, 1]]);

export const scale = (x: number = 0, y: number = 0): tf.Tensor2D =>
  // prettier-ignore
  tf.tensor([[x, 0, 0],
             [0, y, 0],
             [0, 0, 1]]);

export const compose = (...ts: tf.Tensor2D[]): tf.Tensor2D =>
  ts.reduce((p, c) => tf.matMul(p, c), identity);

export const identity = tf.eye(3, 3);

export const flipY = scale(1, -1);

export const toString = (t: tf.Tensor2D) => {
  const [a, c, e, b, d, f] = t.dataSync();
  return `matrix(${a} ${b} ${c} ${d} ${e} ${f})`;
};
