var http = require('dec4iot_lib_http');
var sensors = require('dec4iot_lib_sensor');
sensors.activateGPS();

// TODO: This needs to be overhauled to support Senml!
// TODO: This needs to be overhauled to support Senml!
// TODO: This needs to be overhauled to support Senml!
// TODO: This needs to be overhauled to support Senml!

// Config Functions ===
function readConfig() {
    var reg = new RegExp("dec4iot.settings.json");
    var res = require('Storage').list(reg);

    var hasCfg = false;
    if(res.length === 1) hasCfg = true
    if(!hasCfg) return false;

    return require('Storage').readJSON("dec4iot.settings.json");
}

function writeDefaultConfig() {
    if(readConfig().configured) return false;

    require('Storage').writeJSON("dec4iot.settings.json", {
        "configured": false,
        
        "sensor_id": -1,
        "sensor_endpoint": "",
    
        "sensor_update_interval": -1
    });
}
// Config Functions ===

function logic(config) {
    let update_interval = config.sensor_update_interval;
    let sensor_id = config.sensor_id;
    let data_endpoint = config.sensor_endpoint;

    // setInterval(() => {
    //     try {
    //         sensors.gatherAllData().then(data => {
    //             http.post("https://eo32uzgizbfichl.m.pipedream.net", data, {});
    //         });

    //     } catch(e) {
    //         console.log(e);
    //     }

    //     setTimeout(sensors.activateGPS, (update_interval - 10) * 1000 * 60);  // Activate GPS 10 minutes before we send an update the next time; The most likely for Bangle.Js to pick up satelites!
    // }, update_interval * 1000 * 60);

    // setTimeout(sensors.activateGPS, (update_interval - 10) * 1000 * 60);
}

var confCheck = setInterval(() => {
    var config = readConfig();
    if(config === false) writeDefaultConfig()
    else if(config.configured) {
        clearInterval(confCheck);
        logic(config);
    }
}, 60 * 1000 * 60)