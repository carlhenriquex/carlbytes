function applyDragScroll(element) {
    let isDown = false;
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;
    const dragThreshold = 6;

    function onMouseMove(e) {
        if (!isDown) return;

        const delta = e.pageX - startX;

        if (Math.abs(delta) > dragThreshold) {
            isDragging = true;
        }

        // só previne quando realmente virou drag
        if (isDragging) {
            e.preventDefault();
        }

        element.scrollLeft = scrollLeft - delta * 1.2;
    }

    function stopDrag() {
        if (!isDown) return;

        isDown = false;
        element.style.cursor = 'grab';

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', stopDrag);
    }

    element.addEventListener('mousedown', (e) => {
        isDown = true;
        isDragging = false;

        startX = e.pageX;
        scrollLeft = element.scrollLeft;

        element.style.cursor = 'grabbing';

        // eventos no document = resolve bug de soltar fora
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', stopDrag);
    });

    element.addEventListener('mouseleave', () => {
        // não força parar aqui — deixa o document controlar
        element.style.cursor = isDown ? 'grabbing' : 'grab';
    });

    // bloqueio de clique
    element.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', (e) => {
            if (isDragging) {
                e.preventDefault();
                e.stopPropagation();
            }
        });
    });

    element.style.cursor = 'grab';
}

applyDragScroll(document.querySelector('.carousel-projetos'));
applyDragScroll(document.querySelector('.timeline-carousel'));
applyDragScroll(document.querySelector('.carrossel-sobremim'));