const styleBlocks = document.querySelectorAll('.handle-style');
const contentStyleBlocks = document.querySelectorAll('.handle__style');

const closeStyleBlock = document.querySelector('.handle__style-close');
styleBlocks.forEach(element => {
    function toggleBlock() {
        element.classList.toggle('handle__icon--clicked');
        element.querySelector('.handle__style').classList.toggle('handle__style--active');
    }

    element.addEventListener('click', toggleBlock);
    element.querySelector('.handle__style-close').addEventListener('click', toggleBlock);

    const changeStyleButtons = element.querySelectorAll('.handle__style-option');

    changeStyleButtons.forEach(element => {
        element.addEventListener('click', function() {
            resetStyleButtons();
            element.classList.add('handle__style-option--active');
            // here function to set bg
            localStorage.getItem('angle');
            newSrc = '';
            switch (globalSlideIndex) {
                case 1 :
                    newSrc = element.getAttribute('data-image');
                    break;
                case 2 :
                    newSrc = element.getAttribute('data-image-secondary');
                    break;
                case 3 :
                    newSrc = element.getAttribute('data-image-third');
                    break;
            }
            
            let styleType = element.getAttribute('data-type');
            let elementToChange;
            switch (styleType) {
                case 'style' :
                    elementToChange = mainImage;
                    localStorage.setItem('style', newSrc);
                    break;
                case 'facade' : 
                    elementToChange = facadeImage;
                    localStorage.setItem('facade', newSrc);
                    break;
                case 'handles' :
                    elementToChange = handlesImage;
                    localStorage.setItem('handles', newSrc);
                    break;
                default: 
                    console.log('no type of element');
                    break;
            }

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
            element.classList.remove('handle__style-option--active');
        })
    }
});

contentStyleBlocks.forEach(element => {
    element.addEventListener('click', (e) => {
        e.stopPropagation();
    })
})
// closeStyleBlock.addEventListener('click', toggleStyleBlock);



