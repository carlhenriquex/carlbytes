const wrapper = document.querySelector('.timeline-wrapper');
const carousel = wrapper.querySelector('.timeline-carousel');

function updateFade() {
const scrollLeft = carousel.scrollLeft;
const maxScroll = carousel.scrollWidth - carousel.clientWidth;

wrapper.classList.toggle('show-left', scrollLeft > 5);
wrapper.classList.toggle('show-right', scrollLeft < maxScroll - 5);
}

// eventos
carousel.addEventListener('scroll', updateFade);
window.addEventListener('resize', updateFade);

// inicial
updateFade();