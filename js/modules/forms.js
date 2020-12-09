import  {closeModal, openModal} from './modal';
import {postData} from '../services/services';

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

            postData('http://localhost:3000/requests', json)
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
        openModal('.modal', modalTimerId);

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
                closeModal('.modal');
        }, 4000);

    }
}

export default forms;