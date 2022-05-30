function firstScreen() {
    const previewLoader = document.querySelector('#preview .preview__loading-block');
    const previewButton = document.querySelector('#preview .preview__button');

    // check if we need show first screen

    let screenCounter = localStorage.getItem('screenCounter');
    if (screenCounter === null) {
        localStorage.setItem('screenCounter', '1');
        screenCounter = 0;
    }

    if (screenCounter <= 2) {
        let newCounter = Number(screenCounter) + 1;
        localStorage.setItem('screenCounter', `${newCounter}`);
        toggleFirstScreen();
    }

    // get localstorage info

    const localStyleImage = localStorage.getItem('style');
    const localFacadeImage = localStorage.getItem('facade');
    const localHandleImage = localStorage.getItem('handle');

    // set localstorage angle if we have it

    const localSlideIndex = localStorage.getItem('angle');
    if (localSlideIndex != null) {
        globalSlideIndex = Number(localSlideIndex);
    }

    checkGlobalIndex();
    
    function setNewImage() {
        return new Promise((resolve) => {
            let check = [false, false, false];

            mainImage.onload = function() {
                check[0] = true;
                checkArray()
            }

            if (localStyleImage !== null) {
                mainImage.setAttribute('src', localStyleImage);
            } else {
                let initiaMainImage = mainImage.getAttribute('src');
                mainImage.setAttribute('src', initiaMainImage);
            }

            facadeImage.onload = function() {
                check[1] = true;
                checkArray();
            }

            if (localFacadeImage !== null) {
                facadeImage.setAttribute('src', localFacadeImage);
            } else {
                let initiaFacadeImage = mainImage.getAttribute('src');
                facadeImage.setAttribute('src', initiaFacadeImage);
            }
            

            if (handlesImage.copmlete) {
                check[2] = true;
                checkArray();
            } else {
                handlesImage.onload = function() {
                    check[2] = true;
                    checkArray();
                }
            }

            if (localHandleImage !== null) {
                handlesImage.setAttribute('src', localHandleImage);
            } else {
                let initiaHandlesImage = mainImage.getAttribute('src');
                handlesImage.setAttribute('src', initiaHandlesImage);
            }

            function checkArray() {
                if (JSON.stringify(check) === JSON.stringify([true, true, true])) {
                    resolve();
                }
            }
        })
    }

    async function waitNewImage() {
        if (screenCounter <= 2) {
            previewLoader.classList.add('preview__loading-block--show');
        } else {
            toggleImages();
            toggleLoader();
        }
        await setNewImage();
        if (screenCounter <= 2) {
            previewButton.classList.add('preview__button--show');
            previewLoader.classList.remove('preview__loading-block--show');
        } else {
            toggleLoader();
            toggleImages();
        }
        setLocalInfo();
    }
    
    waitNewImage();
}

function toggleFirstScreen() {
    document.querySelector('#preview').classList.toggle('preview--active');
    document.querySelector('.handle__background').classList.toggle('handle__background--blur');
    // document.querySelector('.handle__container').classList.toggle('handle__container--lock');
    document.querySelectorAll('.handle__left, .handle__right, .handle__middle, .handle__change').forEach(element => {
        element.classList.toggle('handle--events-lock')
    })
}

const firstScreenButton = document.querySelector('.preview__button')

firstScreenButton.addEventListener('click', toggleFirstScreen);

firstScreen();