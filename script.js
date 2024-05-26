// script.js

function toggleSettings() {
    const settingsPopup = document.getElementById('settings-popup');
    settingsPopup.style.display = settingsPopup.style.display === 'none' || settingsPopup.style.display === '' ? 'block' : 'none';
}

function applySettings() {
    const bgImage = document.getElementById('bg-image').value;
    const bgColor = document.getElementById('bg-color').value;
    const textColor = document.getElementById('text-color').value;
    const fontSize = document.getElementById('font-size').value;
    const fontType = document.getElementById('font-type').value;
    const showSeconds = document.getElementById('show-seconds').checked;
    const hourFormat = document.getElementById('hour-format').value;

    if (bgImage) {
        document.body.style.backgroundImage = `url(${bgImage})`;
        document.body.style.backgroundSize = 'cover';
    }
    if (bgColor) {
        document.body.style.backgroundColor = bgColor;
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

    // Apply 12/24 hour format here

    toggleSettings();
}
