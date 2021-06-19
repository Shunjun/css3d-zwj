const keyMap = [
  "translate3d",
  "translate",
  "translateX",
  "translateY",
  "translateZ",
  "scale3d",
  "scale",
  "scaleX",
  "scaleY",
  "scaleZ",
  "rotate",
  "rotate3d",
  "rotateX",
  "rotateY",
  "rotateZ",
];

const valueMap = ["x", "y", "z"];

/**
 * 解析Transform
 * @param {string} str
 * @returns {{x,y,z,rx,ry,rz}[]}
 */
function parseTransform(str) {
  const transformArr = [];

  while (str.indexOf(")") !== -1) {
    keyMap.forEach((key) => {
      const startWithKey = new RegExp(`^[ ]*${key}[ ]*\\\(`).test(str);
      if (startWithKey) {
        const left = str.indexOf("(");
        const right = str.indexOf(")");
        const values = str.slice(left + 1, right);

        const newEntry = {
          key,
          values: values.split(",").reduce((r, v, i, arr) => {
            if (arr.length === 1) return v;
            r[valueMap[i]] = v.trim();
            return r;
          }, {}),
        };

        transformArr.push(newEntry);
        str = str.slice(right + 1);
      }
    });
  }
  return transformArr;
}

module.exports = parseTransform;
