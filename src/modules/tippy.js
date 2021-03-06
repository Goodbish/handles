const basketButton = document.querySelector('#basket-icon');


tippy(basketButton, {
    // default
    content: "Перейти в корзину",
    placement: 'bottom',
    animation: 'fade',
    theme: 'handle',
    arrow: false,
});

tippy('#share-icon', {
    content: "Поделиться / Скопировать ссылку",
    placement: 'right',
    animation: 'fade',
    theme: 'handle',
    arrow: false,
})

tippy('#hide-icon', {
    content: "Убрать элементы управления",
    placement: 'right',
    animation: 'fade',
    theme: 'handle',
    arrow: false,
})

tippy('#show-icon', {
    content: "Показать элементы управления",
    placement: 'right',
    animation: 'fade',
    theme: 'handle',
    arrow: false,
})

let zoomTippy = tippy('#zoom-icon', {
    content: "Увеличить",
    placement: 'right',
    animation: 'fade',
    theme: 'handle',
    arrow: false,
    onShow(instance) {
        if (document.querySelector('#zoom-icon').classList.contains('handle-zoom--active')) {
            zoomTippy[0].setContent('Уменьшить');
        } else {
            zoomTippy[0].setContent('Увеличить');
        }
    },
})

console.log(zoomTippy);

tippy('#home-icon', {
    content: "Вернуться на сайт",
    placement: 'right',
    animation: 'fade',
    theme: 'handle',
    arrow: false,
})

let hadnleTippy = tippy('#handle-icon', {
    content: "Подобрать мебельную ручку",
    placement: 'right',
    animation: 'fade',
    theme: 'handle',
    arrow: false,
    onShow(instance) {
        if (document.querySelector('#handle-icon .handle__style').classList.contains('handle__style--active')) {
            return false
        }
    },
})

let detailTippy = tippy('#detail-icon', {
    content: "Посмотреть 3D-модель ручки",
    placement: 'bottom',
    animation: 'fade',
    theme: 'handle',
    arrow: false,
    onShow(instance) {
        if (document.querySelector('#detail-icon .handle__style').classList.contains('handle__style--active')) {
            return false
        }
    },
})


tippy('.handle__next', {
    content: "Следующий ракурс кухни",
    placement: 'left',
    animation: 'fade',
    theme: 'handle',
    arrow: false,
})

tippy('.handle__prev', {
    content: "Предыдущий ракурс кухни",
    placement: 'left',
    animation: 'fade',
    theme: 'handle',
    arrow: false,
})

tippy('.search__control-3d', {
    content: "Посмотреть 3D-модель ручки",
    placement: 'right',
    animation: 'fade',
    theme: 'handle',
    arrow: false,
})

tippy('.search__control-link', {
    content: "Перейти в карточку товара",
    placement: 'right',
    animation: 'fade',
    theme: 'handle',
    arrow: false,
})

tippy('.search__control-add', {
    content: "Добавить товар в корзину",
    placement: 'right',
    animation: 'fade',
    theme: 'handle',
    arrow: false,
})

let leftFullScreen = tippy('.full-screen.handle__left-item', {
    content: "Развернуть на весь экран",
    placement: 'right',
    animation: 'fade',
    theme: 'handle',
    arrow: false,
    onShow(instance) {
        if (document.querySelector('.full-screen').classList.contains('full-screen--active')) {
            leftFullScreen[0].setContent('Выйти из полноэкранного режима')
        }else {
            leftFullScreen[0].setContent('Развернуть на весь экран')
        }
    },
})

let rightFullScreen = tippy('.full-screen.handle__right-item', {
    content: "Развернуть на весь экран",
    placement: 'bottom',
    animation: 'fade',
    theme: 'handle',
    arrow: false,
    onShow(instance) {
        if (document.querySelector('.full-screen').classList.contains('full-screen--active')) {
            rightFullScreen[0].setContent('Выйти из полноэкранного режима')
        } else {
            rightFullScreen[0].setContent('Развернуть на весь экран')
        }
    },
})

