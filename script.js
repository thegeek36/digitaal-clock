// script.js

let currentTimeZone = 'Asia/Kolkata';
let currentHourFormat = 12;
let showSeconds = true;

function toggleSettings() {
    const settingsPopup = document.getElementById('settings-popup');
    settingsPopup.style.display = settingsPopup.style.display === 'none' || settingsPopup.style.display === '' ? 'block' : 'none';
}

// script.js

let isMusicPlaying = false;
const calmingMusic = document.getElementById('calming-music');

function toggleMusic() {
    if (isMusicPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    calmingMusic.play();
    isMusicPlaying = true;
}

function pauseMusic() {
    calmingMusic.pause();
    isMusicPlaying = false;
}


function applySettings() {
    const bgImageInput = document.getElementById('bg-image');
    const bgColor = document.getElementById('bg-color').value;
    const textColor = document.getElementById('text-color').value;
    const fontSize = document.getElementById('font-size').value;
    const fontType = document.getElementById('font-type').value;
    showSeconds = document.getElementById('show-seconds').checked;
    currentHourFormat = parseInt(document.getElementById('hour-format').value);
    currentTimeZone = document.getElementById('timezone').value;

    if (bgImageInput.files && bgImageInput.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.body.style.backgroundImage = `url(${e.target.result})`;
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundRepeat = 'no-repeat';
        }
        reader.readAsDataURL(bgImageInput.files[0]);
    } else {
        document.body.style.backgroundImage = 'none';
    }
    if (bgColor) {
        document.body.style.backgroundColor = bgColor;
        if (bgColor.toLowerCase() === '#000000') {
            document.querySelector('.nav-container h1').style.color = 'white';
            document.querySelector('.settings-icon i').classList.add('fa-cog', 'fa');
            document.querySelector('.settings-icon i').style.color = 'white';
            document.querySelector('.music-icon i').classList.add('fa-music', 'fa');
            document.querySelector('.music-icon i').style.color = 'white';
        } else {
            document.querySelector('.nav-container h1').style.color = 'black';
            document.querySelector('.settings-icon i').classList.remove('fa-cog', 'fa');
            document.querySelector('.settings-icon i').style.color = 'black';
        }
    }
    if (textColor) {
        document.querySelector('.time').style.color = textColor;
    }
    if (fontSize) {
        document.querySelector('.time').style.fontSize = `${fontSize}px`;
    }
    if (fontType) {
        document.querySelector('.time').style.fontFamily = fontType;
    }

    document.querySelector('.seconds').style.display = showSeconds ? 'inline' : 'none';

    toggleSettings();
    updateTime();
}

function removeBgImage() {
    document.body.style.backgroundImage = 'none';
    document.getElementById('bg-image').value = '';
}


let lastMinutes = -1;
let lastHours = -1;
let lastSeconds = -1;

function updateTime() {
    const time = new Date().toLocaleString("en-US", { timeZone: currentTimeZone });
    const date = new Date(time);
    
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    if (currentHourFormat === 12) {
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
    }

    if (minutes !== lastMinutes) {
        document.querySelector('.minute').classList.add('scroll-up');
        setTimeout(() => document.querySelector('.minute').classList.remove('scroll-up'), 300);
        lastMinutes = minutes;
    }

    if (hours !== lastHours) {
        document.querySelector('.hour').classList.add('scroll-up');
        setTimeout(() => document.querySelector('.hour').classList.remove('scroll-up'), 300);
        lastHours = hours;
    }

    if(seconds !== lastSeconds){
        document.querySelector('.seconds').classList.add('scroll-up');
        setTimeout(() => document.querySelector('.seconds').classList.remove('scroll-up'), 300);
        lastSeconds = seconds;
    }

    const ampm = currentHourFormat === 12 ? (hours >= 12 ? 'PM' : 'AM') : '';
    const formattedHours = currentHourFormat === 12 ? (hours % 12 || 12) : hours;

    document.querySelector('.time').innerHTML = `
        <h2 class="hour">${formattedHours.toString().padStart(2, '0')}</h2>
        <h2 class="blink">:</h2>
        <h2 class="minute">${minutes.toString().padStart(2, '0')}</h2>
        ${showSeconds ? `<h2 class="blink">:</h2><h2 class="seconds">${seconds.toString().padStart(2, '0')}</h2>` : ''}
        ${currentHourFormat === 12 ? `<h2> ${ampm}</h2>` : ''}
    `;
}

setInterval(updateTime, 1000); // Update time every second
updateTime(); // Initial call to display the time immediately
