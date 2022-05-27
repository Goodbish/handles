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