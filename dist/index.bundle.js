/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_setTransform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/setTransform */ \"./src/utils/setTransform.js\");\n/* harmony import */ var _utils_getTransform__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/getTransform */ \"./src/utils/getTransform.js\");\n/* harmony import */ var _utils_getImageScale__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/getImageScale */ \"./src/utils/getImageScale.js\");\n\n\n\n\n(async function () {\n  const rootEle = document.getElementById(\"root\");\n\n  const SLICES_COUNT = 20;\n  const SLICES_WIDTH = 100;\n  const DGE = Math.PI / 180;\n  // 旋转速度\n  const SPAN_SPEED = -0.1;\n  // 物体距离\n  const CAMERA_DISTENCE = 600;\n\n  const slicesWidthScale = await (0,_utils_getImageScale__WEBPACK_IMPORTED_MODULE_2__.getImageScale)(\"/images/p0.png\");\n  const screenWidth = window.innerWidth;\n  const screenHeight = window.innerHeight;\n  let distance;\n\n  // 层\n  let box;\n  let container;\n  let loop;\n  let camera;\n  // 播放器\n  let player;\n  let animationId = 0;\n  let playing = false;\n\n  /**\n   * 计算距离\n   * @returns\n   */\n  function calculateDistance() {\n    const r = (360 / SLICES_COUNT) * DGE;\n    return Math.floor(SLICES_WIDTH / Math.tan(r)) + 6;\n  }\n  distance = calculateDistance();\n\n  // 构建贴片\n  function createLoop() {\n    const tempFragment = document.createDocumentFragment();\n    new Array(SLICES_COUNT).fill(1).forEach((_, i) => {\n      const div = document.createElement(\"div\");\n      div.className = \"slices\";\n      div.style.top = 0;\n      div.style.width = `${SLICES_WIDTH}px`;\n      div.style.height = `${SLICES_WIDTH / slicesWidthScale}px`;\n\n      div.style.backgroundImage = `url(\"/images/p${i}.png\")`;\n      const [x, z] = (0,_utils_getTransform__WEBPACK_IMPORTED_MODULE_1__.getPosition)(distance, SLICES_COUNT, i);\n      const r = (0,_utils_getTransform__WEBPACK_IMPORTED_MODULE_1__.getRotate)(SLICES_COUNT, i);\n      (0,_utils_setTransform__WEBPACK_IMPORTED_MODULE_0__.default)(div, {\n        translate3d: {\n          x: `${x}px`,\n          z: `${z}px`,\n        },\n        rotateY: `${r}deg`,\n      });\n\n      tempFragment.append(div);\n    });\n    return tempFragment;\n  }\n  loop = createLoop();\n\n  /**\n   * 创建容纳贴片的盒子\n   * 旋转做在盒子上面\n   */\n  function createBox() {\n    box = document.createElement(\"div\");\n    box.className = \"box\";\n\n    (0,_utils_setTransform__WEBPACK_IMPORTED_MODULE_0__.default)(box, {\n      translate3d: {\n        x: `${Number(screenWidth) / 2}px`,\n        y: `${Number(screenHeight) / 2}px`,\n      },\n    });\n  }\n  createBox();\n\n  /**\n   * 给盒子添加滚动动画\n   */\n  function createAnimation() {\n    function spin() {\n      (0,_utils_setTransform__WEBPACK_IMPORTED_MODULE_0__.default)(box, {\n        rotateY: `+${SPAN_SPEED}deg`,\n      });\n      animationId = requestAnimationFrame(spin);\n    }\n\n    function play() {\n      if (playing) return;\n      playing = true;\n      animationId = requestAnimationFrame(spin);\n    }\n\n    function stop() {\n      if (!playing) return;\n      playing = false;\n      webkitCancelAnimationFrame(animationId);\n    }\n\n    return {\n      play,\n      stop,\n    };\n  }\n  player = createAnimation();\n  player.play();\n\n  /**\n   * Container 用来控制距离\n   */\n  function creareContainer() {\n    container = document.createElement(\"div\");\n    container.className = \"container\";\n\n    (0,_utils_setTransform__WEBPACK_IMPORTED_MODULE_0__.default)(container, {\n      translate3d: {\n        z: `${CAMERA_DISTENCE}px`,\n      },\n    });\n  }\n  creareContainer();\n\n  /**\n   * 最外层的摄像机\n   */\n  function createCamera() {\n    camera = document.createElement(\"div\");\n    camera.id = \"camera\";\n    camera.style.width = `${screenWidth}px`;\n    camera.style.height = `${screenHeight}px`;\n    camera.className = \"camrea\";\n  }\n  createCamera();\n\n  function distence2Reg(distence) {\n    const width = window.innerWidth;\n    return (distence / width) * 40;\n  }\n\n  /**\n   *  处理 touch 事件\n   */\n  function handleTouch() {\n    let startPos,\n      lastPos,\n      rotateX = 0;\n\n    let speed = 0,\n      drift = 0,\n      isDrift = false;\n\n    let timer;\n\n    function onTouchStart(e) {\n      e.preventDefault();\n      clearTimeout(timer);\n      player.stop();\n      const { pageX, pageY } = e.touches[0];\n      startPos = [pageX, pageY];\n      lastPos = [pageX, pageY];\n    }\n\n    function onTouchMove(e) {\n      e.preventDefault();\n      if (!startPos) return;\n      const { pageX, pageY } = e.touches[0];\n      const [lastX, lastY] = lastPos;\n      const [startX, startY] = startPos;\n      if (lastX === pageX && lastY === pageY) return;\n\n      // 横滚\n      const rotateY = -distence2Reg(pageX - lastX);\n      // 俯仰\n      const coefficient = (30 - Math.abs(rotateX)) / 30;\n      rotateX += distence2Reg(pageY - lastY) * coefficient;\n      // 位移\n      speed = Math.abs(pageX - lastX);\n      speed = speed < 3 ? 0 : speed;\n      drift = speed * 10;\n\n      // 负责滚动动画\n      requestAnimationFrame(() => {\n        (0,_utils_setTransform__WEBPACK_IMPORTED_MODULE_0__.default)(box, {\n          rotateY: `+${rotateY}deg`,\n          rotateX: `${rotateX}deg`,\n        });\n      });\n\n      //  负责位移动画\n      if (!isDrift) {\n        requestAnimationFrame(driftAnim);\n      }\n\n      lastPos = [pageX, pageY];\n    }\n\n    let curDrift = 0;\n\n    // 执行位移动画\n    function driftAnim() {\n      if (curDrift === drift) {\n        isDrift = false;\n        return;\n      }\n      isDrift = true;\n\n      const coefficient = 1 - Math.pow(speed < 2 ? 2 : speed, -0.5);\n      const step = Math.ceil(Math.abs(drift - curDrift) * 0.2 * coefficient);\n      curDrift = curDrift < drift ? curDrift + step : curDrift - step;\n\n      (0,_utils_setTransform__WEBPACK_IMPORTED_MODULE_0__.default)(container, {\n        translate3d: {\n          z: `${CAMERA_DISTENCE - curDrift}px`,\n        },\n      });\n\n      requestAnimationFrame(driftAnim);\n    }\n\n    function onTouchEnd(e) {\n      e.preventDefault();\n      timer = setTimeout(() => {\n        player.play();\n      }, 500);\n\n      startPos = undefined;\n      drift = 0;\n      speed = 0;\n    }\n\n    document.body.addEventListener(\"touchstart\", onTouchStart, {\n      passive: false,\n    });\n    document.body.addEventListener(\"touchmove\", onTouchMove, {\n      passive: false,\n    });\n    document.body.addEventListener(\"touchend\", onTouchEnd, {\n      passive: false,\n    });\n  }\n  handleTouch();\n\n  function render() {\n    camera.append(container);\n    container.append(box);\n    box.append(loop);\n\n    rootEle.append(camera);\n  }\n\n  render();\n})();\n\n\n//# sourceURL=webpack://zwj-demo/./src/index.js?");

