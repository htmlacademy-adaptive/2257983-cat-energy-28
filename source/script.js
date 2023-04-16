let header = document.querySelector('.main-header');
let navMain = document.querySelector('.main-header__nav');
let navBurger = document.querySelector('.main-header__burger');

header.classList.remove('main-header--nojs');
navMain.classList.remove('main-nav--nojs');

navBurger.addEventListener('click', function () {
  if (navMain.classList.contains('main-nav--closed')) {
    navMain.classList.remove('main-nav--closed');
    navMain.classList.add('main-nav--opened');
  } else {
    navMain.classList.add('main-nav--closed');
    navMain.classList.remove('main-nav--opened');
  }
})
