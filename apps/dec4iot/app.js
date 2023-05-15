var http = require('dec4iot_lib_http');
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

// Android App Interactions ===
var startSetupIntent = JSON.stringify({t: "intent", target: "activity", action: "me.byjkdev.dec4iot.intents.banglejs.SETUP", flags: ["FLAG_ACTIVITY_NEW_TASK"]});  //Sending this to Gadgetbridge will start Android App
// Android App Interactions ===

// clear the screen
g.clear();
g.reset().clearRect(Bangle.appRect);

var config = readConfig();

function showSetupMsgs() {
    g.setFont("6x8:2x3").setFontAlign(0, 0).drawString("Please setup your device!", g.getWidth() /2, g.getHeight() /2 - 30);
    g.setFont("6x8").setFontAlign(0, 0).drawString("Check your phone!", g.getWidth() /2, g.getHeight() /2 + 10);
    g.setFont("6x8").setFontAlign(0, 0).drawString("A dialogue should've opened,", g.getWidth() /2, g.getHeight() /2 + 30);
    g.setFont("6x8").setFontAlign(0, 0).drawString("follow the steps to continue!", g.getWidth() /2, g.getHeight() /2 + 50);
}

if(config === false || !config.configured) {  // No config file found?
    writeDefaultConfig();  // Write defaults
    Bluetooth.println(startSetupIntent);  // Start setup!
    showSetupMsgs();  // Tell user
} else logic(config)


// Logic
function logic(config) {
    // Future big brain stuff
}

// Load widgets
Bangle.loadWidgets();
Bangle.drawWidgets();
