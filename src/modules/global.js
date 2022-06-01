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