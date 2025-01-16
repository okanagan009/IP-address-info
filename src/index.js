import { validatIp } from "./helpers";

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('.search-bar__btn');

const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');

btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

function getData() {
    if (validatIp(ipInput.value)) {
        fetch(`http://ipwho.is/${ipInput.value}?lang=ru`)
            .then(response => response.json())
            .then(data => setInfo(data))
    }
}

function handleKey(e) {
    if (e.key === 'Enter') {
        getData();
    }
}

function setInfo(mapData) {
    console.log(mapData);
    ipInfo.innerText = mapData.ip;
    locationInfo.innerText = mapData.country + " " + mapData.region;
    timezoneInfo.innerText = " " + mapData.timezone.utc;
    ispInfo.innerText = mapData.connection.isp;
}

ymaps.ready(() => {
    // Инициализация карты
    const map = new ymaps.Map('map', {
        center: [55.751244, 37.618423], // Координаты центра карты (Москва)
        zoom: 10, // Уровень масштабирования
    });

    // Создание метки
    const placemark = new ymaps.Placemark(
        [55.751244, 37.618423], // Координаты метки
    );

    // Добавление метки на карту
    map.geoObjects.add(placemark);
    map.controls.remove('geolocationControl'); // удаляем геолокацию
    map.controls.remove('searchControl'); // удаляем поиск
    map.controls.remove('trafficControl'); // удаляем контроль трафика
    map.controls.remove('typeSelector'); // удаляем тип
    map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
    // map.controls.remove('zoomControl'); // удаляем контрол зуммирования
    map.controls.remove('rulerControl'); // удаляем контрол правил
    map.behaviors.disable(['scrollZoom']); // отключаем скролл карты
});
