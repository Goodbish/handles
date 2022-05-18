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