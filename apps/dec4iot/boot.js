var http = require('dec4iot_lib_http');
var sensors = require('dec4iot_lib_sensor');

var configManager = require('dec4iot_lib_cfgman');

// TODO: This needs to be overhauled to support Senml!
// TODO: This needs to be overhauled to support Senml!
// TODO: This needs to be overhauled to support Senml!
// TODO: This needs to be overhauled to support Senml!

const config = configManager.readConfig();
if(config === false) configManager.writeDefaultConfig()
else {
    let validConfig = configManager.isValidConfig(config);

    if(!validConfig) {
        // Logic here

        let update_interval = config.sensor_update_interval;
        let sensor_id = config.sensor_id;
        let data_endpoint = config.sensor_endpoint;
        
        Terminal.println("HIT " + configManager.isValidConfig(config));

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
}