const http = require('dec4iot_lib_http');
const sensors = require('dec4iot_lib_sensor');

setInterval(() => {
    sensors.gatherAllData().then(data => {
        http.post("https://eo32uzgizbfichl.m.pipedream.net", data, {});
    });
}, 20000)