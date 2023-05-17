/**
    dec4IoT on Bangle.js
    Copyright (C) 2023 Jakob Kampichler / jkdev

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program. If not, see <https://www.gnu.org/licenses/> or <https://choosealicense.com/licenses/gpl-3.0/>.
**/

var http = require('dec4iot_lib_http');
var sensors = require('dec4iot_lib_sensor');
var Layout = require('Layout');

// Config Functions ===
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
// Config Functions ===

// Android App Interactions ===
var startSetupIntent = JSON.stringify({t: "intent", target: "activity", action: "me.byjkdev.dec4iot.intents.banglejs.SETUP", flags: ["FLAG_ACTIVITY_NEW_TASK"]});  // Sending this to Gadgetbridge will start Onboarding App
function startLogic() {  // run by onboarding app; start logic so no app restart is needed
    g.clear();
    g.reset().clearRect(Bangle.appRect)
    logic(readConfig())
}
// Android App Interactions ===

function logic(config) {
    // clear the screen
    g.clear();
    g.reset().clearRect(Bangle.appRect);


    // Load widgets
    Bangle.loadWidgets();
    Bangle.drawWidgets();
}

// Setup ===
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
// Setup ===