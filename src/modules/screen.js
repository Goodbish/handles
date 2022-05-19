function firstScreen() {
    let screenCounter = localStorage.getItem('screenCounter');
    if (screenCounter === null) {
        localStorage.setItem('screenCounter', '1');
    } else {
        if (screenCounter > 2) {
            return
        }
        let newCounter = Number(screenCounter) + 1;
        localStorage.setItem('screenCounter', `${newCounter}`)
        toggleFirstScreen();
    }
}

function toggleFirstScreen() {
    document.querySelector('.preview').classList.toggle('preview--active');
    document.querySelector('.handle__background').classList.toggle('handle__background--blur');
    document.querySelector('.handle__container').classList.toggle('handle__container--lock');
    document.querySelectorAll('.handle__left, .handle__right, .handle__middle, .handle__next').forEach(element => {
        element.classList.toggle('handle--events-lock')
    })
}

const firstScreenButton = document.querySelector('.preview__button')

firstScreenButton.addEventListener('click', toggleFirstScreen);

firstScreen();