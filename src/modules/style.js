

const closeStyleBlock = document.querySelector('.handle__style-close');
styleBlocks.forEach(element => {
    function toggleBlock() {
        resetStyleBlocks(element);
        
        if (!element.classList.contains('handle__icon--hover')) {
            element.querySelector('.handle__icon--hover').classList.toggle('handle__icon--clicked');
        } else {
            element.classList.toggle('handle__icon--clicked');
        }

        // setTimeout if for listener below
        setTimeout(function() {
            element.querySelector('.handle__style').classList.toggle('handle__style--active');
        }, 0)
    }

    window.addEventListener('click', function(e) {
        if (element.classList.contains('handle-style--js-outside') &&
            e.currentTarget !== element.querySelector('.handle__style') && 
            element.querySelector('.handle__style').classList.contains('handle__style--active'))    {
            this.setTimeout(function() {
                resetStyleBlocks();
            }, 0)
            
        }
    })
    
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
            let srcList = '';
            
            switch (angle) {
                case '1' :
                    srcList = element.getAttribute('data-image');
                    break;
                case '2' :
                    srcList = element.getAttribute('data-image-secondary');
                    break;
                case '3' :
                    srcList = element.getAttribute('data-image-third');
                    break;
                default: 
                    srcList = element.getAttribute('data-image');
            }
            
            let newText = element.querySelector('span').innerHTML;
            console.log(newText);
            
            let styleType = element.getAttribute('data-type');
            let elementToChange;
            switch (styleType) {
                case 'style' :
                    elementToChange = mainImageBlock;
                    localStorage.setItem('style', srcList);
                    localStorage.setItem('styleText', newText);
                    // loaderType.innerHTML = `???????????????? ?? ??????????`;
                    break;
                case 'facade' : 
                    elementToChange = facadeImageBlock;
                    localStorage.setItem('facade', srcList);
                    localStorage.setItem('facadeText', newText);
                    let newColor = element.getAttribute('data-color');
                    localStorage.setItem('facadeColor', newColor);
                    // loaderType.innerHTML = `?????????? ?? ??????????`;
                    break;
                case 'handles' :
                    elementToChange = handlesImageBlock;
                    localStorage.setItem('handles', srcList);
                    localStorage.setItem('handlesText', newText);
                    // loaderType.innerHTML = `??????????`;
                    break;
                default: 
                    console.log('no type of element');
                    break;
            }

            srcList = srcList.split(',');
            loaderType.innerText = `????????????????`;
            loaderItem.innerText = ``;
            resetImages(elementToChange);
            console.log('elementToChange:')
            console.log(elementToChange);
            // loaderItem.innerText = `${newText}`;

            function setNewImage() {
                return new Promise((resolve) => {
                    let checkList = [];
                    for (let i = 0; i < srcList.length; i++) {
                        checkList[i] = false;
                    }
                    srcList.forEach(newSrc => {
                        let img = document.createElement("img");
                        img.src = newSrc;
                        img.classList.add('handle__background-img');
                        elementToChange.appendChild(img);
                        img.onload = function() {
                            for (let i = 0; i < srcList.length; i++) {
                                if (i === srcList.length -1) {
                                    resolve();
                                }

                                if (checkList[i] === false) {
                                    checkList[i] = true;
                                }
                            }
                        }
                        
                    })
                })
            }
            
            async function waitNewImage() {
                toggleLoader();
                await setNewImage();
                toggleLoader();
                setLocalInfo();
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
});



contentStyleBlocks.forEach(element => {
    element.addEventListener('click', (e) => {
        e.stopPropagation();
    })
})
// closeStyleBlock.addEventListener('click', toggleStyleBlock);



