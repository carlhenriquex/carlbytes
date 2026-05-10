function menuShow() {
    const menuMobile = document.querySelector(".mobile-menu");
    menuMobile.classList.toggle("open");

    if (menuMobile.classList.contains("open")) {
        const menuItems = menuMobile.querySelectorAll(".nav-mobile");
        menuItems.forEach(item => {
            item.addEventListener("click", () => {
                menuMobile.classList.remove("open");
            });
        });
    }
}