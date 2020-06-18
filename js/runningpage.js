const direction = {
  up: { x: -1, y: 0 },
  down: { x: 1, y: 0 },
  right: { x: 0, y: 1 },
  left: { x: 0, y: -1 },
};
const scoreDOM = document.querySelector(".score>span");
const pauseDOM = document.querySelector(".pause");
const runningpage = document.querySelector("#runningpage");
const endScoreDOM = document.querySelector(".endScore");
const endIsWinDOM = document.querySelector(".endIsWin");
const reStartDOM = document.querySelector(".reStart");
const endpageDOM = document.querySelector("#endpage");
const cells = document.querySelectorAll(".cell");
let snakeDirection = null;
let snakeBody = [];
let food = {};
let win = false;
let score = 0;

function isWin(score) {
  if (score === 897) {
    win = true;
    clearInterval(interval);
    endPageRender();
    setTimeout(() => {
      runningpage.style.display = "none";
    }, 1000);
  } else {
    win = false;
  }
}

function endPageRender() {
  endScoreDOM.innerHTML = "最终得分:" + score;
  endIsWinDOM.innerHTML = win ? "胜利" : "失败";
}

function randomXY() {
  let x = parseInt(Math.random() * 30 + 1);
  let y = parseInt(Math.random() * 30 + 1);
  return { x, y };
}

function dealPlace({ x, y }) {
  [x, y] = [x, y].map((y) => {
    if (y < 1) {
      y += 30;
    } else if (y > 30) {
      y -= 30;
    }
    return (y = y > 9 ? y : "0" + y);
  });
  return { x, y };
}

function createFood() {
  function getXY() {
    let flag = null;
    let temp = dealPlace(randomXY());
    snakeBody.forEach((ele) => {
      if (ele.x === temp.x && ele.y === temp.y) {
        flag = 1;
      }
    });
    return flag === 1 ? getXY() : temp;
  }
  food = getXY();
  const foodDOM = document.querySelector(`#x${food.x}y${food.y}`);
  foodDOM.classList.add("food");
}

function initSnakeBody() {
  cells.forEach((item) => {
    item.classList.remove("food");
    item.classList.remove("snake");
  });
  snakeBody = [];
  score = 0;
  scoreDOM.innerHTML = score;
  //初始得到蛇头  随机得到3个格子作为蛇身
  let { x, y } = randomXY();
  for (let i = 0; i < 29; i++) {
    y--;
    let o = dealPlace({ x, y });
    snakeBody.push(o);
    const cellDOM = document.querySelector(`#x${o.x}y${o.y}`);
    cellDOM.classList.add("snake");
  }
}
function run() {
  // 找到蛇头
  let snakeHeader = snakeBody[0];
  // 新蛇头坐标
  let newXY = {
    x: +snakeHeader.x + snakeDirection.x,
    y: +snakeHeader.y + snakeDirection.y,
  };
  let newHeader = dealPlace(newXY);
  snakeBody.unshift(newHeader);
  let snakeTail = snakeBody.pop();
  const headerDOM = document.querySelector(`#x${newHeader.x}y${newHeader.y}`);
  const tailDOM = document.querySelector(`#x${snakeTail.x}y${snakeTail.y}`);
  tailDOM.classList.remove("snake");
  if (headerDOM.classList.value === "cell food") {
    headerDOM.classList.remove("food");
    snakeBody.push(snakeTail);
    tailDOM.classList.add("snake");
    createFood();
    score++;
    scoreDOM.innerHTML = score;
    isWin(score);
  }
  if (headerDOM.classList.value === "cell snake") {
    clearInterval(interval);
    endPageRender();
    setTimeout(() => {
      runningpage.style.display = "none";
      endpageDOM.style.display = "block";
    }, 1000);
  }
  headerDOM.classList.add("snake");
}

function init() {
  snakeDirection = direction.right;
}

// 动作主体
init();
initSnakeBody();
createFood();

//================================================================== 监听键盘按键
document.body.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowDown":
      snakeDirection =
        snakeDirection === direction.up ? direction.up : direction.down;
      break;
    case "ArrowUp":
      snakeDirection =
        snakeDirection === direction.down ? direction.down : direction.up;
      break;
    case "ArrowLeft":
      snakeDirection =
        snakeDirection === direction.right ? direction.right : direction.left;
      break;
    case "ArrowRight":
      snakeDirection =
        snakeDirection === direction.left ? direction.left : direction.right;
      break;
    default:
      break;
  }
});

//监听点击
pauseDOM.addEventListener("click", () => {
  switch (pauseDOM.innerHTML) {
    case "暂停":
      pauseDOM.innerHTML = "继续";

      clearInterval(interval);

      break;
    case "继续":
      pauseDOM.innerHTML = "暂停";
      interval = setInterval(() => {
        run();
      }, 100);
      break;
    default:
      break;
  }
});

reStartDOM.addEventListener("click", () => {
  endpageDOM.style.display = "none";
  init();
  initSnakeBody();
  createFood();
  interval = setInterval(() => {
    run();
  }, 100);
  runningpage.style.display = "block";
});
