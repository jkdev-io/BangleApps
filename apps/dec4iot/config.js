const storage = require('Storage');

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

function isConfigured(configJson) {
    if(configJson.configured) return true;
    else return false;
}

function isNoLongerDefault(configJson) {
    Object.keys(configJson).forEach(i => {
        let e1 = configJson[i];
        let e2 = defaultConfig[i];

        if(e1 === e2) return false;
    });

    return true;
}

function isValidConfig(configJson) {
    let configured = isConfigured(configJson);
    let noLongerDefault = isNoLongerDefault(configJson);

    if(configured === true && noLongerDefault === true) return true;
    return false;
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

module.exports = { hasConfig, isConfigured, isNoLongerDefault, isValidConfig, readConfig, writeConfig, writeDefaultConfig }