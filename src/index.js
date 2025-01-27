// Импорт функции для проверки валидности IP-адреса
import { validatIp } from "./helpers";

// Получаем элементы ввода и кнопки из DOM
const ipInput = document.querySelector('.search-bar__input'); // Поле для ввода IP-адреса
const btn = document.querySelector('.search-bar__btn'); // Кнопка для поиска

// Получаем элементы для отображения информации об IP
const ipInfo = document.querySelector('#ip'); // Элемент для отображения IP-адреса
const locationInfo = document.querySelector('#location'); // Элемент для отображения местоположения
const timezoneInfo = document.querySelector('#timezone'); // Элемент для отображения часового пояса
const ispInfo = document.querySelector('#isp'); // Элемент для отображения интернет-провайдера

// Храним ссылку на текущую карту, чтобы избежать повторной инициализации
let mapInstance = null;

// Инициализация новой карты при загрузке страницы
ymaps.ready(() => {
    // Отображаем карту с координатами Москвы без метки
    showMap(55.751244, 37.618423, false, 4);
});

// Функция для отображения карты
function showMap(lat, lng, addPlacemark = true, zoom = 11) {
    // Удаляем предыдущую карту, если она существует
    if (mapInstance) {
        mapInstance.destroy();
        mapInstance = null;
    }

    // Создаём новую карту с заданным центром и уровнем зума
    mapInstance = new ymaps.Map('map', {
        center: [lat, lng], // Координаты центра карты
        zoom: zoom, // Уровень масштабирования
    });

    // Создание метки
    if (addPlacemark) {
        const placemark = new ymaps.Placemark([lat, lng]); // Создаём метку
        mapInstance.geoObjects.add(placemark); // Добавляем метку на карту
    }

    // Удаляем ненужные элементы управления с карты
    mapInstance.controls.remove('geolocationControl'); // Убираем кнопку геолокации
    mapInstance.controls.remove('searchControl'); // Убираем строку поиска
    mapInstance.controls.remove('trafficControl'); // Убираем информацию о пробках
    mapInstance.controls.remove('typeSelector'); // Убираем выбор типа карты
    mapInstance.controls.remove('fullscreenControl'); // Убираем кнопку полноэкранного режима
    mapInstance.controls.remove('rulerControl'); // Убираем инструмент измерения расстояний
    mapInstance.behaviors.disable(['scrollZoom']); // Отключаем масштабирование карты с помощью скролла
}

// Добавляем обработчик нажатия кнопки
btn.addEventListener('click', getData);

// Добавляем обработчик нажатия клавиши Enter в поле ввода
ipInput.addEventListener('keydown', handleKey);

// Функция для получения данных об IP
function getData() {
    // Проверяем валидность введённого IP-адреса
    if (validatIp(ipInput.value)) {
        // Отправляем запрос к API с введённым IP-адресом
        fetch(`https://ipwho.is/${ipInput.value}?lang=ru`)
            .then(response => response.json()) // Преобразуем ответ в JSON
            .then(data => setInfo(data)); // Передаём данные в функцию для обработки
    }
}

// Функция для обработки нажатия клавиши Enter
function handleKey(e) {
    if (e.key === 'Enter') { // Если нажата клавиша Enter
        getData(); // Вызываем функцию получения данных
    }
}

// Функция для отображения информации об IP и обновления карты
function setInfo(mapData) {
    // console.log(mapData);
    ipInfo.innerText = mapData.ip; // Отображаем IP-адрес
    locationInfo.innerText = `${mapData.country} ${mapData.region}`; // Отображаем страну и регион
    timezoneInfo.innerText = ` ${mapData.timezone.utc}`; // Отображаем часовой пояс
    ispInfo.innerText = mapData.connection.isp; // Отображаем интернет-провайдера

    // Обновляем карту с новыми координатами
    showMap(mapData.latitude, mapData.longitude);
}
