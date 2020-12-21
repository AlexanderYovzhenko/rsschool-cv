/* menu */
document.addEventListener('scroll', onscroll);

function onscroll(event) {
    const curPos = window.scrollY;
    const dive = document.querySelectorAll('#all__content>div');
    const links = document.querySelectorAll('#menu a');

    dive.forEach((el) => {
        if (el.offsetTop <= curPos && (el.offsetTop + el.offsetHeight) > curPos) {
            links.forEach((a) => {
                a.classList.remove('active');
                if (el.getAttribute('id') === a.getAttribute('href').substring(1)) {
                a.classList.add('active');

                }
            })
        }
    });
}

const burger = document.querySelector('header>div');
const logo = document.querySelector('header');
logo.addEventListener('click', (event) => {
    burger.classList.toggle('burger-menu');
});

/* slider */
const bottom1 = document.querySelector('.slider-action-left');
const bottom2 = document.querySelector('.slider-action-right');
const slider = document.querySelector('.wrapper__slider');

bottom1.addEventListener('click', (event) => {
     slider.classList.toggle('slider-action');  
});

bottom2.addEventListener('click', (event) => {
     slider.classList.toggle('slider-action');  
});

/* Portfolio */

const buttonOne = document.querySelector('.button__portfolio-1');
const buttonTwo = document.querySelector('.button__portfolio-2');
const buttonThree = document.querySelector('.button__portfolio-3');
const buttonFour = document.querySelector('.button__portfolio-4');
const menu = document.querySelector('.portfolio_image');

buttonOne.addEventListener('click', (event) => {
        for (let i = menu.children.length; i >= 0; i--) {
        menu.appendChild(menu.children[Math.random() * i | 0]);

            buttonOne.classList.toggle('active-2');
            buttonTwo.classList.remove('active-2');
            buttonThree.classList.remove('active-2');
            buttonFour.classList.remove('active-2');
}
})
buttonTwo.addEventListener('click', (event) => {
    for (let i = menu.children.length; i >= 0; i--) {
    menu.appendChild(menu.children[Math.random() * i | 0]);

             buttonOne.classList.remove('active-2');
             buttonTwo.classList.toggle('active-2');
             buttonThree.classList.remove('active-2');
             buttonFour.classList.remove('active-2');
}
})
buttonThree.addEventListener('click', (event) => {
    for (let i = menu.children.length; i >= 0; i--) {
    menu.appendChild(menu.children[Math.random() * i | 0]);

            buttonOne.classList.remove('active-2');
            buttonTwo.classList.remove('active-2');
            buttonThree.classList.toggle('active-2');
            buttonFour.classList.remove('active-2');
}
})
buttonFour.addEventListener('click', (event) => {
    for (let i = menu.children.length; i >= 0; i--) {
    menu.appendChild(menu.children[Math.random() * i | 0]);

            buttonOne.classList.remove('active-2');
            buttonTwo.classList.remove('active-2');
            buttonThree.classList.remove('active-2');
            buttonFour.classList.toggle('active-2');
}
})
