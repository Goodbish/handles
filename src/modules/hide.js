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