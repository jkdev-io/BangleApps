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
    let titleHeight = 60;

    g.setFont("Vector:64").setFontAlign(0, 0).drawString("Setup", g.getWidth() /2 + 4, titleHeight);
    g.setFont("Vector:18").setFontAlign(0, 0).drawString("Check your phone!", g.getWidth() /2, titleHeight + 48);
    g.setFont("6x8").setFontAlign(0, 0).drawString("Continue using the dialogue", g.getWidth() /2, titleHeight + 73);
    g.setFont("6x8").setFontAlign(0, 0).drawString("in the dec4IoT Onboarding App", g.getWidth() /2, titleHeight + 83);
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
