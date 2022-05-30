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

