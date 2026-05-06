var sections = document.querySelectorAll("section");
var navLinks = document.querySelectorAll(".nav-link");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.id;

      navLinks.forEach(link => {
        link.classList.remove("active");

        if (link.getAttribute("href") === `#${id}`) {
          link.classList.add("active");
        }
      });
    }
  });
}, {
  threshold: 0.8,
  rootMargin: "-50px 0px -50px 0px"
});

sections.forEach(section => observer.observe(section));