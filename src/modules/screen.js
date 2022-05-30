function firstScreen() {
    const previewLoader = document.querySelector('#preview .preview__loading-block');
    const previewButton = document.querySelector('#preview .preview__button');

    // check if we need show first screen

    let screenCounter = localStorage.getItem('screenCounter');
    if (screenCounter === null) {
        localStorage.setItem('screenCounter', '1');
        screenCounter = 0;
    }

    if (screenCounter <= 2) {
        let newCounter = Number(screenCounter) + 1;
        localStorage.setItem('screenCounter', `${newCounter}`);
        toggleFirstScreen();
    }

    // get localstorage info

    const localStyleImage = localStorage.getItem('style');
    const localFacadeImage = localStorage.getItem('facade');
    const localHandleImage = localStorage.getItem('handle');

    // set localstorage angle if we have it

    const localSlideIndex = localStorage.getItem('angle');
    if (localSlideIndex != null) {
        globalSlideIndex = Number(localSlideIndex);
    }

    checkGlobalIndex();
    setActiveItems();
    
    function setNewImage() {
        return new Promise((resolve) => {
            let check = [false, false, false];

            mainImage.onload = function() {
                check[0] = true;
                checkArray()
            }

            if (localStyleImage !== null) {
                mainImage.setAttribute('src', localStyleImage);
            } else {
                let initiaMainImage = mainImage.getAttribute('src');
                mainImage.setAttribute('src', initiaMainImage);
            }

            facadeImage.onload = function() {
                check[1] = true;
                checkArray();
            }

            if (localFacadeImage !== null) {
                facadeImage.setAttribute('src', localFacadeImage);
            } else {
                let initiaFacadeImage = mainImage.getAttribute('src');
                facadeImage.setAttribute('src', initiaFacadeImage);
            }
            

            if (handlesImage.copmlete) {
                check[2] = true;
                checkArray();
            } else {
                handlesImage.onload = function() {
                    check[2] = true;
                    checkArray();
                }
            }

            if (localHandleImage !== null) {
                handlesImage.setAttribute('src', localHandleImage);
            } else {
                let initiaHandlesImage = mainImage.getAttribute('src');
                handlesImage.setAttribute('src', initiaHandlesImage);
            }

            function checkArray() {
                if (JSON.stringify(check) === JSON.stringify([true, true, true])) {
                    resolve();
                }
            }
        })
    }

    async function waitNewImage() {
        if (screenCounter <= 2) {
            previewLoader.classList.add('preview__loading-block--show');
        } else {
            toggleImages();
            toggleLoader();
        }
        await setNewImage();
        if (screenCounter <= 2) {
            previewButton.classList.add('preview__button--show');
            previewLoader.classList.remove('preview__loading-block--show');
        } else {
            toggleLoader();
            toggleImages();
        }
        setLocalInfo();
        setActiveItems();
    }
    
    waitNewImage();
}

function toggleFirstScreen() {
    document.querySelector('#preview').classList.toggle('preview--active');
    document.querySelector('.handle__background').classList.toggle('handle__background--blur');
    // document.querySelector('.handle__container').classList.toggle('handle__container--lock');
    document.querySelectorAll('.handle__left, .handle__right, .handle__middle, .handle__change').forEach(element => {
        element.classList.toggle('handle--events-lock')
    })
}

function setActiveItems() {
    styleBlocks.forEach(element => {
        const localStyle = localStorage.getItem('style');
        const localFacade = localStorage.getItem('facade');
        const localHandle = localStorage.getItem('handles');

        const changeStyleButtons = element.querySelectorAll('.handle__option');

        changeStyleButtons.forEach(element => {
            let imageAngle = localStorage.getItem('angle');
            let imageToCheck = '';
            switch (imageAngle) {
                case "1" : 
                    imageToCheck = element.getAttribute('data-image');
                    break;
                case "2" : 
                    imageToCheck = element.getAttribute('data-image-secondary');
                    break;
                case "3" : 
                    imageToCheck = element.getAttribute('data-image-third');
                    break;
            }
    
            if (localStyle !== null && element.getAttribute('data-type') === 'style' && localStyle === imageToCheck) {
                setActiveOption();
            }
    
            if (localFacade !== null && element.getAttribute('data-type') === 'facade' && localFacade === imageToCheck) {
                setActiveOption();
                console.log(imageToCheck);
            }
    
            if (localHandle !== null && element.getAttribute('data-type') === 'handle' && localHandle === imageToCheck) {
                setActiveOption();
            }

            function setActiveOption() {
                resetStyleButtons();
                element.setAttribute('data-active', 'true');
                element.classList.add('handle__option--active');
            }
        })

        function resetStyleButtons() {
            changeStyleButtons.forEach(element => {
                element.setAttribute('data-active', 'false');
                element.classList.remove('handle__option--active');
            })
        }
    })
}

const firstScreenButton = document.querySelector('.preview__button')

firstScreenButton.addEventListener('click', toggleFirstScreen);

firstScreen();