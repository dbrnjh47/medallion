export function initYandexMap() {
  if (typeof ymaps === 'undefined') {
    console.warn('Yandex Maps API ещё не загружен');
    return;
  }

  ymaps.ready(() => {
    const coords = window.MAP_COORDS || [51.698437, 39.230866];
    const myMap = new ymaps.Map("map", {
      center: coords,
      zoom: 13
    }, {
      searchControlProvider: 'yandex#search'
    });

    const myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
      hintContent: 'Наша клиника',
      balloonContent: 'Наша клиника'
    }, {
      iconLayout: 'default#image'
    });

    myMap.behaviors.disable('drag');
    myMap.behaviors.disable(['scrollZoom']);
    myMap.geoObjects.add(myPlacemark);
  });
}