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