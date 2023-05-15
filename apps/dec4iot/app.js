const http = require('dec4iot_lib_http');
const sensors = require('dec4iot_lib_sensor');

// clear the screen
g.clear();
g.reset().clearRect(Bangle.appRect);

const configManager = require('dec4iot_lib_cfgman');
const startSetupIntent = {t: "intent", target: "activity", action: "me.byjkdev.dec4iot.intents.banglejs.SETUP", flags: ["FLAG_ACTIVITY_NEW_TASK"]};  //Sending this to Gadgetbridge will start Android App

let config = configManager.readConfig();

function showSetupMsgs() {
    g.setFont("6x8").setFontAlign(0, 0).drawString("Please setup your device!", g.getWidth() /2, g.getHeight() /2 - 30);
    g.setFont("4x8").setFontAlign(0, 0).drawString("Check your phone!", g.getWidth() /2, g.getHeight() /2 + 10);
    g.setFont("4x8").setFontAlign(0, 0).drawString("A dialogue should've opened,", g.getWidth() /2, g.getHeight() /2 + 30);
    g.setFont("4x8").setFontAlign(0, 0).drawString("follow the steps to continue!", g.getWidth() /2, g.getHeight() /2 + 50);
}

if(config === false) {  // No config file found?
    configManager.writeDefaultConfig();  // Write defaults
    Bluetooth.println(JSON.stringify(startSetupIntent));  // Start setup!
    showSetupMsgs();  // Tell user
} else {

    if(!config.configured) {  // Config invalid; Start setup!
        Bluetooth.println(JSON.stringify(startSetupIntent));
        showSetupMsgs();  // Tell user

    } else logic(config)  // Config valid; Start the logic!
    
}


// Logic
function logic(config) {
    // Future big brain stuff
}

// Load widgets
Bangle.loadWidgets();
Bangle.drawWidgets();
