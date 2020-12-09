function slider({parent, wrapper,field, slide, arrowPrev, arrowNext,current,total}) {
    const slider = document.querySelector(parent),
    sliderWrapper = slider.querySelector(wrapper),
    slidesField = slider.querySelector(field),
    slides = slider.querySelectorAll(slide),
    prevBtn = slider.querySelector(arrowPrev),
    nextBtn = slider.querySelector(arrowNext),
    curentSlide = slider.querySelector(current),
    totalSlide = slider.querySelector(total),
    width = window.getComputedStyle(sliderWrapper).width;

    let offset = 0,
    numWidth = +width.replace(/\D/g,'');
    const navWrapper = document.createElement('div'),
        dots = [];
    navWrapper.classList.add('offer__slider-nav');
    slider.append(navWrapper);
    for(let i=0;i<slides.length;i++){
        let navRound = document.createElement('div');
        navRound.classList.add('offer__slider-round');
        navRound.setAttribute('data-slide-to', i+1);
        if (i == 0){
            navRound.style.opacity = 1;
        }
        navWrapper.append(navRound);
        dots.push(navRound);
    }

    slidesField.style.width = 100 * slides.length + '%';
    totalSlide.innerHTML = addZero(slides.length);
    slides.forEach(item => {
    item.style.width = width;
    });

    function addZero(num){
    if (num >= 0 && num < 10){
        return `0${num}`;
    } else {
        return num;
    }
    } 

    function showSlides(slide) {
    slidesField.style.transform = `translateX(-${slide}px)`;
    curentSlide.innerHTML = addZero((offset/numWidth)+1); 
    dots.forEach(item => item.style.opacity = '0.5');
    dots[(offset/numWidth)].style.opacity = '1';  
    } 

    nextBtn.addEventListener('click', () => {
    if (offset >= numWidth * (slides.length-1)){
        offset = 0;
    } else {
        offset+=numWidth;
    }
    showSlides(offset);
    });
    prevBtn.addEventListener('click', () => {
    if (offset <= 0){
        offset = numWidth * (slides.length-1);
    } else {
        offset-=numWidth;
    }
    showSlides(offset);
    
    });

    dots.forEach(item => {
    item.addEventListener('click',(event) => {
        const slideTo = event.target.getAttribute('data-slide-to');
        offset = numWidth* (slideTo-1);
        showSlides(offset);
    });
    });

}

export default slider;