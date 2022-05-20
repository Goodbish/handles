const mainImage = document.querySelector('.handle__background-image--main img');
const facadeImage = document.querySelector('.handle__background-image--2 img');
const handlesImage = document.querySelector('.handle__background-image--3 img');
let newMainImage = '';
let newFacadeImage = '';
let newHandlesImage = '';
let globalSlideIndex = 1;

function toggleLoader() {
    document.querySelector('.loader.preview').classList.toggle('preview--active');
    document.querySelector('.handle__background').classList.toggle('handle__background--blur');
    document.querySelector('.handle__container').classList.toggle('handle__container--lock');
}
function firstScreen() {
    const previewLoader = document.querySelector('#preview .preview__loading-block');
    const previewButton = document.querySelector('#preview .preview__button');

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

    const localStyleImage = localStorage.getItem('style');
    const localFacadeImage = localStorage.getItem('facade');
    const localHandleImage = localStorage.getItem('handle');
    
    function setNewImage() {
        return new Promise((resolve) => {
            let check = [false, false, false];

            if (localStyleImage !== null) {
                mainImage.setAttribute('src', localStyleImage);
                mainImage.onload = function() {
                    check[0] = true;
                    checkArray()
                }
            } else {
                check[0] = true;
                checkArray();
            }

            if (localFacadeImage !== null) {
                facadeImage.setAttribute('src', localFacadeImage);
                facadeImage.onload = function() {
                    check[1] = true;
                    checkArray();
                }
            } else {
                check[1] = true;
                checkArray()
            }

            if (localHandleImage !== null) {
                handlesImage.setAttribute('src', localHandleImage);
                handlesImage.onload = function() {
                    check[2] = true;
                    checkArray();
                }
            } else {
                check[2] = true;
                checkArray();
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
            toggleLoader();
        }
        await setNewImage();
        if (screenCounter <= 2) {
            previewButton.classList.add('preview__button--show');
            previewLoader.classList.remove('preview__loading-block--show');
        } else {
            toggleLoader();
        }
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
document.addEventListener("DOMContentLoaded", function(event) { 
    const elementsToHide = [
    document.querySelectorAll('.handle__left .handle__left-item:not(.handle-zoom), .handle__filter-block, .handle__middle, .handle__right')
]
const hideIconElement = document.querySelector('.handle__icon--alt');

function toggleHideElements() {
    elementsToHide[0].forEach(element => {
        element.classList.toggle('handle--hide');
    })
    document.querySelector('.handle-zoom .handle__icon').classList.toggle('handle__icon--active');
    hideIconElement.classList.toggle('handle__icon--active');
}

document.querySelector('.handle-zoom').addEventListener('click', toggleHideElements);
    const nextButton = document.querySelector('.handle__next');


nextButton.addEventListener('click', function() {
    let activeElements = document.querySelectorAll('[data-active="true"]');
    globalSlideIndex++;
    if (globalSlideIndex > 3) {
        globalSlideIndex = 1;
    }
    // set local angle index
    localStorage.setItem('angle', globalSlideIndex);
    

    // get all active images to change

    activeElements.forEach(element => {
        let dataType = element.getAttribute('data-type');

        switch (dataType) {
            case 'style' :
                newMainImage = chooseAngle(element, newMainImage);
                break;
            case 'facade' : 
                newFacadeImage = chooseAngle(element, newFacadeImage);
                break;
            case 'handles' :
                newHandlesImage = chooseAngle(element, newHandlesImage);
                break;
            default: 
                console.log('no type of element');
                break;
        }
    })

    function chooseAngle(element, newLink) {
        switch (globalSlideIndex) {
            case 1 :
                newLink = element.getAttribute('data-image');
                break;
            case 2 :
                newLink = element.getAttribute('data-image-secondary');
                break;
            case 3 :
                newLink = element.getAttribute('data-image-third');
                break;
        }

        return newLink;
    }

    // at this point we have all links

    function setNewImage() {
        return new Promise((resolve) => {
            mainImage.setAttribute('src', newMainImage);
            facadeImage.setAttribute('src', newFacadeImage);
            handlesImage.setAttribute('src', newHandlesImage);
    
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
        setLocalSet();
        toggleLoader();
    }
    
    waitNewImage();

    function setLocalSet() {
        localStorage.setItem('style', newMainImage);
        localStorage.setItem('facade', newFacadeImage);
        localStorage.setItem('handle', newHandlesImage);
    }
})
    const styleBlocks = document.querySelectorAll('.handle-style');
const contentStyleBlocks = document.querySelectorAll('.handle__style');

const closeStyleBlock = document.querySelector('.handle__style-close');
styleBlocks.forEach(element => {
    function toggleBlock() {
        element.classList.toggle('handle__icon--clicked');
        element.querySelector('.handle__style').classList.toggle('handle__style--active');
    }

    element.addEventListener('click', toggleBlock);
    element.querySelector('.handle__style-close').addEventListener('click', toggleBlock);

    const changeStyleButtons = element.querySelectorAll('.handle__style-option');

    changeStyleButtons.forEach(element => {
        element.addEventListener('click', function() {
            resetStyleButtons();
            element.classList.add('handle__style-option--active');
            // here function to set bg
            localStorage.getItem('angle');
            newSrc = '';
            switch (globalSlideIndex) {
                case 1 :
                    newSrc = element.getAttribute('data-image');
                    break;
                case 2 :
                    newSrc = element.getAttribute('data-image-secondary');
                    break;
                case 3 :
                    newSrc = element.getAttribute('data-image-third');
                    break;
            }
            
            let styleType = element.getAttribute('data-type');
            let elementToChange;
            switch (styleType) {
                case 'style' :
                    elementToChange = mainImage;
                    localStorage.setItem('style', newSrc);
                    break;
                case 'facade' : 
                    elementToChange = facadeImage;
                    localStorage.setItem('facade', newSrc);
                    break;
                case 'handles' :
                    elementToChange = handlesImage;
                    localStorage.setItem('handles', newSrc);
                    break;
                default: 
                    console.log('no type of element');
                    break;
            }

            function setNewImage() {
                return new Promise((resolve) => {
                    elementToChange.setAttribute('src', newSrc);
                    elementToChange.onload = function() {
                        resolve();
                    }
                })
            }
            
            async function waitNewImage() {
                toggleLoader();
                await setNewImage();
                toggleLoader();
            }
            
            waitNewImage();
        })
    })

    function resetStyleButtons() {
        changeStyleButtons.forEach(element => {
            element.classList.remove('handle__style-option--active');
        })
    }
});

contentStyleBlocks.forEach(element => {
    element.addEventListener('click', (e) => {
        e.stopPropagation();
    })
})
// closeStyleBlock.addEventListener('click', toggleStyleBlock);




    
});