/***/ }),

/***/ "./src/utils/getImageScale.js":
/*!************************************!*\
  !*** ./src/utils/getImageScale.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getImageScale\": () => (/* binding */ getImageScale)\n/* harmony export */ });\n/**\n * 获取图片比例\n * @param {string} url\n * @returns\n */\nfunction getImageScale(url) {\n  return new Promise((resolve, reject) => {\n    const img = new Image();\n    img.src = url;\n    img.onload = () => {\n      console.log(img.width, img.height);\n      resolve(img.width / img.height);\n    };\n  });\n}\n\n\n//# sourceURL=webpack://zwj-demo/./src/utils/getImageScale.js?");

/***/ }),

/***/ "./src/utils/getTransform.js":
/*!***********************************!*\
  !*** ./src/utils/getTransform.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getPosition\": () => (/* binding */ getPosition),\n/* harmony export */   \"getRotate\": () => (/* binding */ getRotate)\n/* harmony export */ });\nconst deg = Math.PI / 180;\n\n/**\n * 获取位置\n * @param {number} d 距离原点的距离\n * @param {number} n 有几个\n * @param {number} i 第几个\n */\nfunction getPosition(d, n, i) {\n  const sigma = (360 / n) * i * deg;\n  const x = Number((d * Math.cos(sigma)).toFixed(6));\n  const y = Number((d * Math.sin(sigma)).toFixed(6));\n  return [x, y];\n}\n\n/**\n *  获取旋转角\n * @param {*} n 有几个\n * @param {*} i 第几个\n */\nfunction getRotate(n, i) {\n  return 360 - (360 / n) * i - 90;\n}\n\n\n//# sourceURL=webpack://zwj-demo/./src/utils/getTransform.js?");

