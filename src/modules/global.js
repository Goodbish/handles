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

function toggleImages() {
    facadeImage.classList.toggle('.handle__background-image--hide');
    handlesImage.classList.toggle('.handle__background-image--hide');
}