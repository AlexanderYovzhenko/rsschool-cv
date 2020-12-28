/* menu */
document.addEventListener('scroll', onscroll);

function onscroll(event) {
    const curPos = window.scrollY;
    const dive = document.querySelectorAll('.wrapper');
    const links = document.querySelectorAll('.link__page');

    dive.forEach((el) => {
        if (el.offsetTop <= curPos && (el.offsetTop + el.offsetHeight) > curPos) {
            links.forEach((link) => {
                link.classList.remove('active');
                if (el.getAttribute('id') === link.getAttribute('href').substring(1)) {
                link.classList.add('active');
                }
            });
        }
    });
}


/* menu-burger */
const burger = document.querySelector('.burger-menu');
const menuOpen = document.querySelector('.header__burger');
const menuClose = document.querySelector('.header__burger__open');
const linkMenuBurger = document.querySelectorAll('.link__page');
const body = document.querySelector('.body');

menuOpen.addEventListener('click', (event) => {
    burger.classList.add('burger-menu-open');
    body.classList.add('body-lock');
});

menuClose.addEventListener('click', () => {
    burger.classList.remove('burger-menu-open');
    body.classList.remove('body-lock');
});

linkMenuBurger.forEach(link => {
    link.addEventListener('click', () => {
    burger.classList.remove('burger-menu-open');
    body.classList.remove('body-lock');
    });
});


/* slider */
$(document).ready(function(){
    $('.slider').slick();
    $('.slider').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        console.log(nextSlide);
        const wrapperSlider = document.querySelector('.wrapper__slider');
         if(nextSlide === 0) {
             wrapperSlider.classList.remove('active-background');
         } else {
             wrapperSlider.classList.add('active-background');
         }
    });
});


/* Portfolio */
window.onload = function() {

    addButtonsClickHandler();
}

const addButtonsClickHandler = () => {
    document.querySelector('.menu-portfolio').addEventListener('click', (e) => {
        if (e.target.classList.contains('button__portfolio')) {
            let clickedButton = e.target;
            removeSelectedButtons();
            selectClickedButtons(clickedButton);
            if (clickedButton.innerText === 'All') {
                showAllDesign();
            } else {
                filterDesignBySelectedButton(clickedButton.innerText);
            }
        }
    })
}

const removeSelectedButtons = () => {
    let buttons = document.querySelectorAll('.menu-portfolio .button__portfolio');
    buttons.forEach(button__portfolio => {
        button__portfolio.classList.remove('active-2');
    })
}

const selectClickedButtons = (clickedButton) => {
    clickedButton.classList.add('active-2');
}

const showAllDesign = () => {
    let designs = document.querySelectorAll('.portfolio-images .portfolio__item');
    designs.forEach(design=> {
        design.classList.remove('portfolio-image-hidden');
    })
}

const filterDesignBySelectedButton = (selectedButton) => {
    let designs = document.querySelectorAll('.portfolio-images .portfolio__item');
    designs.forEach(design => {
        design.classList.add('portfolio-image-hidden');    
        if (selectedButton === design.getAttribute('data-tag')) {
            design.classList.remove('portfolio-image-hidden');
        }
    })
}