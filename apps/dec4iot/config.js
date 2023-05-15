var defaultConfig = {
    "configured": false,
    
    "sensor_id": -1,
    "sensor_endpoint": "",

    "sensor_update_interval": -1
}

function hasConfig() {
    var reg = new RegExp("dec4iot.settings.json");
    var res = require('Storage').list(reg);

    if(res.length === 1) return true;
    else return false;
}

function readConfig() {
    var hasCfg = hasConfig();
    if(!hasCfg) return false;

    return require('Storage').readJSON("dec4iot.settings.json");
}

function writeConfig(sensor_id, data_endpoint, update_interval) {
    require('Storage').writeJSON("dec4iot.settings.json", {
        "configured": true,
    
        "sensor_id": sensor_id,
        "sensor_endpoint": data_endpoint,

        "sensor_update_interval": update_interval
    });
}

function writeDefaultConfig() {
    if(readConfig().configured) return false;

    require('Storage').writeJSON("dec4iot.settings.json", defaultConfig);
}

module.exports = { hasConfig, readConfig, writeConfig, writeDefaultConfig }