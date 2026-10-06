import "./index.scss";

/**
 * Инициализация галереи. Возвращает функцию-setter.
 *
 * @param {string} containerSelector - например '.about_us__licenses_list'
 * @param {Object} [options]
 * @returns {(target?: string|Element|NodeList|HTMLCollection) => void}
 */
export function createImageGallery(containerSelector, options = {}) {
    const config = {
        delegate: '*:not(.slick-cloned):not(.term__arrow):not([href="#!"]):not([href^="#"])',
        tLoading: 'Загрузка изображения',
        mainClass: 'mfp-img-mobile',
        preload: [0, 1],
        ...options
    };

    function bindContainer(container) {
        if (!container) return;
        if (container.dataset.galleryInit === '1') return;
        container.dataset.galleryInit = '1';

        container.addEventListener('click', function (e) {
            // Клоны Swiper — мимо
            if (e.target.closest('.swiper-slide-duplicate, .swiper-slide-clone')) return;

            // После свайпа — мимо
            const swiperEl = container.closest('.swiper') || container;
            const swiper = swiperEl.swiper;
            if (swiper && swiper.allowClick === false) return;

            let link = e.target.closest(config.delegate);
            if (!link) return;
            if (!container.contains(link)) return;

            // Если кликнули по обложке (span/div) — ищем внутри слайда img или a
            if (!hasImageSource(link)) {
                const scope = link.closest('.swiper-slide, li, .item, .card') || link.parentElement;
                const candidate = scope
                    ? scope.querySelector('img, a[href]:not([href^="#"])')
                    : null;
                if (candidate && hasImageSource(candidate)) {
                    link = candidate;
                } else {
                    return;
                }
            }

            e.preventDefault();

            // Собираем только элементы с реальным src/href
            const nodes = Array.from(container.querySelectorAll(config.delegate))
                .filter(hasImageSource);

            const items = nodes.map(normalizeItem).filter(x => x.src);
            const index = items.findIndex(x => x.el === link);
            if (index === -1) return;

            openGallery(items, index, config);
        });
    }

    function hasImageSource(el) {
        if (!(el instanceof Element)) return false;

        if (el.closest('.swiper-slide-duplicate, .swiper-slide-clone')) return false;

        const tag = el.tagName.toLowerCase();

        if (tag === 'img') {
            const src = el.getAttribute('src') || el.getAttribute('data-src');
            return !!(src && src.trim());
        }

        if (tag === 'a') {
            const href = el.getAttribute('href');
            if (!href) return false;
            if (href === '#!' || href.startsWith('#')) return false;
            return true;
        }

        return false;
    }

    function normalizeItem(node) {
        if (!(node instanceof Element)) {
            return { el: null, src: null, title: '' };
        }

        const tag = node.tagName.toLowerCase();

        if (tag === 'img') {
            return {
                el: node,
                src: node.getAttribute('src') || node.getAttribute('data-src'),
                title: node.getAttribute('title') || node.alt || ''
            };
        }

        if (tag === 'a') {
            const href = node.getAttribute('href');
            const img  = node.querySelector('img');
            const src  = (href && href !== '#' && href !== '#!')
                ? href
                : (img ? img.getAttribute('src') : null);

            return {
                el: node,
                src,
                title: node.getAttribute('title') || (img ? img.alt : '') || ''
            };
        }

        return { el: null, src: null, title: '' };
    }

    return function set(target) {
        const t = target || containerSelector;

        if (typeof t === 'string') {
            document.querySelectorAll(t).forEach(bindContainer);
        } else if (t instanceof Element) {
            bindContainer(t);
        } else if (t && typeof t.length === 'number') {
            Array.from(t).forEach(bindContainer);
        }
    };
}

/**
 * Открывает галерею.
 * @param {Array<{el?: Element, src: string, title?: string}>} items
 * @param {number} startIndex
 * @param {Object} config
 */
