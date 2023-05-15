var storage = require('Storage');

let defaultConfig = {
    "configured": false,
    
    "sensor_id": -1,
    "sensor_endpoint": "",

    "sensor_update_interval": -1
}

function hasConfig() {
    let reg = new RegExp("dec4iot.settings.json");
    let res = storage.list(reg);

    if(res.length === 1) return true;
    else return false;
}

function readConfig() {
    let hasCfg = hasConfig();
    if(!hasCfg) return false;

    return storage.readJSON("dec4iot.settings.json");
}

function writeConfig(sensor_id, data_endpoint, update_interval) {
    storage.writeJSON("dec4iot.settings.json", {
        "configured": true,
    
        "sensor_id": sensor_id,
        "sensor_endpoint": data_endpoint,

        "sensor_update_interval": update_interval
    });
}

function writeDefaultConfig() {
    if(isValidConfig(readConfig())) return false;

    storage.writeJSON("dec4iot.settings.json", defaultConfig);
}

module.exports = { hasConfig, readConfig, writeConfig, writeDefaultConfig }