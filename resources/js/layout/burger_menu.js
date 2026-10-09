const burgerMenu = document.querySelector(".burger_menu__main");
const burgerMenuBg = document.querySelector(".burger_menu__bg");
const burgerOpenBtns = document.querySelectorAll(".header__burger_btn");
const burgerCloseBtn = document.querySelector(".burger_menu_close");

const MENU_OPEN_CLASS = "activ";
const BTN_OPEN_CLASS = "header__burger_btn_open";
const ANIMATION_DELAY = 100;

// Проверка: открыто ли меню
function isMenuOpen() {
    return burgerMenu?.classList.contains(MENU_OPEN_CLASS);
}

// Открытие меню
function openBurgerMenu() {
    if (!burgerMenu || !burgerMenuBg) return;

    burgerMenu.style.display = "grid";
    burgerMenuBg.style.display = "block";

    setTimeout(() => {
        burgerMenu.classList.add(MENU_OPEN_CLASS);
        burgerMenuBg.classList.add(MENU_OPEN_CLASS);
        burgerOpenBtns.forEach(btn => btn.classList.add(BTN_OPEN_CLASS));
    }, ANIMATION_DELAY);
}

// Закрытие меню
function closeBurgerMenu() {
    if (!burgerMenu || !burgerMenuBg) return;

    burgerMenu.classList.remove(MENU_OPEN_CLASS);
    burgerMenuBg.classList.remove(MENU_OPEN_CLASS);
    burgerOpenBtns.forEach(btn => btn.classList.remove(BTN_OPEN_CLASS));

    setTimeout(() => {
        burgerMenu.style.display = "none";
        burgerMenuBg.style.display = "none";
    }, ANIMATION_DELAY);
}

// Toggle: клик по кнопкам-бургерам
burgerOpenBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        if (isMenuOpen()) {
            closeBurgerMenu();
        } else {
            openBurgerMenu();
        }
    });
});

// Закрытие по кнопке "крестик"
if (burgerCloseBtn) {
    burgerCloseBtn.addEventListener("click", closeBurgerMenu);
}

// Закрытие по клику на фон (бонус)
if (burgerMenuBg) {
    burgerMenuBg.addEventListener("click", closeBurgerMenu);
}

// 

const subTargets = document.querySelectorAll(".burger_menu__item_sub_target");

subTargets.forEach(target => {
    target.addEventListener("click", () => {
        target.classList.toggle("burger_menu__open_list");
    });
});

// 

const menuTargets = document.querySelectorAll(".burger_menu__item_target");

menuTargets.forEach(target => {
    target.addEventListener("click", () => {
        target.classList.toggle("open");
    });
});