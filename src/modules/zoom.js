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