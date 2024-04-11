const btnPrev = document.querySelector(".slider_arrow-left");
const btnNext = document.querySelector(".slider_arrow-right");

const slides = document.querySelectorAll(".cards_item");
const dots = document.querySelectorAll(".slider-square");

const currentPage = document.querySelector(".page-number.first");
const totalPages = document.querySelector(".page-number.second");
totalPages.textContent = `${slides.length}`;

let index = 0;

function activeSlide(n) {
    for (slide of slides) {
        slide.classList.remove("active");
    }
    slides[n].classList.add("active");
}

function activeDot(n) {
    for (dot of dots) {
        dot.classList.remove("active");
    }
    dots[n].classList.add("active");
}

function currentSlide(n) {
    activeSlide(n);
    activeDot(n);
    currentPage.innerText = (index + 1);
}

function nextSlide() {
    if (index == slides.length - 1) {
        index = 0;
        currentSlide(index);
    } else {
        index++;
        currentSlide(index);
    }
}

function prevSlide() {
    if (index == 0) {
        index = slides.length - 1;
        currentSlide(index);
    } else {
        index--;
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

window.addEventListener("load");