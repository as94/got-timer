const electron = require('electron');
const path = require('path');
const fs = require('fs');

class SettingsStore {
    constructor(props) {
        this.configName = props.configName;
        this.defaults = props.defaults;

        const userDataPath = (electron.app || electron.remote.app).getPath('userData');
        this.path = path.join(userDataPath, props.configName + '.json');
        this.data = parseDataFile(this.path, props.defaults);
    }

    get(key) {
        return this.data[key];
    }

    set(key, value) {
        this.data[key] = value;
        var settings = JSON.stringify(this.data);

        fs.writeFileSync(this.path, settings);
    }
}

function parseDataFile(filePath, defaults) {
    try {
        var settings = fs.readFileSync(filePath);
        return JSON.parse(settings);
    } catch (error) {
        return defaults;
    }
}

module.exports = SettingsStore;