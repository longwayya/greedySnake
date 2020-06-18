(function () {
  const HTMLDOM = document.querySelector("html");
  const bodyDOM = document.querySelector("body");
  function getSize() {
    const clientWidth = bodyDOM.clientWidth;
    if (clientWidth >= 480) {
      return;
    }
    const remSize = clientWidth / 30;
    HTMLDOM.style.fontSize = parseInt(remSize) + "px";
  }
  getSize();
  window.onresize = getSize;
})();
