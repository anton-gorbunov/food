import {getResourse} from '../services/services';

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
    getResourse('http://localhost:3000/menu')
    .then(data => {
        data.forEach(obj => {
            new MenuItem(obj.img, obj.altimg, obj.title, obj.descr,obj.price).createMenuItem(itemsWrapper);
        });
    });
    
}

export default cards;