const fullScreenButtons = document.querySelectorAll(".full-screen");

fullScreenButtons.forEach((button) => {
  button.addEventListener("click", () => {
    toggleFullScreen();
    toggleFullScreenIcons();
  });
});

function toggleFullScreen() {
  if (
    !document.fullscreenElement && // alternative standard method
    !document.mozFullScreenElement &&
    !document.webkitFullscreenElement
  ) {
    // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(
        Element.ALLOW_KEYBOARD_INPUT
      );
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
  }
  toggleFullScreenButton();
}

function toggleFullScreenButton() {
    fullScreenButtons.forEach(element => {
        element.classList.toggle('full-screen--active');
    })
}


const fullScreenIcons = document.querySelectorAll('.handle__left-item.full-screen .handle__icon, .handle__right-item.full-screen .handle__right-icon');

function toggleFullScreenIcons() {
    fullScreenIcons.forEach(element => {
        element.classList.toggle('handle__icon--active')
    })
}