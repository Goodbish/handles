function firstScreen() {
    const previewLoader = document.querySelector('#preview .preview__loading-block');
    const previewButton = document.querySelector('#preview .preview__button');

    let screenCounter = localStorage.getItem('screenCounter');
    if (screenCounter === null) {
        localStorage.setItem('screenCounter', '1');
        screenCounter = 1;
    }

    if (screenCounter <= 2) {
        let newCounter = Number(screenCounter) + 1;
        localStorage.setItem('screenCounter', `${newCounter}`);
        toggleFirstScreen();
    }

    const localStyleImage = localStorage.getItem('style');
    const localFacadeImage = localStorage.getItem('facade');
    const localHandleImage = localStorage.getItem('handle');
    
    function setNewImage() {
        return new Promise((resolve) => {
            if (localStyleImage !== null &&
                localFacadeImage !== null &&
                localHandleImage !== null) {
                    mainImage.setAttribute('src', localStyleImage);
                    facadeImage.setAttribute('src', localFacadeImage);
                    handlesImage.setAttribute('src', localHandleImage);
            }

    
            let check = [false, false, false];
            mainImage.onload = function() {
                check[0] = true;
                if (JSON.stringify(check) === JSON.stringify([true, true, true])) {
                    resolve();
                }
            }
    
            facadeImage.onload = function() {
                check[1] = true;
                if (JSON.stringify(check) === JSON.stringify([true, true, true])) {
                    resolve();
                }
            }
    
            handlesImage.onload = function() {
                check[2] = true;
                if (JSON.stringify(check) === JSON.stringify([true, true, true])) {
                    resolve();
                }
            }
        })
    }

    async function waitNewImage() {
        if (screenCounter <= 2) {
            previewLoader.classList.add('preview__loading-block--show');
        }
        // toggleLoader();
        await setNewImage();
        // setLocalSet();
        if (screenCounter <= 2) {
            previewButton.classList.add('.preview__button--show');
            previewLoader.classList.remove('preview__loading-block--show');
        }
        // toggleLoader();
    }
    
    waitNewImage();
}

function toggleFirstScreen() {
    document.querySelector('#preview').classList.toggle('preview--active');
    document.querySelector('.handle__background').classList.toggle('handle__background--blur');
    document.querySelector('.handle__container').classList.toggle('handle__container--lock');
    document.querySelectorAll('.handle__left, .handle__right, .handle__middle, .handle__next').forEach(element => {
        element.classList.toggle('handle--events-lock')
    })
}

const firstScreenButton = document.querySelector('.preview__button')

firstScreenButton.addEventListener('click', toggleFirstScreen);

firstScreen();