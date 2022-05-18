const styleBlocks = document.querySelectorAll('.handle-style');

const closeStyleBlock = document.querySelector('.handle__style-close');

styleBlocks.forEach(element => {
    element.addEventListener('click', () => {
        element.classList.toggle('handle__icon--clicked');
        element.querySelector('.handle__style').classList.toggle('handle__style--active');
    })

    const changeStyleButtons = element.querySelectorAll('.handle__style-option');

    changeStyleButtons.forEach(element => {
        element.addEventListener('click', function() {
            resetStyleButtons();
            element.classList.add('handle__style-option--active');
            // here function to set bg
            stylePath = '';
            switch (globalSlideIndex) {
                case 1 :
                    stylePath = element.getAttribute('data-image');
                    break;
                case 2 :
                    stylePath = element.getAttribute('data-image-secondary');
                    break;
                case 3 :
                    stylePath = element.getAttribute('data-image-third');
                    break;
            }
            
            let styleType = element.getAttribute('data-type');
            let elementToChange;
            switch (styleType) {
                case 'style' :
                    elementToChange = document.querySelector('.handle__background-image--main img');
                    break;
                case 'facade' : 
                    elementToChange = document.querySelector('.handle__background-image--2 img');
                    break;
                case 'handles' :
                    elementToChange = document.querySelector('.handle__background-image--3 img');
                    break;
                default: 
                    console.log('no type of element');
                    break;
            }
            
            elementToChange.setAttribute('src', stylePath);
        })
    })

    function resetStyleButtons() {
        changeStyleButtons.forEach(element => {
            element.classList.remove('handle__style-option--active');
        })
    }
});
// closeStyleBlock.addEventListener('click', toggleStyleBlock);



