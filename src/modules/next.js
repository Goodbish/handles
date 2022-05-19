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

    function setNewImage() {
        return new Promise((resolve) => {
            mainImage.setAttribute('src', newMainImage);
            facadeImage.setAttribute('src', newFacadeImage);
            handlesImage.setAttribute('src', newHandlesImage);
    
            let check = [false, false, false];
            mainImage.onload = function() {
                check[0] = true;
                if (JSON.stringify(check) === JSON.stringify([true, true, true])) {
                    resolve();
                }
            }
    
            facadeImage.onload = function() {
                check[1] = true;
                if (JSON.stringify(check) === JSON.stringify([true, true, true])) {
                    resolve();
                }
            }
    
            handlesImage.onload = function() {
                check[2] = true;
                if (JSON.stringify(check) === JSON.stringify([true, true, true])) {
                    resolve();
                }
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