import "./index.scss";
(function () {
    'use strict';

    /**
     * Инициализация галереи для контейнера.
     * @param {string} containerSelector - например '.term__grid'
     * @param {Object} options
     */
    function initImageGallery(containerOrSelector, options = {}) {
        const container = typeof containerOrSelector === 'string' ?
            document.querySelector(containerOrSelector) :
            containerOrSelector;

        if (!container) return;

        const config = {
            delegate: '*:not(.slick-cloned):not(.term__arrow):not([href="#!"]):not([href^="#"])',
            tLoading: 'Загрузка изображения',
            mainClass: 'mfp-img-mobile',
            preload: [0, 1],
            ...options
        };

        // Делегирование клика — как в magnificPopup
        container.addEventListener('click', function (e) {

            const link = e.target.closest(config.delegate);
            if (!link) return;
            if (!container.contains(link)) return;


            e.preventDefault();

            // Собираем все ссылки галереи в порядке DOM
            const links = Array.from(container.querySelectorAll(config.delegate));
            const index = links.indexOf(link);
            if (index === -1) return;

            openGallery(links, index, config);
        });
    }

    /**
     * Открывает галерею на указанном индексе.
     */
    function openGallery(links, startIndex, config) {
        // Защита от повторного открытия
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

        // Счётчик «1 из N»
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

        function getSrc(link) {
            const srcAttr = link.getAttribute('src');
            return (srcAttr && srcAttr.trim()) ? srcAttr : link.getAttribute('href');
        }

        // === Показ изображения ===
        function show(index) {
            if (index < 0 || index >= links.length) return;
            currentIndex = index;

            const link = links[index];

            const src = getSrc(link);
            const title = link.getAttribute('title') || link.dataset.title || '';

            // Показываем прелоадер
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

            // Скрываем стрелки, если картинка одна
            const single = links.length <= 1;
            arrowLeft.style.display = single ? 'none' : '';
            arrowRight.style.display = single ? 'none' : '';

            // Счётчик
            function updateCounter() {
                counter.textContent = links.length > 1 ?
                    (currentIndex + 1) + ' из ' + links.length :
                    '';
            }
        }

        function preloadNeighbours() {
            const [before, after] = config.preload || [0, 0];
            for (let i = 1; i <= before; i++) {
                const l = links[currentIndex - i];
                if (l) new Image().src =  getSrc(l);
            }
            for (let i = 1; i <= after; i++) {
                const l = links[currentIndex + i];
                if (l) new Image().src = getSrc(l);
            }
        }

        function next() {
            if (links.length <= 1) return;
            show(currentIndex + 1 >= links.length ? 0 : currentIndex + 1);
        }

        function prev() {
            if (links.length <= 1) return;
            show(currentIndex - 1 < 0 ? links.length - 1 : currentIndex - 1);
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
            // Клик по фону (не по картинке, не по стрелкам, не по close)
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

        // Навешиваем обработчики
        document.addEventListener('keydown', onKeyDown);
        wrap.addEventListener('click', onWrapClick);
        img.addEventListener('click', onImgClick);
        arrowLeft.addEventListener('click', onArrowLeft);
        arrowRight.addEventListener('click', onArrowRight);
        closeBtn.addEventListener('click', close);

        // Первый показ
        show(currentIndex);
    }

    // Автоинициализация для всех контейнеров галерей
    const GALLERY_CONTAINERS = [
        '.about_us__licenses_list',
        '.docs__grid'
    ];

    function autoInit() {
        GALLERY_CONTAINERS.forEach(function (selector) {
            document.querySelectorAll(selector).forEach(function (grid) {
                if (grid.dataset.galleryInit === '1') return;
                grid.dataset.galleryInit = '1';

                initImageGallery(grid); // ← передаём сам элемент
            });
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', autoInit);
    } else {
        autoInit();
    }
})();