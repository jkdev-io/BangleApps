var http = require('dec4iot_lib_http');
var sensors = require('dec4iot_lib_sensor');

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

var config = readConfig();
if(config === false) writeDefaultConfig()
else if(!config.configured) {
    // Logic here

    let update_interval = config.sensor_update_interval;
    let sensor_id = config.sensor_id;
    let data_endpoint = config.sensor_endpoint;
    
    Terminal.println("HIT " + config.configured);

    // setInterval(() => {
    //     try {
    //         sensors.gatherAllData().then(data => {
    //             http.post("https://eo32uzgizbfichl.m.pipedream.net", data, {});
    //         });

    //     } catch(e) {
    //         console.log(e);
    //     }
    // }, update_interval * 1000 * 60);
}