/***/ }),

/***/ "./src/utils/parseTransform.js":
/*!*************************************!*\
  !*** ./src/utils/parseTransform.js ***!
  \*************************************/
/***/ ((module) => {

eval("const keyMap = [\n  \"translate3d\",\n  \"translate\",\n  \"translateX\",\n  \"translateY\",\n  \"translateZ\",\n  \"scale3d\",\n  \"scale\",\n  \"scaleX\",\n  \"scaleY\",\n  \"scaleZ\",\n  \"rotate\",\n  \"rotate3d\",\n  \"rotateX\",\n  \"rotateY\",\n  \"rotateZ\",\n];\n\nconst valueMap = [\"x\", \"y\", \"z\"];\n\n/**\n * 解析Transform\n * @param {string} str\n * @returns {{x,y,z,rx,ry,rz}[]}\n */\nfunction parseTransform(str) {\n  const transformArr = [];\n\n  while (str.indexOf(\")\") !== -1) {\n    keyMap.forEach((key) => {\n      const startWithKey = new RegExp(`^[ ]*${key}[ ]*\\\\\\(`).test(str);\n      if (startWithKey) {\n        const left = str.indexOf(\"(\");\n        const right = str.indexOf(\")\");\n        const values = str.slice(left + 1, right);\n\n        const newEntry = {\n          key,\n          values: values.split(\",\").reduce((r, v, i, arr) => {\n            if (arr.length === 1) return v;\n            r[valueMap[i]] = v.trim();\n            return r;\n          }, {}),\n        };\n\n        transformArr.push(newEntry);\n        str = str.slice(right + 1);\n      }\n    });\n  }\n  return transformArr;\n}\n\nmodule.exports = parseTransform;\n\n\n//# sourceURL=webpack://zwj-demo/./src/utils/parseTransform.js?");

/***/ }),

