let header = document.querySelector('.main-header');
let navMain = document.querySelector('.main-header__nav');
let navBurger = document.querySelector('.main-header__burger');
let map = document.querySelector('.map');

header.classList.remove('main-header--nojs');
navMain.classList.remove('main-header__nav--nojs');
map.classList.remove('map--no-js');

navBurger.addEventListener('click', function () {
  if (navMain.classList.contains('main-header__nav--closed')) {
    navMain.classList.remove('main-header__nav--closed');
    navMain.classList.add('main-header__nav--opened');
  } else {
    navMain.classList.add('main-header__nav--closed');
    navMain.classList.remove('main-header__nav--opened');
  }
})
