
const DOGGO_GET_IMG_BY_BREED_URL = 'https://dog.ceo/api/breed/{0}/images';
const DOGGO_GET_BREEDS_URL = 'https://dog.ceo/api/breeds/list/all';

const ERR_BREED_NOT_SELECTED = 'Oooops! Looks like you haven\'t selected doggo breed...'

String.prototype.format = function () {
    // store arguments in an array
    var args = arguments;
    // use replace to iterate over the string
    // select the match and check if related argument is present
    // if yes, replace the match with the argument
    return this.replace(/{([0-9]+)}/g, function (match, index) {
        // check if the argument is present
        return typeof args[index] == 'undefined' ? match : args[index];
    });
};

let selectedBreed = '';

let eLoading = document.querySelector(".loading-img");
showElement(eLoading, false);

let eImg = document.querySelector(".doggo-img");
showElement(eImg, false);

let eErr = document.querySelector(".err-msg");
showElement(eErr, false);

let selector = document.querySelector(".breed-selector");
getBreedList();

document.querySelector(".breed-selector").addEventListener("change", e => {
    selectedBreed = e.target.options[e.target.selectedIndex].value;
    showElement(eErr, false);
});

document.querySelector(".btn").addEventListener("click", e => {
    if (selectedBreed === '') {
        error(ERR_BREED_NOT_SELECTED);
        return
    }
    getImage();
});

function getBreedList() {
    const promise = fetch(DOGGO_GET_BREEDS_URL);
    promise
        .then(function (res) {
            return res.json();
        })
        .then(function (resJson) {
            if (resJson.status !== 'success') {
                error(resJson.message);
                return
            }
            for (let message in resJson.message) {
                let opt = document.createElement('option');
                opt.value = message;
                opt.innerHTML = message;
                selector.appendChild(opt);
            }
        });
}

function getImage() {
    showElement(eLoading, true);
    showElement(eImg, false);
    const promise = fetch(DOGGO_GET_IMG_BY_BREED_URL.format(selectedBreed));
    promise
        .then(function (res) {
            return res.json();
        })
        .then(function (resJson) {
            if (resJson.status !== 'success') {
                error(resJson.message);
                return
            }
            const idx = Math.floor(Math.random() * resJson.message.length);

            eImg.src = resJson.message[idx];
            showElement(eImg, true);
            showElement(eLoading, false);
        });
}

function error(msg) {
    eErr.innerText = msg;
    showElement(eErr, true);
}

function showElement(e, isVisible) {
    if (isVisible) {
        e.style.visibility = 'visible';
        e.style.display = 'block';
    } else {
        e.style.visibility = 'hidden';
        e.style.display = 'none';
    }
}