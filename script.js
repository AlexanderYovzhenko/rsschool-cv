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
let active = 0;
const imagesSlider = document.querySelectorAll('.slider-image');
const buttonSlider = document.querySelectorAll('.slider-button');
const slider = document.querySelector('.wrapper__slider');
    for (const btn of buttonSlider) {
        btn.addEventListener('click', function activeSlider() {
            imagesSlider[active].classList.remove('active-img');
            if (active + 1 == imagesSlider.length) {
                active = 0;
            }
            else {
               active++; 
            } 
            imagesSlider[active].classList.add('active-img');          
            slider.classList.toggle('active-img-background');          
  });
}


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