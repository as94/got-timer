const { ipcRenderer } = require('electron');
const Timer = require('./timer.js');
const SettingsStore = require('./settingsStore');

let settings;

let timeInSeconds;
let isRepeat;

let timer;
let intervalTimer;
let audio = new Audio('./sounds/short.mp3');

ipcRenderer.on('timer-start', () => {
    settings = new SettingsStore({
        configName: 'user-preferences',
        defaults: {
            timeInSeconds: 15 * 60,
            isRepeat: true
        }
    });

    initializeTimer();
});

var playButton = document.getElementById('playButton');
bindAnimation(playButton);
playButton.addEventListener('click', function () {
    playTimer();
});

var restartButton = document.getElementById('restartButton');
bindAnimation(restartButton);
restartButton.addEventListener('click', function () {
    resetTimers();
});

var pauseButton = document.getElementById('pauseButton');
bindAnimation(pauseButton);
pauseButton.addEventListener('click', function () {
    if (timer.started()) {
        timer.pause();
    }
});

function playTimer() {
    if (intervalTimer == null) {
        if (timer == null) {
            initializeTimer();
        }

        intervalTimer = setInterval(() => {
            if (!timer.paused()) {
                timer.tick();
                timerText.innerHTML = timer.toString();

                if (timer.finished()) {
                    resetTimers();
                    playSound();

                    if (isRepeat) {
                        playTimer();
                    }
                }
            }
        }, 1000);
    } else {
        timer.continue();
    }
}

function initializeTimer() {
    settings = new SettingsStore({
        configName: settings.configName,
        defaults: settings.defaults
    });

    timeInSeconds = settings.get('timeInSeconds');
    isRepeat = settings.get('isRepeat');

    timer = new Timer(timeInSeconds);
    timerText.innerHTML = timer.toString();
}

function resetTimers() {
    initializeTimer();
    clearInterval(intervalTimer);
    intervalTimer = null;
}

function playSound() {
    audio.currentTime = 0;
    audio.play();
}

function bindAnimation(button) {
    button.addEventListener('click', function () {
        button.classList.toggle("animated");
        button.classList.toggle("tada");
    });
}