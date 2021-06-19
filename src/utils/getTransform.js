const deg = Math.PI / 180;

/**
 * 获取位置
 * @param {number} d 距离原点的距离
 * @param {number} n 有几个
 * @param {number} i 第几个
 */
export function getPosition(d, n, i) {
  const sigma = (360 / n) * i * deg;
  const x = Number((d * Math.cos(sigma)).toFixed(6));
  const y = Number((d * Math.sin(sigma)).toFixed(6));
  return [x, y];
}

/**
 *  获取旋转角
 * @param {*} n 有几个
 * @param {*} i 第几个
 */
export function getRotate(n, i) {
  return 360 - (360 / n) * i - 90;
}
