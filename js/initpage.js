const startGameBtnDom = document.querySelector(".startgame");
const initPageDom = document.querySelector("#initpage");
let interval;
startGameBtnDom.addEventListener("click", function () {
  initPageDom.style.display = "none";
  interval = setInterval(() => {
    run();
  }, 100);
});
