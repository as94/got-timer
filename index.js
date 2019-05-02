const {ipcRenderer} = require('electron');
const Timer = require('./timer.js');

ipcRenderer.on('timer-change', (event, seconds) => {
    let timer = new Timer(seconds);
    
    timerText.innerHTML = timer.toString()

    let intervalTimer = setInterval(() => {
        timer.tick();
        timerText.innerHTML = timer.toString();

        if (timer.finished()) {
            clearInterval(intervalTimer);
        }
    }, 1000);
});