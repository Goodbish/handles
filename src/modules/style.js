const styleBlocks = document.querySelectorAll('.handle-style');
const contentStyleBlocks = document.querySelectorAll('.handle__style');

const closeStyleBlock = document.querySelector('.handle__style-close');
styleBlocks.forEach(element => {
    function toggleBlock() {
        resetStyleBlocks(element);

        console.log(element);
        if (!element.classList.contains('handle__icon--hover')) {
            element.querySelector('.handle__icon--hover').classList.toggle('handle__icon--clicked');
        } else {
            element.classList.toggle('handle__icon--clicked');
        }
        element.querySelector('.handle__style').classList.toggle('handle__style--active');
    }

    element.addEventListener('click', toggleBlock);
    element.querySelector('.handle__style-close').addEventListener('click', resetStyleBlocks);

    const changeStyleButtons = element.querySelectorAll('.handle__option');

    changeStyleButtons.forEach(element => {
        element.addEventListener('click', function() {
            resetStyleButtons();
            element.classList.add('handle__option--active');
            element.setAttribute('data-active', 'true');
            // here function to set bg
            let angle = localStorage.getItem('angle');
            newSrc = '';
            
            switch (angle) {
                case '1' :
                    newSrc = element.getAttribute('data-image');
                    break;
                case '2' :
                    newSrc = element.getAttribute('data-image-secondary');
                    break;
                case '3' :
                    newSrc = element.getAttribute('data-image-third');
                    break;
                default: 
                    newSrc = element.getAttribute('data-image');
            }
            
            let newText = element.querySelector('span').innerHTML;
            console.log(newText);
            
            let styleType = element.getAttribute('data-type');
            let elementToChange;
            switch (styleType) {
                case 'style' :
                    elementToChange = mainImage;
                    localStorage.setItem('style', newSrc);
                    localStorage.setItem('styleText', newText);
                    // loaderType.innerHTML = `интерьер в стиле`;
                    break;
                case 'facade' : 
                    elementToChange = facadeImage;
                    localStorage.setItem('facade', newSrc);
                    localStorage.setItem('facadeText', newText);
                    // loaderType.innerHTML = `фасад в цвете`;
                    break;
                case 'handles' :
                    elementToChange = handlesImage;
                    localStorage.setItem('handles', newSrc);
                    localStorage.setItem('handlesText', newText);
                    // loaderType.innerHTML = `ручки`;
                    break;
                default: 
                    console.log('no type of element');
                    break;
            }

            loaderType.innerText = `интерьер`;
            loaderItem.innerText = ``;
            // loaderItem.innerText = `${newText}`;

            function setNewImage() {
                return new Promise((resolve) => {
                    elementToChange.setAttribute('src', newSrc);
                    elementToChange.onload = function() {
                        resolve();
                    }
                })
            }
            
            async function waitNewImage() {
                toggleLoader();
                await setNewImage();
                toggleLoader();
            }
            
            waitNewImage();
        })
    })

    function resetStyleButtons() {
        changeStyleButtons.forEach(element => {
            element.setAttribute('data-active', 'false');
            element.classList.remove('handle__option--active');
        })
    }

    function resetStyleBlocks(exception) {
        styleBlocks.forEach(element => {
            if (element !== exception || exception === null) {
                if (!element.classList.contains('handle__icon--hover')) {
                    element.querySelector('.handle__icon--hover').classList.remove('handle__icon--clicked');
                } else {
                    element.classList.remove('handle__icon--clicked');
                }
                element.querySelector('.handle__style').classList.remove('handle__style--active');
            }
            
        })
    }
});

contentStyleBlocks.forEach(element => {
    element.addEventListener('click', (e) => {
        e.stopPropagation();
    })
})
// closeStyleBlock.addEventListener('click', toggleStyleBlock);



