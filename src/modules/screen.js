function firstScreen() {
    let screenCounter = localStorage.getItem('screenCounter');
    if (screenCounter === null) {
        localStorage.setItem('screenCounter', '1');
    } else {
        if (screenCounter <= 2) {
            let newCounter = Number(screenCounter) + 1;
            localStorage.setItem('screenCounter', `${newCounter}`)
            toggleFirstScreen();
        }
    }

    const localStyleImage = localStorage.getItem('style');
    const localFacadeImage = localStorage.getItem('facade');
    const localHandleImage = localStorage.getItem('handle');
    
    if (localStyleImage !== null &&
        localFacadeImage !== null &&
        localHandleImage !== null) {
        
    }

    function setNewImage() {
        return new Promise((resolve) => {
            mainImage.setAttribute('src', localStyleImage);
            facadeImage.setAttribute('src', localFacadeImage);
            handlesImage.setAttribute('src', localHandleImage);
    
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
        toggleLoader();
        await setNewImage();
        // setLocalSet();
        toggleLoader();
    }
    
    waitNewImage();
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