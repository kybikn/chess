// --------------------- grid slider---------------------------------
const slider = document.querySelector(".table-grid__wrapper");
const btnGridPrev = document.querySelector(".slider-grid__btn_left");
const btnGridNext = document.querySelector(".slider-grid__btn_right");
const dotsGrid = document.querySelectorAll(".slider-grid__dot");

let offset = 0; /* смещение от левого края */

function nextGridSlide() {
    offset = offset + 335;
    if (offset > 1340) {
        offset = 0; // возвращение на нулевую позицию
    }
    slider.style.left = -offset + 'px';
}

function prevGridSlide() {
    offset = offset - 335;
    if (offset < 0) {
        offset = 1340;
    }
    slider.style.left = -offset + 'px';
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
    if (width <= 680) {
        cardsOnScreen = 1
    } else if (width <= 1024) {
        cardsOnScreen = 2
    }
    else {
        cardsOnScreen = 3
    };
}

// отображение карточек
function activeSlide(n) {
    for (let slide of slides) {
        slide.classList.remove("active");
    }
    slides[n].classList.add("active");
    if ((cardsOnScreen > 1) && ((n + 1) < slides.length)) {
        slides[n + 1].classList.add("active");
    }
    if ((cardsOnScreen > 2) && ((n + 2) < slides.length)) {
        slides[n + 2].classList.add("active");
    }
}

// отображение точек
function activeDot(n) {
    for (let dot of dots) {
        dot.classList.remove("active");
    }
    dots[n].classList.add("active");
}

// отображение страниц
function activePage(n) {
    page = Math.ceil((n + 1) / cardsOnScreen);
    currentPage.innerText = (page);
    const totalPagesNum = Math.ceil((slides.length) / cardsOnScreen);
    totalPages.innerText = totalPagesNum
}

// обновляет ситуацию на экране
function currentSlide(n) {
    activeSlide(n);
    activeDot(n);
    activePage(n);
}

// при загрузке
function onLoad() {
    updateCardsOnScreen();
    currentSlide(0);
}

// при изменении размера окна
function onResize() {
    updateCardsOnScreen();
    currentSlide(index);
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

btnNext.addEventListener("click", nextSlide);
btnPrev.addEventListener("click", prevSlide);


window.addEventListener("load", onLoad);
window.addEventListener("resize", onResize)