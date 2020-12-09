/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function calc(){
    const result = document.querySelector('.calculating__result span');
    let  gender, age, height, weight, ratio;

    if (localStorage.getItem('gender')){
        gender = localStorage.getItem('gender');
    } else {
        gender = 'female';
        localStorage.setItem('gender','female');
    }

    if (localStorage.getItem('ratio')){
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', 1.375);
    }

    function initLocalSettings(selector,activeClass){
        const elems = document.querySelectorAll(selector);
        elems.forEach(item => {
            item.classList.remove(activeClass);
            if(item.getAttribute('data-ratio') == localStorage.getItem('ratio') ||
               item.getAttribute('id') == localStorage.getItem('gender')){
                   item.classList.add(activeClass);
            }
        });
    }
    initLocalSettings('#gender div','calculating__choose-item_active');
    initLocalSettings('.calculating__choose_big div','calculating__choose-item_active');

    function calcTotal(){
        if (!gender||!age||!height||!weight||!ratio){
            result.textContent = '      ';
            return;
        }
        if (gender === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }
    calcTotal();

    function getStaticInformation(selector, activeClass){
        const elems = document.querySelectorAll(selector);
        elems.forEach(item => {
            item.addEventListener('click',(event) => {
                if (event.target.getAttribute('data-ratio')){
                    ratio = +event.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio',+event.target.getAttribute('data-ratio'));
                } else {
                    gender = event.target.getAttribute('id');
                    localStorage.setItem('gender',event.target.getAttribute('id'));
                }
                elems.forEach(item => {
                    item.classList.remove(activeClass);
                });
                event.target.classList.add(activeClass);
                calcTotal();
            });
        });
    }
    getStaticInformation('.calculating__choose_big div','calculating__choose-item_active');
    getStaticInformation('#gender div','calculating__choose-item_active');

    function getDynamicInformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () => {

            if (input.value.match(/\D/g)){
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')) {
                case "height":
                    height = +input.value;
                    break;
                case "weight":
                    weight = +input.value;
                    break;
                case "age":
                    age = +input.value;
                    break;
            }

            calcTotal();
        });
    }

    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards(){
    class MenuItem {
        constructor (bgImage,bgAlt,title,text,price, ...classes) {
            this.bgImage = bgImage;
            this.bgAlt = bgAlt;
            this.title = title;
            this.text = text;
            this.price = price;
            this.classes = classes;
            this.transfer = 27;
            this.changeToUAH(); 
        }

        changeToUAH() {
            this.price = this.price * this.transfer; 
        }
            
        
        createMenuItem(parent){
            let menuBlock = document.createElement('div');
            if(this.classes.length === 0){
                menuBlock.classList.add('menu__item');
            }
            this.classes.forEach(classNames => {
                menuBlock.classList.add(classNames);
            });
            menuBlock.innerHTML = ` <img src="${this.bgImage}" alt="${this.bgAlt}">
            <h3 class="menu__item-subtitle">${this.title}"</h3>
            <div class="menu__item-descr">${this.text}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
                <div class="menu__item-cost">Цена:</div>
                <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>`;
            parent.append(menuBlock);
        }
    }

    
    const itemsWrapper = document.querySelector('.menu__field .container');
    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResourse)('http://localhost:3000/menu')
    .then(data => {
        data.forEach(obj => {
            new MenuItem(obj.img, obj.altimg, obj.title, obj.descr,obj.price).createMenuItem(itemsWrapper);
        });
    });
    
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



function forms(formsSelector, modalTimerId){
    const forms = document.querySelectorAll(formsSelector);
    const message = {
        loading: 'icons/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = 'display:block; margin:10px auto;';
            
            form.insertAdjacentElement('afterend', statusMessage);
            const formData = new FormData(form);
           
            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
            .then(data => {
                console.log(data);
                showThanksModal(message.success);
                statusMessage.remove();
            }).catch(() => {
                showThanksModal(message.failure);
            }).finally(() => {
                form.reset();
            });
        });
    }

    function showThanksModal(message){

        const modalPrev = document.querySelector('.modal__dialog');

        modalPrev.classList.add('hide');
        (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);

        let modalThanks = document.createElement('div');
        modalThanks.classList.add('modal__dialog');
        modalThanks.innerHTML = `
        <div class="modal__content">
            <div data-close class="modal__close">&times;</div>
            <div class="modal__title">${message}</div>
        </div>`;
        document.querySelector('.modal').append(modalThanks);
        setTimeout(() => {
                modalThanks.remove();
                modalPrev.classList.add('show');
                modalPrev.classList.remove('hide');
                (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
        }, 4000);

    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__,
/* harmony export */   "closeModal": () => /* binding */ closeModal,
/* harmony export */   "openModal": () => /* binding */ openModal
/* harmony export */ });

    function closeModal(modalSelector){
    const modal = document.querySelector(modalSelector);
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = '';
    }

    function openModal(modalSelector, modalTimerId){
        const modal = document.querySelector(modalSelector);
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
        }


