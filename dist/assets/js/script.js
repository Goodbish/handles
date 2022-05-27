
document.addEventListener("DOMContentLoaded", function(event) { 
    const containerBlock = document.querySelector('.handle__container');

const mainImage = document.querySelector('.handle__background-image--main img');
const facadeImage = document.querySelector('.handle__background-image--2 img');
const handlesImage = document.querySelector('.handle__background-image--3 img');
const loaderType = document.querySelector('.preview__load-type');
const loaderItem = document.querySelector('.preview__load-text');
let newMainImage = '';
let newFacadeImage = '';
let newHandlesImage = '';
let globalSlideIndex = 1;

function toggleLoader() {
    document.querySelector('.loader.preview').classList.toggle('preview--active');
    document.querySelector('.handle__background').classList.toggle('handle__background--blur');
    containerBlock.classList.toggle('handle__container--lock');
}

function toggleImages() {
    document.querySelector('.handle__background-image--2').classList.toggle('handle__background-image--hide');
    document.querySelector('.handle__background-image--3').classList.toggle('handle__background-image--hide');
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

    const localStyleText = localStorage.getItem('styleText');
    const localFacadeText = localStorage.getItem('facadeText');
    const localHandleText = localStorage.getItem('handlesText');
    
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
    const elementsToHide = [
    document.querySelectorAll('.handle__left .handle__left-item:not(.handle-hide), .handle__filter-block, .handle__middle, .handle__right')
]
const hideIconElement = document.querySelector('.handle__icon--alt');

function toggleHideElements(hideElements) {
    hideElements[0].forEach(element => {
        element.classList.toggle('handle--hide');
    })
    document.querySelector('.handle-hide .handle__icon').classList.toggle('handle__icon--active');
    hideIconElement.classList.toggle('handle__icon--active');
}

document.querySelector('.handle-hide').addEventListener('click', function() {
    toggleHideElements(elementsToHide);
});
    const changeAngleButtons = document.querySelectorAll('.handle__change');

changeAngleButtons.forEach(button => {
    button.addEventListener('click', function() {
        let activeElements = document.querySelectorAll('[data-active="true"]');
        button.classList.contains('handle__next') ? globalSlideIndex++ : globalSlideIndex--;
        console.log(globalSlideIndex);
        if (globalSlideIndex === 3) {
            document.querySelector('.handle__next').classList.add('handle__change--hide')
        }  else {
            document.querySelector('.handle__next').classList.remove('handle__change--hide')
        }

        if (globalSlideIndex === 1) {
            document.querySelector('.handle__prev').classList.add('handle__change--hide')
        } else {
            document.querySelector('.handle__prev').classList.remove('handle__change--hide')
        }

        // set local angle index
        localStorage.setItem('angle', globalSlideIndex);
        
    
        // get all active images to change
    
        activeElements.forEach(element => {
            let dataType = element.getAttribute('data-type');
            let newText = element.querySelector('span').innerHTML;
    
            switch (dataType) {
                case 'style' :
                    newMainImage = chooseAngle(element, newMainImage);
                    localStorage.setItem('styleText', newText);
                    break;
                case 'facade' : 
                    newFacadeImage = chooseAngle(element, newFacadeImage);
                    localStorage.setItem('facadeText', newText);
                    break;
                case 'handles' :
                    newHandlesImage = chooseAngle(element, newHandlesImage);
                    localStorage.setItem('handlesText', newText);
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
            toggleImages();
            toggleLoader();
            await setNewImage();
            setLocalSet();
            toggleLoader();
            toggleImages();
        }
        
        waitNewImage();
    
        function setLocalSet() {
            localStorage.setItem('style', newMainImage);
            localStorage.setItem('facade', newFacadeImage);
            localStorage.setItem('handle', newHandlesImage);
        }
    })
})
    const styleBlocks = document.querySelectorAll('.handle-style');
const contentStyleBlocks = document.querySelectorAll('.handle__style');

const closeStyleBlock = document.querySelector('.handle__style-close');
styleBlocks.forEach(element => {
    function toggleBlock() {
        resetStyleBlocks(element);

        console.log(element);
        if (!element.classList.contains('handle__icon--hover')) {
            element.querySelector('.handle__icon--hover').classList.toggle('handle__icon--clicked');
        } else {
            element.classList.toggle('handle__icon--clicked');
        }
        element.querySelector('.handle__style').classList.toggle('handle__style--active');
    }

    element.addEventListener('click', toggleBlock);
    element.querySelector('.handle__style-close').addEventListener('click', resetStyleBlocks);

    const changeStyleButtons = element.querySelectorAll('.handle__option');

    changeStyleButtons.forEach(element => {
        element.addEventListener('click', function() {
            resetStyleButtons();
            element.classList.add('handle__option--active');
            element.setAttribute('data-active', 'true');
            // here function to set bg
            let angle = localStorage.getItem('angle');
            newSrc = '';
            
            switch (angle) {
                case '1' :
                    newSrc = element.getAttribute('data-image');
                    break;
                case '2' :
                    newSrc = element.getAttribute('data-image-secondary');
                    break;
                case '3' :
                    newSrc = element.getAttribute('data-image-third');
                    break;
                default: 
                    newSrc = element.getAttribute('data-image');
            }
            
            let newText = element.querySelector('span').innerHTML;
            console.log(newText);
            
            let styleType = element.getAttribute('data-type');
            let elementToChange;
            switch (styleType) {
                case 'style' :
                    elementToChange = mainImage;
                    localStorage.setItem('style', newSrc);
                    localStorage.setItem('styleText', newText);
                    loaderType.innerHTML = `интерьер в стиле`;
                    break;
                case 'facade' : 
                    elementToChange = facadeImage;
                    localStorage.setItem('facade', newSrc);
                    localStorage.setItem('facadeText', newText);
                    loaderType.innerHTML = `фасад в цвете`;
                    break;
                case 'handles' :
                    elementToChange = handlesImage;
                    localStorage.setItem('handles', newSrc);
                    localStorage.setItem('handlesText', newText);
                    loaderType.innerHTML = `ручки`;
                    break;
                default: 
                    console.log('no type of element');
                    break;
            }

            loaderItem.innerText = `${newText}`;

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
            element.setAttribute('data-active', 'false');
            element.classList.remove('handle__option--active');
        })
    }

    function resetStyleBlocks(exception) {
        styleBlocks.forEach(element => {
            if (element !== exception || exception === null) {
                if (!element.classList.contains('handle__icon--hover')) {
                    element.querySelector('.handle__icon--hover').classList.remove('handle__icon--clicked');
                } else {
                    element.classList.remove('handle__icon--clicked');
                }
                element.querySelector('.handle__style').classList.remove('handle__style--active');
            }
            
        })
    }
});

contentStyleBlocks.forEach(element => {
    element.addEventListener('click', (e) => {
        e.stopPropagation();
    })
})
// closeStyleBlock.addEventListener('click', toggleStyleBlock);




    
    const zoomBlock = document.querySelector('.handle__zoom');
const zoomButton = document.querySelector('.handle-zoom');
let zoomLever = false;
const zoomElementsToHide = [
    document.querySelectorAll('.handle__left .handle__left-item:not(.handle-zoom), .handle__filter-block, .handle__middle, .handle__right')
]

function setZoom(xPer, yPer) {
      zoomBlock.style.transformOrigin = `${xPer}% ${yPer}%`;
}

const zoomContainer = document.querySelector('.handle__container');


function setZoomEvent(e) {
    // Get the target
    const target = zoomContainer;

    let width = target.offsetWidth;
    let height = target.offsetHeight;

    // Get the bounding rectangle of target
    const rect = target.getBoundingClientRect();

    // Mouse position
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    let xPercente = (x / width * 100).toFixed(2);
    let yPercente = (y / height * 100).toFixed(2);

    setZoom(xPercente, yPercente);
}

zoomButton.addEventListener('click', function() {
    zoomLever = !zoomLever;
    if (zoomLever) {
        zoomBlock.classList.add('handle__zoom--active');
        zoomContainer.classList.add('handle__container--zoom-cursor');
        zoomButton.classList.add('handle-zoom--active');
        zoomContainer.addEventListener('mousemove', setZoomEvent, false);
    } else {
        zoomBlock.classList.remove('handle__zoom--active');
        zoomContainer.classList.remove('handle__container--zoom-cursor');
        zoomButton.classList.remove('handle-zoom--active');
        zoomContainer.removeEventListener('mousemove', setZoomEvent);
    }
    toggleHideElements(zoomElementsToHide);
})
    // const searchBlock = document.querySelector('.search');

// function setSearchHeight() {
//     let containerHeight = containerBlock.offsetHeight;

//     searchBlock.style.maxHeight = `${containerHeight - 10}px`
// }

// window.addEventListener('load', () => {
//     setSearchHeight();
// });


    const controlButtons = document.querySelectorAll('.search__control-3d');
const controlList = document.querySelector('.search__list');

controlButtons.forEach(element => {
    let blockToShow = element.querySelector('.search__3d');
    let closeMessageBlock = element.querySelector('.search__3d-close');
    let noButtonMessage = element.querySelector('.search__3d-button--no');

    if (blockToShow !== null) {
        let topOfBlock = 0
        blockToShow.addEventListener('click', function(e) {
            e.stopPropagation();
        })
        element.addEventListener('click', toggleMessageBlock)
        closeMessageBlock.addEventListener('click', toggleMessageBlock);
        noButtonMessage.addEventListener('click', toggleMessageBlock);

        const scrollListener = () => {
            topOfBlock = element.getBoundingClientRect().top + window.scrollY;
            blockToShow.style.transform = `translateY(${topOfBlock}px) translateX(100%)`;
        };

        scrollListener();

        controlList.addEventListener('scroll', scrollListener);

        function toggleMessageBlock(event) {
            event.stopPropagation();
            blockToShow.classList.toggle('search__3d--active');
        }
    }
})
});