function openGallery(items, startIndex, config) {
    if (document.querySelector('.mfp-gallery-open')) return;

    let currentIndex = startIndex;
    let isOpen = true;

    // === Оверлей ===
    const bg = document.createElement('div');
    bg.className = 'mfp-bg mfp-fade mfp-gallery-open';
    document.body.appendChild(bg);

    const wrap = document.createElement('div');
    wrap.className = 'mfp-wrap mfp-fade mfp-gallery-open';
    wrap.style.cssText =
        'position:fixed;top:0;left:0;right:0;bottom:0;overflow:auto;' +
        'z-index:1043;display:flex;align-items:center;justify-content:center;';

    const container = document.createElement('div');
    container.className = 'mfp-container mfp-image-holder ' + (config.mainClass || '');

    // Preloader
    const preloader = document.createElement('div');
    preloader.className = 'mfp-preloader';
    preloader.textContent = config.tLoading || 'Загрузка изображения';

    // Картинка
    const img = document.createElement('img');
    img.className = 'mfp-img';
    img.alt = '';
    img.style.maxWidth = '100%';
    img.style.maxHeight = '100vh';
    img.style.display = 'inline';

    // Счётчик
    const counter = document.createElement('div');
    counter.className = 'mfp-counter';
    counter.style.cssText =
        'position:absolute;top:0;right:0;color:#ccc;font-size:12px;' +
        'padding:8px 12px;line-height:18px;white-space:nowrap;';

    // Стрелки
    const arrowLeft = document.createElement('button');
    arrowLeft.type = 'button';
    arrowLeft.className = 'mfp-arrow mfp-arrow-left mfp-prevent-close';
    arrowLeft.setAttribute('aria-label', 'Предыдущее изображение');
    arrowLeft.innerHTML = '&#10094;';
    arrowLeft.style.cssText =
        'position:absolute;top:50%;transform:translateY(-50%);' +
        'background:none;border:0;color:#fff;font-size:32px;cursor:pointer;' +
        'padding:20px;z-index:2;';

    const arrowRight = document.createElement('button');
    arrowRight.type = 'button';
    arrowRight.className = 'mfp-arrow mfp-arrow-right mfp-prevent-close';
    arrowRight.setAttribute('aria-label', 'Следующее изображение');
    arrowRight.innerHTML = '&#10095;';
    arrowRight.style.cssText = arrowLeft.style.cssText.replace('left:0', 'right:0');

    // Кнопка закрытия
    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.className = 'mfp-close';
    closeBtn.setAttribute('aria-label', 'Закрыть');
    closeBtn.innerHTML = '&times;';
    closeBtn.style.cssText =
        'position:absolute;top:20px;right:0;background:none;border:0;' +
        'color:#fff;font-size:36px;cursor:pointer;padding:8px 16px;z-index:3;';

    // Сборка
    container.appendChild(preloader);
    container.appendChild(img);
    container.appendChild(counter);
    container.appendChild(arrowLeft);
    container.appendChild(arrowRight);
    container.appendChild(closeBtn);
    wrap.appendChild(container);
    document.body.appendChild(wrap);

    // Блокируем скролл
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Появление
    requestAnimationFrame(function () {
        bg.classList.add('mfp-ready');
        wrap.classList.add('mfp-ready');
    });

    // === Показ изображения ===
    function show(index) {
        if (index < 0 || index >= items.length) return;
        currentIndex = index;

        const item = items[index];
        const src = item.src;
        const title = item.title || '';

        preloader.textContent = config.tLoading || 'Загрузка изображения';
        preloader.style.display = 'inline';
        img.style.display = 'none';
        img.removeAttribute('src');

        const loader = new Image();
        loader.onload = function () {
            if (!isOpen) return;
            img.src = src;
            img.alt = title;
            img.style.display = 'inline';
            preloader.style.display = 'none';
            updateCounter();
            preloadNeighbours();
        };
        loader.onerror = function () {
            if (!isOpen) return;
            preloader.textContent = 'Не удалось загрузить изображение';
        };
        loader.src = src;

        const single = items.length <= 1;
        arrowLeft.style.display = single ? 'none' : '';
        arrowRight.style.display = single ? 'none' : '';

        function updateCounter() {
            counter.textContent = items.length > 1 ?
                (currentIndex + 1) + ' из ' + items.length :
                '';
        }
    }

    function preloadNeighbours() {
        const [before, after] = config.preload || [0, 0];
        for (let i = 1; i <= before; i++) {
            const it = items[currentIndex - i];
            if (it && it.src) new Image().src = it.src;
        }
        for (let i = 1; i <= after; i++) {
            const it = items[currentIndex + i];
            if (it && it.src) new Image().src = it.src;
        }
    }

    function next() {
        if (items.length <= 1) return;
        show(currentIndex + 1 >= items.length ? 0 : currentIndex + 1);
    }

    function prev() {
        if (items.length <= 1) return;
        show(currentIndex - 1 < 0 ? items.length - 1 : currentIndex - 1);
    }

    // === Закрытие ===
    function close() {
        if (!isOpen) return;
        isOpen = false;

        document.removeEventListener('keydown', onKeyDown);
        wrap.removeEventListener('click', onWrapClick);
        img.removeEventListener('click', onImgClick);
        arrowLeft.removeEventListener('click', onArrowLeft);
        arrowRight.removeEventListener('click', onArrowRight);
        closeBtn.removeEventListener('click', close);

        wrap.classList.remove('mfp-ready');
        bg.classList.remove('mfp-ready');

        setTimeout(function () {
            bg.remove();
            wrap.remove();
            document.body.style.overflow = prevOverflow;
        }, 200);
    }

    function onKeyDown(e) {
        if (e.key === 'Escape' || e.keyCode === 27) {
            close();
        } else if (e.key === 'ArrowRight' || e.keyCode === 39) {
            next();
        } else if (e.key === 'ArrowLeft' || e.keyCode === 37) {
            prev();
        }
    }

    function onWrapClick(e) {
        if (e.target === wrap || e.target === container) {
            close();
        }
    }

    function onImgClick(e) {
        e.stopPropagation();
        next();
    }

    function onArrowLeft(e) {
        e.stopPropagation();
        prev();
    }

    function onArrowRight(e) {
        e.stopPropagation();
        next();
    }

    document.addEventListener('keydown', onKeyDown);
    wrap.addEventListener('click', onWrapClick);
    img.addEventListener('click', onImgClick);
    arrowLeft.addEventListener('click', onArrowLeft);
    arrowRight.addEventListener('click', onArrowRight);
    closeBtn.addEventListener('click', close);

    show(currentIndex);
}