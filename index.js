const { ipcRenderer } = require('electron');
const Timer = require('./timer.js');
const SettingsStore = require('./settingsStore');

let defaultTimeInSeconds = 0.1 * 60;

const settings = new SettingsStore({
    configName: 'user-preferences',
    defaults: {
        timeInSeconds: defaultTimeInSeconds,
        isRepeat: false
    }
});

let timeInSeconds;
let isRepeat;

let timer;
let intervalTimer;
let audio = new Audio('./sounds/short.mp3');

ipcRenderer.on('timer-start', () => {
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

document.getElementById('repeatTimer').addEventListener('click', function () {
    var repeat = settings.get('isRepeat');
    settings.set('isRepeat', !repeat);

    // TODO: remove
    settings.set('timeInSeconds', defaultTimeInSeconds);
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
    button.addEventListener('mouseleave', function () {
        button.classList.toggle("animated");
        button.classList.toggle("tada");
    });
}