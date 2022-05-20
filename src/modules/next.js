const nextButton = document.querySelector('.handle__next');


nextButton.addEventListener('click', function() {
    let activeElements = document.querySelectorAll('[data-active="true"]');
    globalSlideIndex++;
    if (globalSlideIndex > 3) {
        globalSlideIndex = 1;
    }
    // set local angle index
    localStorage.setItem('angle', globalSlideIndex);
    

    // get all active images to change

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
        setLocalSet();
        toggleLoader();
    }
    
    waitNewImage();

    function setLocalSet() {
        localStorage.setItem('style', newMainImage);
        localStorage.setItem('facade', newFacadeImage);
        localStorage.setItem('handle', newHandlesImage);
    }
})