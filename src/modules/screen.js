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
            let check = [false];

            // mainImage.onload = function() {
            //     imageLoaded(check);
            //     checkArray(check);
            // }

            // if (localStyleImage !== null) {
            //     mainImage.setAttribute('src', localStyleImage);
            // } else {
            //     let initiaMainImage = mainImage.getAttribute('src');
            //     mainImage.setAttribute('src', initiaMainImage);
            // }

            if (localStyleImage !== null) {
                resetImages(mainImageBlock);
                setListImage(mainImageBlock, localStyleImage, check);
            } else {
                resetImages(facadeImageBlock);
                let initiaMainImage = mainImage.getAttribute('src');
                setListImage(facadeImageBlock, initiaMainImage, check);
            }

            if (localFacadeImage !== null) {
                resetImages(facadeImageBlock);
                setListImage(facadeImageBlock, localFacadeImage, check);
            } else {
                resetImages(facadeImageBlock);
                let initiaFacadeImage = mainImage.getAttribute('src');
                setListImage(facadeImageBlock, initiaFacadeImage, check);
            }

            if (handlesImage.copmlete) {
                imageLoaded(check);
                checkArray(check);
            } else {
                handlesImage.onload = function() {
                    imageLoaded(check);
                    checkArray(check);
                }
            }

            if (localHandleImage !== null) {
                console.log('hello');
                handlesImage.setAttribute('src', localHandleImage);
            } else {
                let initiaHandlesImage = handlesImage.getAttribute('src');
                handlesImage.setAttribute('src', initiaHandlesImage);
            }

            function imageLoaded(array) {
                for (let i = 0; i < array.length; i++) {
                    if (array[i] === false) {
                        array[i] = true;
                    }
                }
            }
    
            function setListImage(elementToChange, stringList, array) {
                srcList = stringList.split(',');
                srcList.forEach(() => {
                    array.push(false);
                });
                srcList.forEach(newSrc => {
                    let img = document.createElement("img");
                    img.src = newSrc;
                    img.classList.add('handle__background-img');
                    elementToChange.appendChild(img);
                    img.onload = function() {
                        imageLoaded(array);
                        checkArray(array);
                    }
                })
            }
    
            function checkArray(array) {
                if (arrayChecker(array)) {
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