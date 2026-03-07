const banner = document.querySelector(".tech-banner");
const frames = document.querySelectorAll(".frame-carrossel");
const barras = document.querySelectorAll(".barra");
const progressos = document.querySelectorAll(".progresso-bar");

let index = 0;
let duration = 4200;

let start = null;
let pauseStart = null;
let pausedTime = 0;
let paused = false;

function animate(time){

    if(!start) start = time;

    // se estiver pausado
    if(paused){
        if(!pauseStart) pauseStart = time;
        requestAnimationFrame(animate);
        return;
    }

    // saiu da pausa
    if(pauseStart){
        pausedTime += time - pauseStart;
        pauseStart = null;
    }

    const elapsed = time - start - pausedTime;
    const percent = Math.min((elapsed / duration) * 100,100);

    progressos[index].style.width = percent + "%";

    if(elapsed >= duration){

        frames[index].classList.remove("active");
        barras[index].classList.remove("active");
        progressos[index].style.width = "0%";

        index++;
        if(index >= frames.length) index = 0;

        frames[index].classList.add("active");
        barras[index].classList.add("active");

        start = null;
        pausedTime = 0;
    }

    requestAnimationFrame(animate);
}

banner.addEventListener("mouseenter", () => paused = true);
banner.addEventListener("mouseleave", () => paused = false);

requestAnimationFrame(animate);