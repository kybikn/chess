const CARDS_AMOUNT = 5;
const SLIDE_WIDTH = 335;

const SMALL_SCREEN = 680;
const LARGE_SCREEN = 1024;

// --------------------- grid slider---------------------------------
const slider = document.querySelector(".table-grid__wrapper");
const btnGridPrev = document.querySelector(".slider-grid__btn_left");
const btnGridNext = document.querySelector(".slider-grid__btn_right");
const dotsGrid = document.querySelectorAll(".slider-grid__dot");


const maxDotIndex = CARDS_AMOUNT - 1;
const maxOffset = maxDotIndex * SLIDE_WIDTH;

let offset = 0;
let dotIndex = 0;

function updateDots(index) {
    for (let dot of dotsGrid) {
        dot.classList.remove('active-dot');
    }
    dotsGrid[index].classList.add('active-dot')
}

function updateBtns(index) {
    if (index == 0) {
        btnGridPrev.classList.remove('active-btn');
        btnGridPrev.disabled = true;
    } else {
        btnGridPrev.classList.add('active-btn')
        btnGridPrev.disabled = false;
    }
    if (index == maxDotIndex) {
        btnGridNext.classList.remove('active-btn');
        btnGridNext.disabled = true;
    } else {
        btnGridNext.classList.add('active-btn')
        btnGridNext.disabled = false;
    }
}

function startGridSlides() {
    slider.style.left = -offset + 'px';
    updateDots(dotIndex);
    updateBtns(dotIndex);
}

function nextGridSlide() {
    offset = offset + SLIDE_WIDTH;
    dotIndex++;
    slider.style.left = -offset + 'px';
    updateDots(dotIndex);
    updateBtns(dotIndex);
}

function prevGridSlide() {
    offset = offset - SLIDE_WIDTH;
    dotIndex--;
    slider.style.left = -offset + 'px';
    updateDots(dotIndex);
    updateBtns(dotIndex);
}

btnGridNext.addEventListener("click", nextGridSlide);
btnGridPrev.addEventListener("click", prevGridSlide);


// ---------------------slider---------------------------------
const btnPrev = document.querySelector(".slider__btn_left");
const btnNext = document.querySelector(".slider__btn_right");

const slides = document.querySelectorAll(".cards__item");
const dots = document.querySelectorAll(".slider__dot");

const currentPage = document.querySelector(".slider__page.first");
const totalPages = document.querySelector(".slider__page.second");
totalPages.textContent = `${slides.length}`;

let index = 0;
let page = 1;

// количество одновременных карточек на экране
let cardsOnScreen = 3;

function updateCardsOnScreen() {
    let width = window.innerWidth;
    if (width <= SMALL_SCREEN) {
        cardsOnScreen = 1
    } else if (width <= LARGE_SCREEN) {
        cardsOnScreen = 2
    }
    else {
        cardsOnScreen = 3
    };
}

// отображение карточек
function activeSlide(n) {
    for (let slide of slides) {
        slide.classList.remove("active-item");
    }
    slides[n].classList.add("active-item");
    if ((cardsOnScreen > 1) && ((n + 1) < slides.length)) {
        slides[n + 1].classList.add("active-item");
    }
    if ((cardsOnScreen > 2) && ((n + 2) < slides.length)) {
        slides[n + 2].classList.add("active-item");
    }
}

// отображение страниц
function activePage(n) {
    page = Math.ceil((n + 1) / cardsOnScreen);
    currentPage.innerText = (page);
    currentPage.classList.add("active-btn");
    const totalPagesNum = Math.ceil((slides.length) / cardsOnScreen);
    totalPages.innerText = totalPagesNum
}

// обновляет ситуацию на экране
function currentSlide(n) {
    activeSlide(n);
    activePage(n);
}

// следующий слайд
function nextSlide() {
    index = index + cardsOnScreen;
    if (index >= slides.length) {
        index = 0;
        currentSlide(index);
    } else {
        currentSlide(index);
    }
}

// предыдущий слайд
function prevSlide() {
    index = index - cardsOnScreen;
    if (index < 0) {
        index = (Math.ceil((slides.length) / cardsOnScreen) - 1) * cardsOnScreen;
        currentSlide(index);
    } else {
        currentSlide(index);
    }
}

dots.forEach((item, indexDot) => {
    item.addEventListener("click", () => {
        index = indexDot;
        currentSlide(index);
    });
});

// при загрузке
function onLoad() {
    updateCardsOnScreen();
    currentSlide(0);
    setInterval(nextSlide, 4000);
    startGridSlides();
}

// при изменении размера окна
function onResize() {
    updateCardsOnScreen();
    currentSlide(index);
}

btnNext.addEventListener("click", nextSlide);
btnPrev.addEventListener("click", prevSlide);

document.addEventListener("DOMContentLoaded", onLoad);
window.addEventListener("resize", onResize)
