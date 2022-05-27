const changeAngleButtons = document.querySelectorAll('.handle__change');

changeAngleButtons.forEach(button => {
    button.addEventListener('click', function() {
        let activeElements = document.querySelectorAll('[data-active="true"]');
        button.classList.contains('handle__next') ? globalSlideIndex++ : globalSlideIndex--;
        console.log(globalSlideIndex);
        if (globalSlideIndex === 3) {
            document.querySelector('.handle__next').classList.add('handle__change--hide')
        }  else {
            document.querySelector('.handle__next').classList.remove('handle__change--hide')
        }

        if (globalSlideIndex === 1) {
            document.querySelector('.handle__prev').classList.add('handle__change--hide')
        } else {
            document.querySelector('.handle__prev').classList.remove('handle__change--hide')
        }

        // set local angle index
        localStorage.setItem('angle', globalSlideIndex);
        
    
        // get all active images to change
    
        activeElements.forEach(element => {
            let dataType = element.getAttribute('data-type');
            let newText = element.querySelector('span').innerHTML;
    
            switch (dataType) {
                case 'style' :
                    newMainImage = chooseAngle(element, newMainImage);
                    localStorage.setItem('styleText', newText);
                    break;
                case 'facade' : 
                    newFacadeImage = chooseAngle(element, newFacadeImage);
                    localStorage.setItem('facadeText', newText);
                    break;
                case 'handles' :
                    newHandlesImage = chooseAngle(element, newHandlesImage);
                    localStorage.setItem('handlesText', newText);
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
            toggleImages();
            toggleLoader();
            await setNewImage();
            setLocalSet();
            toggleLoader();
            toggleImages();
        }
        
        waitNewImage();
    
        function setLocalSet() {
            localStorage.setItem('style', newMainImage);
            localStorage.setItem('facade', newFacadeImage);
            localStorage.setItem('handle', newHandlesImage);
        }
    })
})