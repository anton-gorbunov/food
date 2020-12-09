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

export default calc;