const modalCertificado = document.getElementById("modal-certificado");
const modalImagem = document.getElementById("modal-certificado-imagem");
const botaoFechar = document.querySelector(".modal-certificado-fechar");
const overlay = document.querySelector(".modal-certificado-overlay");

const imagensCertificados = document.querySelectorAll(".certificado-imagem");

function abrirCertificado(caminho, titulo) {
    modalImagem.src = caminho;
    modalImagem.alt = titulo;

    modalCertificado.classList.add("ativo");
    modalCertificado.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";
}

function fecharCertificado() {
    modalCertificado.classList.remove("ativo");
    modalCertificado.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    modalImagem.src = "";
}

imagensCertificados.forEach((botao) => {
    botao.addEventListener("click", () => {
        const caminho = botao.dataset.certificado;
        const imagem = botao.querySelector("img");

        abrirCertificado(caminho, imagem.alt);
    });
});

botaoFechar.addEventListener("click", fecharCertificado);
overlay.addEventListener("click", fecharCertificado);

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        fecharCertificado();
    }
});