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