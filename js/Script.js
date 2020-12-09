import tabs from './modules/tabs';
import calc from './modules/calc';
import modal from './modules/modal';
import slider from './modules/slider';
import forms from './modules/forms';
import timer from './modules/timer';
import cards from './modules/cards';
import {openModal} from './modules/modal';

window.addEventListener('DOMContentLoaded',() => {  
    const modalTimerId = setTimeout(() => {
        openModal('.modal', modalTimerId);
    }, 30000);

    tabs('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active');
    modal('.modal', '[data-modal]', modalTimerId);
    calc();
    slider({
        parent:'.offer__slider',
        wrapper:'.offer__slider-wrapper',
        field:'.offer__slider-inner',
        slide:'.offer__slide',
        arrowPrev:'.offer__slider-prev',
        arrowNext:'.offer__slider-next',
        current:'#current',
        total:'#total'
    });
    forms('form',modalTimerId);
    timer('.timer','2020-12-31');
    cards();
});


/* mkdir webpack-demo
cd webpack-demo
npm init -y
npm install webpack webpack-cli --save-dev */