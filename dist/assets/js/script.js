
document.addEventListener("DOMContentLoaded", function(event) { 
    const containerBlock = document.querySelector('.handle__container');
const mainImageBlock = document.querySelector('.handle__background-image--main');
const mainImage = mainImageBlock.querySelector('img');
const facadeImageBlock = document.querySelector('.handle__background-image--2');
const facadeImage = facadeImageBlock.querySelector('img');
const handlesImageBlock = document.querySelector('.handle__background-image--3');
const handlesImage = handlesImageBlock.querySelector('img');
const loaderType = document.querySelector('.preview__load-type');
const loaderItem = document.querySelector('.preview__load-text');
let newMainImage = '';
let newFacadeImage = '';
let newHandlesImage = '';
let globalSlideIndex = 1;
const styleBlocks = document.querySelectorAll('.handle-style');
const contentStyleBlocks = document.querySelectorAll('.handle__style');

function toggleLoader() {
    document.querySelector('.loader.preview').classList.toggle('preview--active');
    document.querySelector('.handle__background').classList.toggle('handle__background--blur');
    containerBlock.classList.toggle('handle__container--lock');
}

function toggleSpecialLoader() {
    document.querySelector('.handle__background').classList.toggle('handle__background--hide');
}

function toggleImages() {
    document.querySelector('.handle__background-image--2').classList.toggle('handle__background-image--hide');
    document.querySelector('.handle__background-image--3').classList.toggle('handle__background-image--hide');
}

function checkGlobalIndex() {
    if (globalSlideIndex >= 3) {
        document.querySelector('.handle__next').classList.add('handle__change--hide')
    }  else {
        document.querySelector('.handle__next').classList.remove('handle__change--hide')
    }

    if (globalSlideIndex > 3) {
        globalSlideIndex = 3;
    }

    if (globalSlideIndex < 1) {
        globalSlideIndex = 1;
    }

    if (globalSlideIndex <= 1 ) {
        document.querySelector('.handle__prev').classList.add('handle__change--hide')
    } else {
        document.querySelector('.handle__prev').classList.remove('handle__change--hide')
    }
}



const infoStyle = document.querySelector('.handle__info-style');
const selectedStyle = document.querySelector('#style-text');
const infoFacade = document.querySelector('.handle__info-facade');
const infoFacadeColor = document.querySelector('.handle__info-color');
const selectedFacade = document.querySelector('#facadeText span');
const selectedColor = document.querySelector('#facadeColor .handle__color');
const infoHandle = document.querySelector('.handle__info-handle');

function setLocalInfo() {
    const localStyleText = localStorage.getItem('styleText');
    const localFacadeText = localStorage.getItem('facadeText');
    const localHandleText = localStorage.getItem('handlesText');
    const localFacadeColor = localStorage.getItem('facadeColor');

    if (localStyleText !== null) {
        infoStyle.innerText = localStyleText;
        selectedStyle.innerText = localStyleText;
    }

    if (localFacadeText !== null) {
        infoFacade.innerText = localFacadeText;
        selectedFacade.innerText = localFacadeText;
    }

    if (localHandleText !== null) {
        infoHandle.innerText = localHandleText;
    }

    if (localFacadeColor !== null) {
        infoFacadeColor.style.background = localFacadeColor;
        selectedColor.style.background = localFacadeColor;
    }
}

// checks if all elements in array are true
let arrayChecker = arr => arr.every(v => v === true);

function resetImages(block) {
    block.innerHTML = '';
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

// function imageLoaded(array) {
//     for (let i = 0; i < array.length; i++) {
//         if (array[i] === false) {
//             array[i] = true;
//         }
//     }
// }

// function setListImage(elementToChange, stringList, array) {
//     srcList = stringList.split(',');
//     srcList.forEach(() => {
//         array.push(false);
//     });
//     srcList.forEach(newSrc => {
//         let img = document.createElement("img");
//         img.src = newSrc;
//         img.classList.add('handle__background-img');
//         elementToChange.appendChild(img);
//         img.onload = function() {
//             imageLoaded(array);
//             checkArray(array);
//         }
//     })
// }

// function checkArray(array) {
//     if (arrayChecker(array)) {
//         resolve();
//     }
// }
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
    setActiveItems();
    
    function setNewImage() {
        return new Promise((resolve) => {
            let check = [false];

            // mainImage.onload = function() {
            //     imageLoaded(check);
            //     checkArray(check);
            // }

            // if (localStyleImage !== null) {
            //     mainImage.setAttribute('src', localStyleImage);
            // } else {
            //     let initiaMainImage = mainImage.getAttribute('src');
            //     mainImage.setAttribute('src', initiaMainImage);
            // }

            if (localStyleImage !== null) {
                resetImages(mainImageBlock);
                setListImage(mainImageBlock, localStyleImage, check);
            } else {
                resetImages(facadeImageBlock);
                let initiaMainImage = mainImage.getAttribute('src');
                setListImage(facadeImageBlock, initiaMainImage, check);
            }

            if (localFacadeImage !== null) {
                resetImages(facadeImageBlock);
                setListImage(facadeImageBlock, localFacadeImage, check);
            } else {
                resetImages(facadeImageBlock);
                let initiaFacadeImage = mainImage.getAttribute('src');
                setListImage(facadeImageBlock, initiaFacadeImage, check);
            }

            if (handlesImage.copmlete) {
                imageLoaded(check);
                checkArray(check);
            } else {
                handlesImage.onload = function() {
                    imageLoaded(check);
                    checkArray(check);
                }
            }

            if (localHandleImage !== null) {
                console.log('hello');
                handlesImage.setAttribute('src', localHandleImage);
            } else {
                let initiaHandlesImage = handlesImage.getAttribute('src');
                handlesImage.setAttribute('src', initiaHandlesImage);
            }

            function imageLoaded(array) {
                for (let i = 0; i < array.length; i++) {
                    if (array[i] === false) {
                        array[i] = true;
                        return
                    }
                }
            }
    
            function setListImage(elementToChange, stringList, array) {
                srcList = stringList.split(',');
                srcList.forEach(() => {
                    array.push(false);
                });
                srcList.forEach(newSrc => {
                    let img = document.createElement("img");
                    img.src = newSrc;
                    img.classList.add('handle__background-img');
                    elementToChange.appendChild(img);
                    img.onload = function() {
                        imageLoaded(array);
                        checkArray(array);
                    }
                })
            }
    
            function checkArray(array) {
                if (arrayChecker(array)) {
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
        setActiveItems();
    }
    
    waitNewImage();
}

function toggleFirstScreen() {
    document.querySelector('#preview').classList.toggle('preview--active');
    document.querySelector('.handle__background').classList.toggle('handle__background--blur');
    document.querySelector('.handle__info').classList.toggle('handle__info--hide');
    // document.querySelector('.handle__container').classList.toggle('handle__container--lock');
    document.querySelectorAll('.handle__left, .handle__right, .handle__middle, .handle__change').forEach(element => {
        element.classList.toggle('handle--events-lock')
    })
}


function setActiveItems() {
    styleBlocks.forEach(element => {
        const localStyle = localStorage.getItem('style');
        const localFacade = localStorage.getItem('facade');
        const localHandle = localStorage.getItem('handles');

        const changeStyleButtons = element.querySelectorAll('.handle__option');

        changeStyleButtons.forEach(element => {
            let imageAngle = localStorage.getItem('angle');
            let imageToCheck = '';
            switch (imageAngle) {
                case "1" : 
                    imageToCheck = element.getAttribute('data-image');
                    break;
                case "2" : 
                    imageToCheck = element.getAttribute('data-image-secondary');
                    break;
                case "3" : 
                    imageToCheck = element.getAttribute('data-image-third');
                    break;
            }
    
            if (localStyle !== null && element.getAttribute('data-type') === 'style' && localStyle === imageToCheck) {
                setActiveOption();
            }
    
            if (localFacade !== null && element.getAttribute('data-type') === 'facade' && localFacade === imageToCheck) {
                setActiveOption();
                console.log(imageToCheck);
            }
    
            if (localHandle !== null && element.getAttribute('data-type') === 'handle' && localHandle === imageToCheck) {
                setActiveOption();
            }

            function setActiveOption() {
                resetStyleButtons();
                element.setAttribute('data-active', 'true');
                element.classList.add('handle__option--active');
            }
        })

        function resetStyleButtons() {
            changeStyleButtons.forEach(element => {
                element.setAttribute('data-active', 'false');
                element.classList.remove('handle__option--active');
            })
        }
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
        checkGlobalIndex();

        // set local angle index
        localStorage.setItem('angle', globalSlideIndex);

        // set loading text
        if (button.classList.contains('handle__next')) {
            loaderType.innerText = `следующий интерьер`;
            loaderItem.innerText = ``;
        } else {
            loaderType.innerText = `предыдущий интерьер`;
            loaderItem.innerText = ``;
        }
        
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
                // document.querySelector('.handle__background-image--main img').setAttribute('src', newMainImage);
                // facadeImage.setAttribute('src', newFacadeImage);
                // handlesImage.setAttribute('src', newHandlesImage);
        
                let check = [];
                resetImages(mainImageBlock);
                setListImage(mainImageBlock, newMainImage, check);

                resetImages(facadeImageBlock);
                setListImage(facadeImageBlock, newFacadeImage, check);
        
                resetImages(handlesImageBlock);
                setListImage(handlesImageBlock, newHandlesImage, check);

                function imageLoaded(array) {
                    for (let i = 0; i < array.length; i++) {
                        if (array[i] === false) {
                            array[i] = true;
                            return
                        }
                    }
                }
                
                function setListImage(elementToChange, stringList, array) {
                    srcList = stringList.split(',');
                    srcList.forEach(() => {
                        array.push(false);
                    });
                    srcList.forEach(newSrc => {
                        let img = document.createElement("img");
                        img.src = newSrc;
                        img.classList.add('handle__background-img');
                        elementToChange.appendChild(img);
                        img.onload = function() {
                            imageLoaded(array);
                            checkArray(array);
                        }
                    })
                }
                
                function checkArray(array) {
                    if (arrayChecker(array)) {
                        resolve();
                    }
                }
            })
        }
        
        async function waitNewImage() {
            toggleSpecialLoader()
            toggleImages();
            toggleLoader();
            await setNewImage();
            setLocalSet();
            toggleSpecialLoader();
            toggleLoader();
            toggleImages();
            setLocalInfo();
        }
        
        waitNewImage();
    
        function setLocalSet() {
            localStorage.setItem('style', newMainImage);
            localStorage.setItem('facade', newFacadeImage);
            localStorage.setItem('handle', newHandlesImage);
        }
    })
})
    

const closeStyleBlock = document.querySelector('.handle__style-close');
styleBlocks.forEach(element => {
    function toggleBlock() {
        resetStyleBlocks(element);
        
        if (!element.classList.contains('handle__icon--hover')) {
            element.querySelector('.handle__icon--hover').classList.toggle('handle__icon--clicked');
        } else {
            element.classList.toggle('handle__icon--clicked');
        }

        // setTimeout if for listener below
        setTimeout(function() {
            element.querySelector('.handle__style').classList.toggle('handle__style--active');
        }, 0)
    }

    window.addEventListener('click', function(e) {
        if (element.classList.contains('handle-style--js-outside') &&
            e.currentTarget !== element.querySelector('.handle__style') && 
            element.querySelector('.handle__style').classList.contains('handle__style--active'))    {
            resetStyleBlocks();
        }
    })

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
            let srcList = '';
            
            switch (angle) {
                case '1' :
                    srcList = element.getAttribute('data-image');
                    break;
                case '2' :
                    srcList = element.getAttribute('data-image-secondary');
                    break;
                case '3' :
                    srcList = element.getAttribute('data-image-third');
                    break;
                default: 
                    srcList = element.getAttribute('data-image');
            }
            
            let newText = element.querySelector('span').innerHTML;
            console.log(newText);
            
            let styleType = element.getAttribute('data-type');
            let elementToChange;
            switch (styleType) {
                case 'style' :
                    elementToChange = mainImageBlock;
                    localStorage.setItem('style', srcList);
                    localStorage.setItem('styleText', newText);
                    // loaderType.innerHTML = `интерьер в стиле`;
                    break;
                case 'facade' : 
                    elementToChange = facadeImageBlock;
                    localStorage.setItem('facade', srcList);
                    localStorage.setItem('facadeText', newText);
                    let newColor = element.getAttribute('data-color');
                    localStorage.setItem('facadeColor', newColor);
                    // loaderType.innerHTML = `фасад в цвете`;
                    break;
                case 'handles' :
                    elementToChange = handlesImageBlock;
                    localStorage.setItem('handles', srcList);
                    localStorage.setItem('handlesText', newText);
                    // loaderType.innerHTML = `ручки`;
                    break;
                default: 
                    console.log('no type of element');
                    break;
            }

            srcList = srcList.split(',');
            loaderType.innerText = `интерьер`;
            loaderItem.innerText = ``;
            resetImages(elementToChange);
            console.log('elementToChange:')
            console.log(elementToChange);
            // loaderItem.innerText = `${newText}`;

            function setNewImage() {
                return new Promise((resolve) => {
                    let checkList = [];
                    for (let i = 0; i < srcList.length; i++) {
                        checkList[i] = false;
                    }
                    srcList.forEach(newSrc => {
                        let img = document.createElement("img");
                        img.src = newSrc;
                        img.classList.add('handle__background-img');
                        elementToChange.appendChild(img);
                        img.onload = function() {
                            for (let i = 0; i < srcList.length; i++) {
                                if (i === srcList.length -1) {
                                    resolve();
                                }

                                if (checkList[i] === false) {
                                    checkList[i] = true;
                                }
                            }
                        }
                        
                    })
                })
            }
            
            async function waitNewImage() {
                toggleLoader();
                await setNewImage();
                toggleLoader();
                setLocalInfo();
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
    resetStyleBlocks();
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
    const searchBlock = document.querySelector('.search');
const detailBlock = document.querySelector('.detail');

function setSearchHeight() {
    let containerHeight = containerBlock.offsetHeight;
    let resultHeight = `${containerHeight - 10}px`;
    searchBlock.style.maxHeight = resultHeight;
    detailBlock.style.maxHeight = resultHeight;
}

window.addEventListener('load', () => {
    setSearchHeight();
});


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
    const basketButton = document.querySelector('#basket-icon');


tippy(basketButton, {
    // default
    content: "Перейти в корзину",
    placement: 'bottom',
    animation: 'fade',
    theme: 'handle',
    arrow: false,
});

tippy('#share-icon', {
    content: "Поделиться / Скопировать ссылку",
    placement: 'right',
    animation: 'fade',
    theme: 'handle',
    arrow: false,
})

tippy('#hide-icon', {
    content: "Убрать элементы управления",
    placement: 'right',
    animation: 'fade',
    theme: 'handle',
    arrow: false,
})

tippy('#zoom-icon', {
    content: "Увеличить",
    placement: 'right',
    animation: 'fade',
    theme: 'handle',
    arrow: false,
})

tippy('#home-icon', {
    content: "Вернуться на сайт",
    placement: 'right',
    animation: 'fade',
    theme: 'handle',
    arrow: false,
})

tippy('#handle-icon', {
    content: "Подобрать мебельную ручку",
    placement: 'right',
    animation: 'fade',
    theme: 'handle',
    arrow: false,
})

tippy('#detail-icon', {
    content: "Посмотреть 3D-модель ручки",
    placement: 'right',
    animation: 'fade',
    theme: 'handle',
    arrow: false,
})

tippy('.handle__next', {
    content: "Следующий ракурс кухни",
    placement: 'left',
    animation: 'fade',
    theme: 'handle',
    arrow: false,
})

tippy('.handle__prev', {
    content: "Предыдущий ракурс кухни",
    placement: 'left',
    animation: 'fade',
    theme: 'handle',
    arrow: false,
})

tippy('.search__control-3d', {
    content: "Посмотреть 3D-модель ручки",
    placement: 'right',
    animation: 'fade',
    theme: 'handle',
    arrow: false,
})

tippy('.search__control-link', {
    content: "Перейти в карточку товара",
    placement: 'right',
    animation: 'fade',
    theme: 'handle',
    arrow: false,
})

tippy('.search__control-add', {
    content: "Добавить товар в корзину",
    placement: 'right',
    animation: 'fade',
    theme: 'handle',
    arrow: false,
})

});
