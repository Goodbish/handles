const changeAngleButtons = document.querySelectorAll('.handle__change');

changeAngleButtons.forEach(button => {
    button.addEventListener('click', function() {
        let activeElements = document.querySelectorAll('[data-active="true"]');
        button.classList.contains('handle__next') ? globalSlideIndex++ : globalSlideIndex--;
        console.log(globalSlideIndex);
        checkGlobalIndex();

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
                // document.querySelector('.handle__background-image--main img').setAttribute('src', newMainImage);
                // facadeImage.setAttribute('src', newFacadeImage);
                // handlesImage.setAttribute('src', newHandlesImage);
        
                let check = [];
                resetImages(mainImageBlock);
                setListImage(mainImageBlock, newMainImage, check);

                resetImages(facadeImageBlock);
                setListImage(facadeImageBlock, newFacadeImage, check);
        
                resetImages(handlesImageBlock);
                setListImage(handlesImageBlock, newHandlesImage, check);

                function imageLoaded(array) {
                    for (let i = 0; i < array.length; i++) {
                        if (array[i] === false) {
                            array[i] = true;
                            return
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
            toggleSpecialLoader()
            toggleImages();
            toggleLoader();
            await setNewImage();
            setLocalSet();
            toggleSpecialLoader();
            toggleLoader();
            toggleImages();
            setLocalInfo();
        }
        
        waitNewImage();
    
        function setLocalSet() {
            localStorage.setItem('style', newMainImage);
            localStorage.setItem('facade', newFacadeImage);
            localStorage.setItem('handle', newHandlesImage);
        }
    })
})