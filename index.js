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

var playButton = document.getElementById('playButton');
playButton.addEventListener('click', function () {
    playTimer();
    playButton.classList.toggle("animated");
    playButton.classList.toggle("tada");
});
playButton.addEventListener('mouseleave', function () {
    playButton.classList.toggle("animated");
    playButton.classList.toggle("tada");
});

var restartButton = document.getElementById('restartButton');
restartButton.addEventListener('click', function () {
    resetTimers();
    restartButton.classList.toggle("animated");
    restartButton.classList.toggle("tada");
});
restartButton.addEventListener('mouseleave', function () {
    restartButton.classList.toggle("animated");
    restartButton.classList.toggle("tada");
});

var pauseButton = document.getElementById('pauseButton');
pauseButton.addEventListener('click', function () {
    if (timer.started()){
        timer.pause();
    }
    pauseButton.classList.toggle("animated");
    pauseButton.classList.toggle("tada");
});
pauseButton.addEventListener('mouseleave', function () {
    pauseButton.classList.toggle("animated");
    pauseButton.classList.toggle("tada");
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