import parseTransform from "./parseTransform";

const defaultTransform = [
  {
    key: "translate3d",
    values: {
      x: "0",
      y: "0",
      z: "0",
    },
  },
  { key: "rotateX", values: "0deg" },
  { key: "rotateY", values: "0deg" },
  { key: "rotateZ", values: "0deg" },
  {
    key: "scale3d",
    values: {
      x: "1",
      y: "1",
      z: "1",
    },
  },
];

/**
 * 统一值类型
 * @param {*} values
 * @returns
 */
function unifyValue(values) {
  if (!values) return {};
  return typeof values === "string" ? { x: values } : Object.assign({}, values);
}

/**
 * 是否为计算属性
 * @param {*} value
 * @returns
 */
function isCalculation(value) {
  return /^[+]/.test(value);
}

/**
 * 获取值和单位
 * @param {*} value
 * @returns
 */
function getValueAndMeasure(value) {
  return [
    Number(value.match(/[-]?\d+\.?\d*/)) || 0,
    value.replace(/^[+|-]*\d+\.?\d*/, ""),
  ];
}

/**
 * 值合并
 */
function margeValues(...args) {
  return args.reduce((res, values) => {
    values = unifyValue(values);
    Object.entries(values).forEach(([coord, value]) => {
      if (isCalculation(value)) {
        const [preV] = getValueAndMeasure(res[coord]);
        const [newV, measure] = getValueAndMeasure(value);
        res[coord] = `${preV + newV}${measure}`;
      } else {
        res[coord] = value;
      }
    });
    return res;
  }, {});
}

/**
 * 创建transFrom
 * @param {Element} ele
 * @param {{}} options
 * @returns {str}
 */
export default function setTransform(ele, options) {
  if (!ele || !options) return;
  let sourceTransformStr = ele.style.transform;

  const baseTransform = "translate3d(-50%, -50%, 0px)";
  sourceTransformStr = sourceTransformStr.replace(baseTransform, "");
  const source = parseTransform(sourceTransformStr);
  let result = [baseTransform];

  // 1.处理默认的属性
  defaultTransform.forEach((defaultTran, i) => {
    const key = defaultTran.key;
    let values = defaultTran.values;
    let sourceValues, optionsValues;
    const sourceIndex = source.findIndex((tran) => tran.key === key);
    // source 中的值
    if (sourceIndex !== -1) {
      const sourceTran = source[sourceIndex];
      // 移除找到的index
      source.splice(sourceIndex, 1);
      sourceValues = sourceTran.values;
    }

    // options 中的值
    if (key in options) {
      optionsValues = options[key];
      delete options[key];
    }

    values = margeValues(values, sourceValues, optionsValues);

    result.push(`${key}(${Object.values(values).join(", ")})`);
  });

  // 3.检查 source 中未使用的属性
  if (source.length) {
  }

  const resultStr = result.join(" ");
  ele.style.transform = resultStr;
}
