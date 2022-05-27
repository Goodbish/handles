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

function checkGlobalIndex() {
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
}



const infoStyle = document.querySelector('.handle__info-style');
const infoFacade = document.querySelector('.handle__info-facade');
const infoHandle = document.querySelector('.handle__info-handle');

function setLocalInfo() {
    const localStyleText = localStorage.getItem('styleText');
    const localFacadeText = localStorage.getItem('facadeText');
    const localHandleText = localStorage.getItem('handlesText');

    if (localStyleText !== null) {
        infoStyle.innerText = localStyleText;
    }

    if (localFacadeText !== null) {
        infoFacade.innerText = localFacadeText;
    }

    if (localHandleText !== null) {
        infoHandle.innerText = localHandleText;
    }
}