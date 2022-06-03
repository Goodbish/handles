let testElement = new SimpleBar(document.querySelector('.search__list'), {
    autoHide: false
});

let detailElement = new SimpleBar(document.querySelector('.detail'), {
    autoHide: false
});

let scrollEl = testElement.getScrollElement();
let preventBodyScroll = false;

window.addEventListener('mousewheel', ev => {
    const { scrollHeight, scrollTop, offsetHeight } = scrollEl;
    const { wheelDelta } = ev;

    if (preventBodyScroll) {
        if (
            (wheelDelta < 0 && scrollHeight === scrollTop + offsetHeight) // Down
            || (wheelDelta >= 0 && scrollTop === 0) // Up
        ) {
            ev.preventDefault();
        }
    }
}, { passive: false });
scrollEl.addEventListener('mouseenter', () => preventBodyScroll = true);
scrollEl.addEventListener('mouseleave', () => preventBodyScroll = false);
// scrollEl2.addEventListener('mouseenter', () => preventBodyScroll = true);
// scrollEl2.addEventListener('mouseleave', () => preventBodyScroll = false);