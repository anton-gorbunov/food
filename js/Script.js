document.addEventListener('DOMContentLoaded',() => {
    //Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabsParent = document.querySelector('.tabheader__items');

    function hideTabContent(){
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }
    function showTabContent(i = 0){
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }
    hideTabContent();
    showTabContent();

    tabsParent.addEventListener('click',(event) => {
        let target = event.target;
        if(target == target && target.classList.contains('tabheader__item')){
            tabs.forEach((item, i) => {
                if(target == item){
                    hideTabContent();
                    showTabContent(i);
                }
            });
        }
    });
    //Timer
    const deadLine = '2020-11-24';

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
              seconds = timer.querySelector('#seconds');
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
    setClock('.timer',deadLine);

    // modal
    const modal = document.querySelector('.modal'),
          openBtns = document.querySelectorAll('[data-modal]');
    
    openBtns.forEach(item => {
        item.addEventListener('click', openModal);
    });

    function openModal(){
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        /* clearInterval(modalTimerId); */
    }
    function closeModal(){
        modal.classList.remove('show');
        modal.classList.add('hide');
        document.body.style.overflow = '';
    }


    modal.addEventListener('click', (event) => {
        if(event.target === modal|| event.target.getAttribute('data-close') == ''){
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if(event.code === 'Escape' && modal.classList.contains('show')){
            closeModal();
        }
    });

   /*  const modalTimerId = setTimeout(openModal, 2000); */

   function openModalByScroll(){
        if(window.pageYOffset + document.documentElement.clientHeight >= 
            document.documentElement.scrollHeight){
            openModal();
            window.removeEventListener('scroll', openModalByScroll);
        }
   }    
    window.addEventListener('scroll', openModalByScroll);

    //card
    class MenuItem {
        constructor (bgImage,bgAlt,title,text,price, ...classes) {
            this.bgImage = bgImage;
            this.bgAlt = bgAlt;
            this.title = title;
            this.text = text;
            this.price = price;
            this.classes = classes;
            
        }
        createMenuItem(parent){
            let menuBlock = document.createElement('div');
            if(this.classes.length === 0){
                menuBlock.classList.add('menu__item');
            }
            this.classes.forEach(classNames => {
                menuBlock.classList.add(classNames);
            });
            menuBlock.innerHTML = ` <img src="img/tabs/${this.bgImage}" alt="${this.bgAlt}">
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
    const menuItem1 = new MenuItem('vegy.jpg','vegy','Меню "Фитнес"',
                                   'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
                                   '229',
                                   'menu__item');
    const menuItem2 = new MenuItem('elite.jpg','elite','Меню “Премиум”',
                                   'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
                                   '550',
                                   'menu__item');
    const menuItem3 = new MenuItem('post.jpg','post','Меню "Постное"',
                                   'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
                                   '430',
                                   'menu__item');
    menuItem1.createMenuItem(itemsWrapper); 
    menuItem2.createMenuItem(itemsWrapper);    
    menuItem3.createMenuItem(itemsWrapper);                                                 
    

    //forms

    const forms = document.querySelectorAll('form');
    const message = {
        loading: 'icons/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        postData(item);
    });

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            let statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = 'display:block; margin:10px auto;';
            
            form.insertAdjacentElement('afterend', statusMessage);
            const formData = new FormData(form);
            const object = {};
            formData.forEach(function(value, key){
                object[key] = value;
            });

            fetch('server.php', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body:JSON.stringify(object)
            })
            .then(data => data.text())
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
                closeModal();
        }, 4000);

    }

});
