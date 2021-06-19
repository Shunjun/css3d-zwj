import setTransform from "./utils/setTransform";
import { getPosition, getRotate } from "./utils/getTransform";
import { getImageScale } from "./utils/getImageScale";

(async function () {
  const rootEle = document.getElementById("root");

  // const PUBLICPATH = "/css3d-zwj/";
  // const PUBLICPATH = "/";
  const SLICES_COUNT = 20;
  const SLICES_WIDTH = 100;
  const DGE = Math.PI / 180;
  // 旋转速度
  const SPAN_SPEED = -0.1;
  // 物体距离
  const CAMERA_DISTENCE = 600;

  const slicesWidthScale = await getImageScale(`/images/p0.png`);
  const screenWidth = window.innerWidth;
  const screenHeight = window.innerHeight;
  let distance;

  // 层
  let box;
  let container;
  let loop;
  let camera;
  // 播放器
  let player;
  let animationId = 0;
  let playing = false;

  /**
   * 计算距离
   * @returns
   */
  function calculateDistance() {
    const r = (360 / SLICES_COUNT) * DGE;
    return Math.floor(SLICES_WIDTH / Math.tan(r)) + 6;
  }
  distance = calculateDistance();

  // 构建贴片
  function createLoop() {
    const tempFragment = document.createDocumentFragment();
    new Array(SLICES_COUNT).fill(1).forEach((_, i) => {
      const div = document.createElement("div");
      div.className = "slices";
      div.style.top = 0;
      div.style.width = `${SLICES_WIDTH}px`;
      div.style.height = `${SLICES_WIDTH / slicesWidthScale}px`;

      div.style.backgroundImage = `url("/images/p${i}.png")`;
      const [x, z] = getPosition(distance, SLICES_COUNT, i);
      const r = getRotate(SLICES_COUNT, i);
      setTransform(div, {
        translate3d: {
          x: `${x}px`,
          z: `${z}px`,
        },
        rotateY: `${r}deg`,
      });

      tempFragment.append(div);
    });
    return tempFragment;
  }
  loop = createLoop();

  /**
   * 创建容纳贴片的盒子
   * 旋转做在盒子上面
   */
  function createBox() {
    box = document.createElement("div");
    box.className = "box";

    setTransform(box, {
      translate3d: {
        x: `${Number(screenWidth) / 2}px`,
        y: `${Number(screenHeight) / 2}px`,
      },
    });
  }
  createBox();

  /**
   * 给盒子添加滚动动画
   */
  function createAnimation() {
    function spin() {
      setTransform(box, {
        rotateY: `+${SPAN_SPEED}deg`,
      });
      animationId = requestAnimationFrame(spin);
    }

    function play() {
      if (playing) return;
      playing = true;
      animationId = requestAnimationFrame(spin);
    }

    function stop() {
      if (!playing) return;
      playing = false;
      webkitCancelAnimationFrame(animationId);
    }

    return {
      play,
      stop,
    };
  }
  player = createAnimation();
  player.play();

  /**
   * Container 用来控制距离
   */
  function creareContainer() {
    container = document.createElement("div");
    container.className = "container";

    setTransform(container, {
      translate3d: {
        z: `${CAMERA_DISTENCE}px`,
      },
    });
  }
  creareContainer();

  /**
   * 最外层的摄像机
   */
  function createCamera() {
    camera = document.createElement("div");
    camera.id = "camera";
    camera.style.width = `${screenWidth}px`;
    camera.style.height = `${screenHeight}px`;
    camera.className = "camrea";
  }
  createCamera();

  function distence2Reg(distence) {
    const width = window.innerWidth;
    return (distence / width) * 40;
  }

  /**
   *  处理 touch 事件
   */
  function handleTouch() {
    let startPos,
      lastPos,
      rotateX = 0;

    let speed = 0,
      drift = 0,
      isDrift = false;

    let timer;

    function onTouchStart(e) {
      e.preventDefault();
      clearTimeout(timer);
      player.stop();
      const { pageX, pageY } = e.touches[0];
      startPos = [pageX, pageY];
      lastPos = [pageX, pageY];
    }

    function onTouchMove(e) {
      e.preventDefault();
      if (!startPos) return;
      const { pageX, pageY } = e.touches[0];
      const [lastX, lastY] = lastPos;
      const [startX, startY] = startPos;
      if (lastX === pageX && lastY === pageY) return;

      // 横滚
      const rotateY = -distence2Reg(pageX - lastX);
      // 俯仰
      const coefficient = (30 - Math.abs(rotateX)) / 30;
      rotateX += distence2Reg(pageY - lastY) * coefficient;
      // 位移
      speed = Math.abs(pageX - lastX);
      speed = speed < 3 ? 0 : speed;
      drift = speed * 10;

      // 负责滚动动画
      requestAnimationFrame(() => {
        setTransform(box, {
          rotateY: `+${rotateY}deg`,
          rotateX: `${rotateX}deg`,
        });
      });

      //  负责位移动画
      if (!isDrift) {
        requestAnimationFrame(driftAnim);
      }

      lastPos = [pageX, pageY];
    }

    let curDrift = 0;

    // 执行位移动画
    function driftAnim() {
      if (curDrift === drift) {
        isDrift = false;
        return;
      }
      isDrift = true;

      const coefficient = 1 - Math.pow(speed < 2 ? 2 : speed, -0.5);
      const step = Math.ceil(Math.abs(drift - curDrift) * 0.2 * coefficient);
      curDrift = curDrift < drift ? curDrift + step : curDrift - step;

      setTransform(container, {
        translate3d: {
          z: `${CAMERA_DISTENCE - curDrift}px`,
        },
      });

      requestAnimationFrame(driftAnim);
    }

    function onTouchEnd(e) {
      e.preventDefault();
      timer = setTimeout(() => {
        player.play();
      }, 500);

      startPos = undefined;
      drift = 0;
      speed = 0;
    }

    document.body.addEventListener("touchstart", onTouchStart, {
      passive: false,
    });
    document.body.addEventListener("touchmove", onTouchMove, {
      passive: false,
    });
    document.body.addEventListener("touchend", onTouchEnd, {
      passive: false,
    });
  }
  handleTouch();

  function render() {
    camera.append(container);
    container.append(box);
    box.append(loop);

    rootEle.append(camera);
  }

  render();
})();
