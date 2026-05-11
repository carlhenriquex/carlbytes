const slides = document.querySelector(".slides");
const slide = document.querySelectorAll(".slide");

const prev = document.querySelector(".prev");
const next = document.querySelector(".next");

let index = 0;

function updateCarousel() {
    slides.style.transform = `translateX(-${index * 100}%)`;
}

function nextSlide() {

    index++;

    if(index >= slide.length) {
        index = 0;
    }

    updateCarousel();
}

function prevSlide() {

    index--;

    if(index < 0) {
        index = slide.length - 1;
    }

    updateCarousel();
}

next.addEventListener("click", nextSlide);

prev.addEventListener("click", prevSlide);


/* AUTO PLAY */
setInterval(() => {
    nextSlide();
}, 5000);