/***/ "./src/utils/setTransform.js":
/*!***********************************!*\
  !*** ./src/utils/setTransform.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ setTransform)\n/* harmony export */ });\n/* harmony import */ var _parseTransform__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./parseTransform */ \"./src/utils/parseTransform.js\");\n/* harmony import */ var _parseTransform__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_parseTransform__WEBPACK_IMPORTED_MODULE_0__);\n\n\nconst defaultTransform = [\n  {\n    key: \"translate3d\",\n    values: {\n      x: \"0\",\n      y: \"0\",\n      z: \"0\",\n    },\n  },\n  { key: \"rotateX\", values: \"0deg\" },\n  { key: \"rotateY\", values: \"0deg\" },\n  { key: \"rotateZ\", values: \"0deg\" },\n  {\n    key: \"scale3d\",\n    values: {\n      x: \"1\",\n      y: \"1\",\n      z: \"1\",\n    },\n  },\n];\n\n/**\n * 统一值类型\n * @param {*} values\n * @returns\n */\nfunction unifyValue(values) {\n  if (!values) return {};\n  return typeof values === \"string\" ? { x: values } : Object.assign({}, values);\n}\n\n/**\n * 是否为计算属性\n * @param {*} value\n * @returns\n */\nfunction isCalculation(value) {\n  return /^[+]/.test(value);\n}\n\n/**\n * 获取值和单位\n * @param {*} value\n * @returns\n */\nfunction getValueAndMeasure(value) {\n  return [\n    Number(value.match(/[-]?\\d+\\.?\\d*/)) || 0,\n    value.replace(/^[+|-]*\\d+\\.?\\d*/, \"\"),\n  ];\n}\n\n/**\n * 值合并\n */\nfunction margeValues(...args) {\n  return args.reduce((res, values) => {\n    values = unifyValue(values);\n    Object.entries(values).forEach(([coord, value]) => {\n      if (isCalculation(value)) {\n        const [preV] = getValueAndMeasure(res[coord]);\n        const [newV, measure] = getValueAndMeasure(value);\n        res[coord] = `${preV + newV}${measure}`;\n      } else {\n        res[coord] = value;\n      }\n    });\n    return res;\n  }, {});\n}\n\n/**\n * 创建transFrom\n * @param {Element} ele\n * @param {{}} options\n * @returns {str}\n */\nfunction setTransform(ele, options) {\n  if (!ele || !options) return;\n  let sourceTransformStr = ele.style.transform;\n\n  const baseTransform = \"translate3d(-50%, -50%, 0px)\";\n  sourceTransformStr = sourceTransformStr.replace(baseTransform, \"\");\n  const source = _parseTransform__WEBPACK_IMPORTED_MODULE_0___default()(sourceTransformStr);\n  let result = [baseTransform];\n\n  // 1.处理默认的属性\n  defaultTransform.forEach((defaultTran, i) => {\n    const key = defaultTran.key;\n    let values = defaultTran.values;\n    let sourceValues, optionsValues;\n    const sourceIndex = source.findIndex((tran) => tran.key === key);\n    // source 中的值\n    if (sourceIndex !== -1) {\n      const sourceTran = source[sourceIndex];\n      // 移除\b找到的index\n      source.splice(sourceIndex, 1);\n      sourceValues = sourceTran.values;\n    }\n\n    // options 中的值\n    if (key in options) {\n      optionsValues = options[key];\n      delete options[key];\n    }\n\n    values = margeValues(values, sourceValues, optionsValues);\n\n    result.push(`${key}(${Object.values(values).join(\", \")})`);\n  });\n\n  // 3.检查 source 中未使用的属性\n  if (source.length) {\n  }\n\n  const resultStr = result.join(\" \");\n  ele.style.transform = resultStr;\n}\n\n\n//# sourceURL=webpack://zwj-demo/./src/utils/setTransform.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;