import { validatIp } from "./helpers";

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('.search-bar__btn');

const ipInfo = document.querySelector('#ip');
const locationInfo = document.querySelector('#location');
const timezoneInfo = document.querySelector('#timezone');
const ispInfo = document.querySelector('#isp');

let mapInstance = null; // Храним ссылку на текущую карту

// Инициализация новой карты при загрузке страницы
ymaps.ready(() => {
    showMap(55.751244, 37.618423, false, 4);
});

function showMap(lat, lng, addPlacemark = true, zoom = 11) {

    // Удаляем предыдущую карту, если она существует
    if (mapInstance) {
        mapInstance.destroy();
        mapInstance = null;
    }

    // Инициализация новой карты
    mapInstance = new ymaps.Map('map', {
        center: [lat, lng],
        zoom: zoom,
    });

    // Создание метки
    if (addPlacemark) {
        const placemark = new ymaps.Placemark([lat, lng]);
        mapInstance.geoObjects.add(placemark);
    }

    // Удаляем лишние элементы управления
    mapInstance.controls.remove('geolocationControl');
    mapInstance.controls.remove('searchControl');
    mapInstance.controls.remove('trafficControl');
    mapInstance.controls.remove('typeSelector');
    mapInstance.controls.remove('fullscreenControl');
    mapInstance.controls.remove('rulerControl');
    mapInstance.behaviors.disable(['scrollZoom']);
}

btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

function getData() {
    if (validatIp(ipInput.value)) {
        fetch(`https://ipwho.is/${ipInput.value}?lang=ru`)
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
    // console.log(mapData);
    ipInfo.innerText = mapData.ip;
    locationInfo.innerText = mapData.country + " " + mapData.region;
    timezoneInfo.innerText = " " + mapData.timezone.utc;
    ispInfo.innerText = mapData.connection.isp;
    showMap(mapData.latitude, mapData.longitude);
}