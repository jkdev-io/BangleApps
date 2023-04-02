const http = require('dec4iot_lib_http');
const sensordata = require('dec4iot_lib_sensors');

var lastAccelerationData;

// clear the screen
g.clear();
g.reset().clearRect(Bangle.appRect);

g.setFont("Vector", 10).setFontAlign(0, 0).drawString(``, g.getWidth() / 2, g.getHeight() / 2 + 10);

sensordata.accelerationCb = (acc) => {
  lastAccelerationData = acc;
  g.setFont("Vector", 10).setFontAlign(0, 0).drawString(acc, g.getWidth() / 2, g.getHeight() / 2 + 10);
};



// Load widgets
Bangle.loadWidgets();
Bangle.drawWidgets();
