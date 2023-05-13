var http = require('dec4iot_lib_http');
var sensors = require('dec4iot_lib_sensor');

// clear the screen
g.clear();
g.reset().clearRect(Bangle.appRect);

var configManager = require('dec4iot_lib_cfgman');

var startSetupIntent = {t: "intent", target: "activity", action: "me.byjkdev.dec4iot.intents.banglejs.SETUP"};

const config = require('dec4iot_lib_cfgman').readConfig();
if(config === false) {
    configManager.writeDefaultConfig();

    Bluetooth.println(JSON.stringify(startSetupIntent));
} else {

}


// Load widgets
Bangle.loadWidgets();
Bangle.drawWidgets();
