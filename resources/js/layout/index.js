import '/resources/js/app.js';
import "/resources/scss/app.scss";
import "/resources/scss/layout/index.scss";

import "./header.js";

// 
import svgSearch from '/temple/images/layout/header/search.svg?raw';
document.querySelector('.header__search_input').insertAdjacentHTML('beforeend', svgSearch);

// 
import svgTG from '/temple/images/layout/header/social_media/tg.svg?raw';
document.querySelector('.btn_tg').insertAdjacentHTML('beforeend', svgTG);

// 
import svgWT from '/temple/images/layout/header/social_media/wt.svg?raw';
document.querySelector('.btn_wt').insertAdjacentHTML('beforeend', svgWT);