function modal(modalSelector, modalTrigger,modalTimerId){
    const modal = document.querySelector(modalSelector),
    openBtns = document.querySelectorAll(modalTrigger);

   
    openBtns.forEach(item => {
    item.addEventListener('click',() => openModal(modalSelector, modalTimerId));
    });

    modal.addEventListener('click', (event) => {
    if(event.target === modal|| event.target.getAttribute('data-close') == ''){
        closeModal(modalSelector);
    }
    });

    document.addEventListener('keydown', (event) => {
    if(event.code === 'Escape' && modal.classList.contains('show')){
        closeModal(modalSelector);
    }
    });

   

    function openModalByScroll(){
    if(window.pageYOffset + document.documentElement.clientHeight >= 
        document.documentElement.scrollHeight){
        openModal(modalSelector, modalTimerId);
        window.removeEventListener('scroll', openModalByScroll);
    }
    }    
    window.addEventListener('scroll', openModalByScroll);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);




/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function tabs(tabsSelector, tabsContentSelector, tabsParentSelector,activeClass){
    const tabs = document.querySelectorAll(tabsSelector),
          tabsContent = document.querySelectorAll(tabsContentSelector),
          tabsParent = document.querySelector(tabsParentSelector);

    function hideTabContent(){
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }
    function showTabContent(i = 0){
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add(activeClass);
    }
    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click',(event) => {
        let target = event.target;
        if(target == target && target.classList.contains(tabsSelector.slice(1))) {
            tabs.forEach((item, i) => {
                if(target == item){
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => __WEBPACK_DEFAULT_EXPORT__
/* harmony export */ });
function timer(selector, deadLine) {
    function getTimeRemaining(endTime){
        let timeDiff = Date.parse(endTime) - Date.parse(new Date()),
            days = Math.floor(timeDiff / (1000 * 60 * 60 * 24)),
            hours = Math.floor((timeDiff / (1000 * 60 * 60 )) % 24),
            minutes = Math.floor((timeDiff / (1000 * 60)) % 60),
            seconds = Math.floor((timeDiff / 1000 ) % 60);

        return {
            total:timeDiff,
            days:days,
            hours:hours,
            minutes:minutes,
            seconds:seconds
        };
    }      
    function addZero(num){
        if (num >= 0 && num < 10){
            return `0${num}`;
        } else {
            return num;
        }
    } 
    
    function setClock(selector, endTime){
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);
              
              updateClock();

              function updateClock(){
                  const timeObject = getTimeRemaining(endTime);


                  days.innerHTML = addZero(timeObject.days);
                  hours.innerHTML = addZero(timeObject.hours);
                  minutes.innerHTML = addZero(timeObject.minutes);
                  seconds.innerHTML = addZero(timeObject.seconds);

                  if(timeObject.total <=0){
                      clearInterval(timeInterval);
                  }
              }
    }
    setClock(selector,deadLine);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/script.js":
/*!**********************!*
  !*** ./js/script.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");









window.addEventListener('DOMContentLoaded',() => {  
    const modalTimerId = setTimeout(() => {
        (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__.openModal)('.modal', modalTimerId);
    }, 30000);

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.default)('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active');
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__.default)('.modal', '[data-modal]', modalTimerId);
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_1__.default)();
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_3__.default)({
        parent:'.offer__slider',
        wrapper:'.offer__slider-wrapper',
        field:'.offer__slider-inner',
        slide:'.offer__slide',
        arrowPrev:'.offer__slider-prev',
        arrowNext:'.offer__slider-next',
        current:'#current',
        total:'#total'
    });
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_4__.default)('form',modalTimerId);
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_5__.default)('.timer','2020-12-31');
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_6__.default)();
});


/* mkdir webpack-demo
cd webpack-demo
npm init -y
npm install webpack webpack-cli --save-dev */

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => /* binding */ postData,
/* harmony export */   "getResourse": () => /* binding */ getResourse
/* harmony export */ });
const postData = async (url, data) => {
    const result = await fetch(url, {
        method: 'POST',
        headers:{
            'Content-type':'application/json'
        },
        body:data
    });

    return await result.json();
};

const getResourse = async (url) => {
    const result = await fetch(url);
    if (!result.ok) {
        throw new Error(`Could not fetch ${url} status:${result.status}`);
    }
    return await result.json();
}; 




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./js/script.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;
//# sourceMappingURL=bundle.js.map