// const http = require('dec4iot_lib_http');
// const sensors = require('dec4iot_lib_sensor');

// // try {
// //     setInterval(() => {
// //         sensors.gatherAllData().then(data => {
// //             http.post("https://eo32uzgizbfichl.m.pipedream.net", data, {});
// //         });
// //     }, 20000)

// // } catch(e) {
// //     console.log(e);
// // }


const { writeDefaultConfig } = require('./config');

const startSetupIntent = {t: "intent", target: "activity", action: "me.byjkdev.dec4iot.intents.banglejs.SETUP"};

const config = require('dec4iot_lib_cfgman').readConfig();
if(config === false) {
    writeDefaultConfig();

    GB(startSetupIntent)
} else {

}