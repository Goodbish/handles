const elementsToHide = [
    document.querySelectorAll('.handle__left .handle__left-item:not(.handle-zoom), .handle__filter-block, .handle__middle, .handle__right')
]
const hideIconElement = document.querySelector('.handle__icon--alt');

function toggleHideElements() {
    elementsToHide[0].forEach(element => {
        element.classList.toggle('handle--hide');
    })
    document.querySelector('.handle-zoom .handle__icon').classList.toggle('handle__icon--active');
    hideIconElement.classList.toggle('handle__icon--active');
}

document.querySelector('.handle-zoom').addEventListener('click', toggleHideElements);
const nextButton = document.querySelector('.handle__next');
let globalSlideIndex = 1;
const mainImage = document.querySelector('.handle__background-image--main img');
const facadeImage = document.querySelector('.handle__background-image--2 img');
const handlesImage = document.querySelector('.handle__background-image--3 img');

nextButton.addEventListener('click', function() {
    let activeElements = document.querySelectorAll('[data-active="true"]');
    globalSlideIndex++;
    if (globalSlideIndex > 3) {
        globalSlideIndex = 1;
    }
    
    // get all active images to change
    let newMainImage = '';
    let newFacadeImage = '';
    let newHandlesImage = '';

    activeElements.forEach(element => {
        let dataType = element.getAttribute('data-type');

        switch (dataType) {
            case 'style' :
                newMainImage = chooseAngle(element, newMainImage);
                break;
            case 'facade' : 
                newFacadeImage = chooseAngle(element, newFacadeImage);
                break;
            case 'handles' :
                newHandlesImage = chooseAngle(element, newHandlesImage);
                break;
            default: 
                console.log('no type of element');
                break;
        }
    })

    function chooseAngle(element, newLink) {
        switch (globalSlideIndex) {
            case 1 :
                newLink = element.getAttribute('data-image');
                break;
            case 2 :
                newLink = element.getAttribute('data-image-secondary');
                break;
            case 3 :
                newLink = element.getAttribute('data-image-third');
                break;
        }

        return newLink;
    }

    // at this point we have all links

    mainImage.setAttribute('src', newMainImage);
    facadeImage.setAttribute('src', newFacadeImage);
    handlesImage.setAttribute('src', newHandlesImage);
})
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





