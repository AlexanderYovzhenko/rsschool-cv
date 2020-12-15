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
const image1 = document.querySelector('#link-slider-1');
const image2 = document.querySelector('#link-slider-2');
const slider = document.querySelector('#slider');

image1.addEventListener('click', (event) => {
     slider.classList.toggle('slider-1');  
});

image2.addEventListener('click', (event) => {
     slider.classList.toggle('slider-1');  
});


/* portfolio */
const portfolio = document.querySelectorAll('.portfolio-image>div img');
let arr = [portfolio[0], portfolio[1], portfolio[2], portfolio[3], portfolio[4], portfolio[5], portfolio[6], 
portfolio[7], portfolio[8], portfolio[9], portfolio[10], portfolio[11]];

const buttonOne = document.querySelector('.link-portfolio-1');
const buttonTwo = document.querySelector('.link-portfolio-2');
const buttonThree = document.querySelector('.link-portfolio-3');
const buttonFour = document.querySelector('.link-portfolio-4');

buttonOne.addEventListener('click', (event) => {
    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
      }
      shuffle(arr);
      alert(arr);
      buttonOne.classList.toggle('active-2');
      buttonTwo.classList.remove('active-2');
      buttonThree.classList.remove('active-2');
      buttonFour.classList.remove('active-2');

let arr_src = arr[1].getAttribute('src');
let arr_src_1 = arr[2].getAttribute('src');
let arr_src_2 = arr[3].getAttribute('src');
let arr_src_3 = arr[4].getAttribute('src');
let arr_src_4 = arr[5].getAttribute('src');
let arr_src_5 = arr[6].getAttribute('src');
let arr_src_6 = arr[7].getAttribute('src');
let arr_src_7 = arr[8].getAttribute('src');
let arr_src_8 = arr[9].getAttribute('src');
let arr_src_9 = arr[10].getAttribute('src');
let arr_src_10 = arr[11].getAttribute('src');
let arr_src_11 = arr[0].getAttribute('src');

arr[0].setAttribute('src', arr_src);
arr[1].setAttribute('src', arr_src_1);
arr[2].setAttribute('src', arr_src_2);
arr[3].setAttribute('src', arr_src_3);
arr[4].setAttribute('src', arr_src_4);
arr[5].setAttribute('src', arr_src_5);
arr[6].setAttribute('src', arr_src_6);
arr[7].setAttribute('src', arr_src_7);
arr[8].setAttribute('src', arr_src_8);
arr[9].setAttribute('src', arr_src_9);
arr[10].setAttribute('src', arr_src_10);
arr[11].setAttribute('src', arr_src_11);
});

buttonTwo.addEventListener('click', (event) => {
    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
      }
      shuffle(arr);
      alert(arr);
      buttonTwo.classList.toggle('active-2');
      buttonOne.classList.remove('active-2');
      buttonThree.classList.remove('active-2');
      buttonFour.classList.remove('active-2');

let arr_src = arr[1].getAttribute('src');
let arr_src_1 = arr[2].getAttribute('src');
let arr_src_2 = arr[3].getAttribute('src');
let arr_src_3 = arr[4].getAttribute('src');
let arr_src_4 = arr[5].getAttribute('src');
let arr_src_5 = arr[6].getAttribute('src');
let arr_src_6 = arr[7].getAttribute('src');
let arr_src_7 = arr[8].getAttribute('src');
let arr_src_8 = arr[9].getAttribute('src');
let arr_src_9 = arr[10].getAttribute('src');
let arr_src_10 = arr[11].getAttribute('src');
let arr_src_11 = arr[0].getAttribute('src');

arr[0].setAttribute('src', arr_src);
arr[1].setAttribute('src', arr_src_1);
arr[2].setAttribute('src', arr_src_2);
arr[3].setAttribute('src', arr_src_3);
arr[4].setAttribute('src', arr_src_4);
arr[5].setAttribute('src', arr_src_5);
arr[6].setAttribute('src', arr_src_6);
arr[7].setAttribute('src', arr_src_7);
arr[8].setAttribute('src', arr_src_8);
arr[9].setAttribute('src', arr_src_9);
arr[10].setAttribute('src', arr_src_10);
arr[11].setAttribute('src', arr_src_11);
});

buttonThree.addEventListener('click', (event) => {
    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
      }
      shuffle(arr);
      alert(arr);
      buttonThree.classList.toggle('active-2');
      buttonOne.classList.remove('active-2');
      buttonTwo.classList.remove('active-2');
      buttonFour.classList.remove('active-2');

let arr_src = arr[1].getAttribute('src');
let arr_src_1 = arr[2].getAttribute('src');
let arr_src_2 = arr[3].getAttribute('src');
let arr_src_3 = arr[4].getAttribute('src');
let arr_src_4 = arr[5].getAttribute('src');
let arr_src_5 = arr[6].getAttribute('src');
let arr_src_6 = arr[7].getAttribute('src');
let arr_src_7 = arr[8].getAttribute('src');
let arr_src_8 = arr[9].getAttribute('src');
let arr_src_9 = arr[10].getAttribute('src');
let arr_src_10 = arr[11].getAttribute('src');
let arr_src_11 = arr[0].getAttribute('src');

arr[0].setAttribute('src', arr_src);
arr[1].setAttribute('src', arr_src_1);
arr[2].setAttribute('src', arr_src_2);
arr[3].setAttribute('src', arr_src_3);
arr[4].setAttribute('src', arr_src_4);
arr[5].setAttribute('src', arr_src_5);
arr[6].setAttribute('src', arr_src_6);
arr[7].setAttribute('src', arr_src_7);
arr[8].setAttribute('src', arr_src_8);
arr[9].setAttribute('src', arr_src_9);
arr[10].setAttribute('src', arr_src_10);
arr[11].setAttribute('src', arr_src_11);
});

buttonFour.addEventListener('click', (event) => {
    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
      }
      shuffle(arr);
      alert(arr);
      buttonFour.classList.toggle('active-2');
      buttonOne.classList.remove('active-2');
      buttonTwo.classList.remove('active-2');
      buttonThree.classList.remove('active-2');
      
let arr_src = arr[1].getAttribute('src');
let arr_src_1 = arr[2].getAttribute('src');
let arr_src_2 = arr[3].getAttribute('src');
let arr_src_3 = arr[4].getAttribute('src');
let arr_src_4 = arr[5].getAttribute('src');
let arr_src_5 = arr[6].getAttribute('src');
let arr_src_6 = arr[7].getAttribute('src');
let arr_src_7 = arr[8].getAttribute('src');
let arr_src_8 = arr[9].getAttribute('src');
let arr_src_9 = arr[10].getAttribute('src');
let arr_src_10 = arr[11].getAttribute('src');
let arr_src_11 = arr[0].getAttribute('src');

arr[0].setAttribute('src', arr_src);
arr[1].setAttribute('src', arr_src_1);
arr[2].setAttribute('src', arr_src_2);
arr[3].setAttribute('src', arr_src_3);
arr[4].setAttribute('src', arr_src_4);
arr[5].setAttribute('src', arr_src_5);
arr[6].setAttribute('src', arr_src_6);
arr[7].setAttribute('src', arr_src_7);
arr[8].setAttribute('src', arr_src_8);
arr[9].setAttribute('src', arr_src_9);
arr[10].setAttribute('src', arr_src_10);
arr[11].setAttribute('src', arr_src_11);
});