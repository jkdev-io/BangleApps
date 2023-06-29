/*
    dec4IoT on Bangle.js
    Copyright (c) 2023 Jakob Kampichler

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

var sensors = require('dec4iot_lib_sensor');

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

    // }, update_interval * 1000 * 60);

}

var confCheck = setInterval(() => {
    var config = readConfig();
    if(config === false) writeDefaultConfig()
    else if(config.configured) {
        clearInterval(confCheck);
        logic(config);
    }
}, 60 * 1000 * 60)