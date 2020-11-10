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
          btns = document.querySelectorAll('[data-modal]'),
          closeBtn = document.querySelector('[data-close]');

    function openModal(){
        modal.classList.add('show');
        modal.classList.remove('hide');
        document.body.style.overflow = 'hidden';
        /* clearInterval(modalTimerId); */
    }

    btns.forEach(item => {
        item.addEventListener('click',openModal);
    });

    function closeModal(){
        modal.classList.remove('show');
        modal.classList.add('hide');
        document.body.style.overflow = '';
    }
    closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', (event) => {
        if(event.target === modal){
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
   console.log(window.pageYOffset);
   console.log(document.documentElement.clientHeight);
   console.log(document.documentElement.scrollHeight);
    
    window.addEventListener('scroll', openModalByScroll);
    
});
