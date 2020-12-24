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
window.onload = function() {

    addButtonsClickHandler();
}

const addButtonsClickHandler = () => {
    document.querySelector('.menu_portfolio').addEventListener('click', (e) => {
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
    let buttons = document.querySelectorAll('.menu_portfolio .button__portfolio');
    buttons.forEach(button__portfolio => {
        button__portfolio.classList.remove('active-2');
    })
}

const selectClickedButtons = (clickedButton) => {
    clickedButton.classList.add('active-2');
}

const showAllDesign = () => {
    let designs = document.querySelectorAll('.portfolio_image .portfolio__image');
    designs.forEach(portfolio__image => {
        portfolio__image.classList.remove('portfolio_image_hidden');
    })
}
 
const filterDesignBySelectedButton = (selectedButton) => {
    let designs = document.querySelectorAll('.portfolio_image .portfolio__image');
    designs.forEach(design => {
        design.classList.add('portfolio_image_hidden');
        design.querySelectorAll('.tag').forEach(tag => {    
            if (selectedButton === tag.innerText) {
                design.classList.remove('portfolio_image_hidden');
            }
        })
    })
}