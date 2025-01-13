import { validatIp } from "./helpers";

const ipInput = document.querySelector('.search-bar__input');
const btn = document.querySelector('.search-bar__btn');

btn.addEventListener('click', getData);
ipInput.addEventListener('keydown', handleKey);

function getData() {
    if (validatIp(ipInput.value)) {
        fetch(`http://ipwho.is/${ipInput.value}?lang=ru`)
        .then(response => response.json())
        .then(data => console.log(data))
    }
}

function handleKey(e) {
    if (e.key === 'Enter') {
        getData();
    }
}  