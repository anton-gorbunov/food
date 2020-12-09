
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

export default modal;
export {closeModal};
export {openModal};
