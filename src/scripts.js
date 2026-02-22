(() => {
  const overlay = document.getElementById("pfCertificadosOverlay");
  const viewerBody = document.getElementById("pfCertificadosViewerCorpo");
  const viewerTitle = document.getElementById("pfCertificadosViewerTitulo");
  const viewerSubtitle = document.getElementById("pfCertificadosViewerSubtitulo");
  const viewerClose = document.getElementById("pfCertificadosViewerFechar");
  const viewerDownload = document.getElementById("pfCertificadosViewerDownload");

  const grid = document.getElementById("pfCertificadosGrade");
  const filterButtons = document.querySelectorAll(".pf-certificados__filtro");

  function openViewer({ title, subtitle, mediaSrc, kind, downloadSrc }) {
    viewerTitle.textContent = title || "Certificado";
    viewerSubtitle.textContent = subtitle || "";
    viewerDownload.href = downloadSrc || mediaSrc || "#";

    viewerBody.innerHTML = "";

    if (kind === "pdf") {
      const iframe = document.createElement("iframe");
      iframe.className = "pf-certificados__midia-pdf";
      iframe.src = mediaSrc;
      iframe.title = `Visualização: ${title}`;
      viewerBody.appendChild(iframe);
    } else {
      const img = document.createElement("img");
      img.className = "pf-certificados__midia-img";
      img.src = mediaSrc;
      img.alt = `Certificado: ${title}`;
      img.loading = "eager";
      viewerBody.appendChild(img);
    }

    overlay.classList.add("pf-certificados__overlay--aberto");
    overlay.setAttribute("aria-hidden", "false");

    // Foco para acessibilidade
    viewerClose.focus();
    document.body.style.overflow = "hidden";
  }

  function closeViewer() {
    overlay.classList.remove("pf-certificados__overlay--aberto");
    overlay.setAttribute("aria-hidden", "true");
    viewerBody.innerHTML = "";
    document.body.style.overflow = "";
  }

  // Abre ao clicar em um certificado
  grid.addEventListener("click", (ev) => {
    const btn = ev.target.closest(".pf-certificados__abrir");
    if (!btn) return;

    const payload = {
      title: btn.dataset.certTitle,
      subtitle: btn.dataset.certSubtitle,
      mediaSrc: btn.dataset.certMedia,
      kind: btn.dataset.certKind, // "image" | "pdf"
      downloadSrc: btn.dataset.certDownload
    };

    openViewer(payload);
  });

  // Fechar: botão, clique fora, ESC
  viewerClose.addEventListener("click", closeViewer);

  overlay.addEventListener("click", (ev) => {
    // fecha se clicar no fundo (fora do viewer)
    const clickedViewer = ev.target.closest(".pf-certificados__viewer");
    if (!clickedViewer) closeViewer();
  });

  window.addEventListener("keydown", (ev) => {
    if (ev.key === "Escape" && overlay.classList.contains("pf-certificados__overlay--aberto")) {
      closeViewer();
    }
  });

  // Filtros (simples)
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach(b => b.classList.remove("pf-certificados__filtro--ativo"));
      btn.classList.add("pf-certificados__filtro--ativo");

      const mode = btn.dataset.filter;

      document.querySelectorAll(".pf-certificados__item").forEach((item) => {
        const tags = (item.getAttribute("data-tags") || "").split(" ").filter(Boolean);

        const show = (mode === "todos") || tags.includes(mode);
        item.style.display = show ? "" : "none";
      });
    });
  });
})();
