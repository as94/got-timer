const moment = require('moment');

class Timer {
    constructor(seconds) {
        this.seconds = seconds;
        this.isStarted = false;
        this.isPaused = false;
    }

    tick() {
        this.isStarted = true;
        this.seconds--;
    }

    pause() {
        this.isStarted = false;
        this.isPaused = true;
    }

    continue() {
        this.isStarted = true;
        this.isPaused = false;
    }

    started() {
        return this.isStarted;
    }

    paused() {
        return this.isPaused;
    }

    finished() {
        return this.seconds <= 0;
    }

    toString() {
        let momentTime = moment.duration(this.seconds, 'seconds');
        let sec = momentTime.seconds() < 10 ? ('0' + momentTime.seconds()) : momentTime.seconds();
        let min = momentTime.minutes() < 10 ? ('0' + momentTime.minutes()) : momentTime.minutes();

        return `${min}:${sec}`;
    };
}

module.exports = Timer;