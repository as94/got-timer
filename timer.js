const moment = require('moment');

class Timer {
    constructor(seconds) {
        this.seconds = seconds;
    }

    tick() {
        this.seconds--;
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