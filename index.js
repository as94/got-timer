const {ipcRenderer} = require('electron');
const Timer = require('./timer.js');

const timeInMinutes = 0.1;
const timeInSeconds = timeInMinutes * 60;

let timer;
let intervalTimer;
let audio = new Audio(__dirname + '/sounds/short.mp3');

ipcRenderer.on('timer-start', () => {
    initializeTimer();
});

document.getElementById('playButton').addEventListener('click', function () {
    playTimer();
});

document.getElementById('restartButton').addEventListener('click', function () {
    resetTimers();
});

document.getElementById('pauseButton').addEventListener('click', function () {
    if (timer.started()){
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
                }
            }
        }, 1000);
    } else {
        timer.continue();
    }
}

function initializeTimer() {
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