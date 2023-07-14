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
var Layout = require('Layout');

// clear the screen
g.clear();
g.reset().clearRect(Bangle.appRect);

var big_img = {
  width : 80, height : 80, bpp : 3,
  transparent : 0,
  buffer : require("heatshrink").decompress(atob("AAcJkmSpICQoAcGDSQCEDgkEDq+ADgUBDSoCDDsAaXAQVIDr0CDrVJgESDvMgDvYaZARn/AAXJDrn5DvQAFEaYdJ//8Drn/+QdcXiIdMPSAdM/4dd8gd6ah+fDxryRAQknDrhEGDq+Sv4dD+Qd1p4d//wdXpIdOn5KNDqQOKDv4d/Dv4d/DvUnBwXyDrACNp4dhJRQdrv4d5yYcDDq7dDAAQXOz4VFAA4dODhv8DvXkDritPDhn5DrnJDrfyDRodNWB4dMOiAdGC6YdnVSACdiQdbkAd/ATEAgQdcgAdapAdfgIdZDgIdegEEDq+ADocAdi4cEAAMJDqdADIYA=="))
};
//#region  Config Functions
function readConfig() {
    var reg = new RegExp("dec4iot.settings.json");
    var res = require('Storage').list(reg);

    var hasCfg = false;
    if(res.length === 1) hasCfg = true
    if(!hasCfg) return false;

    return require('Storage').readJSON("dec4iot.settings.json");
}

var config = readConfig();

function writeDefaultConfig() {
    if(readConfig().configured) return false;

    require('Storage').writeJSON("dec4iot.settings.json", {
        "configured": false,
        
        "sensor_id": -1,
        "sensor_endpoint": "",
    
        "sensor_update_interval": -1
    });
}
//#endregion  Config Functions

//#region  Android
const startSetupIntent = JSON.stringify({t: "intent", target: "activity", action: "me.byjkdev.dec4iot.intents.banglejs.SETUP", flags: ["FLAG_ACTIVITY_NEW_TASK"]});  // Sending this to Gadgetbridge will start Onboarding App
const sendDataIntent = (data) => { return JSON.stringify({t: "intent", target: "broadcastreceiver", action: "me.byjkdev.dec4iot.intents.banglejs.SEND_DATA", "extra": { "json_data": data }, package: "run.jkdev.dec4iot.jetpack", class: "run.jkdev.dec4iot.jetpack.BangleJsDataReceiver", mimetype: "application/json"}); } // Sending this to Gadgetbridge will tell Onboarding App to send data
function startLogic() {  // run by onboarding app; start logic so no app restart is needed
    g.clear();
    g.reset().clearRect(Bangle.appRect)
    logic(readConfig())
}
//#endregion Android

//#region  Logic
function EMERGENCY() {
    sensors.gatherAllData().then(data => {
        let sendMe = {
            "info": {
                "sensor_id": config.sensor_id,
                "sensor_endpoint": config.sensor_endpoint,
                "mac_address": NRF.getAddress(),

                "bpm_only": false,
                "trigger_manual": true
            },
            "data": data
        };
        
        let dataIntent = sendDataIntent(JSON.stringify(sendMe));
        Bluetooth.println(dataIntent);

        Bangle.on('hrm', hrm => {
            Terminal.println("HRM EVENT RECEIVED")

            let sendMe = {
                "info": {
                    "sensor_id": config.sensor_id,
                    "sensor_endpoint": config.sensor_endpoint,
                    "mac_address": NRF.getAddress(),

                    "bpm_only": true,
                    "trigger_manual": true
                },
                "data": { "hrm": hrm }
            };

            let dataIntent = sendDataIntent(JSON.stringify(sendMe));
            Bluetooth.println(dataIntent);
            sensors.deactivateHRM();

            Bangle.buzz(1000, 1).then(() => Bangle.showClock());
        });
        sensors.activateHRM()
        Terminal.println("HRM ACTIVATED")
    });
}

function logic(config) {
    sensors.activateAcceleration();
    sensors.activateBarometer();
    sensors.activateCompass();

    var layout_start = new Layout({
        type: "v", c: [
            {type: "img", pad: 8, src: big_img},
            {type: "txt", font: "Vector:14", label: "Press button to call", id: "press_button_to_call"},
            {type: "txt", font: "Vector:14", label: "Emergency Services", id: "emergency_services"},
            {type: "btn", pad: 4, label: "SOS", cb: () => {
                E.showPrompt("Please confirm:", {"title": "Emergency", "buttons": {"SOS": 1, "Cancel": 2}}).then(i => {
                    if(i === 1) EMERGENCY();
                    if(i === 2) Bangle.showClock()
                });
            }}
    ]}, {
        btns: [
            {label: "SOS", cb: () => { EMERGENCY() }}
        ]
    });

    layout_start.render();
    
    // Load widgets
    Bangle.loadWidgets();
    Bangle.drawWidgets();
}

//#endregion  Logic

//#region  Setup
function showSetupMsgs() {
    let titleHeight = 60;

    // display messages
    g.setFont("Vector:64").setFontAlign(0, 0).drawString("Setup", g.getWidth() /2 + 4, titleHeight);
    g.setFont("Vector:18").setFontAlign(0, 0).drawString("Check your phone!", g.getWidth() /2, titleHeight + 48);
    g.setFont("6x8").setFontAlign(0, 0).drawString("Continue using the dialogue", g.getWidth() /2, titleHeight + 73);
    g.setFont("6x8").setFontAlign(0, 0).drawString("in the dec4IoT Onboarding App", g.getWidth() /2, titleHeight + 83);

    // Load widgets
    Bangle.loadWidgets();
    Bangle.drawWidgets();
}

if(config === false || !config.configured) {  // No config file found?
    writeDefaultConfig();
    Bluetooth.println(startSetupIntent);  // Start setup!
    showSetupMsgs();
} else logic(config)
//#endregion  Setup