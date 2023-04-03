const http = require('dec4iot_lib_http');

var lastAccelerationData;

// clear the screen
g.clear();
g.reset().clearRect(Bangle.appRect);

g.setFont("Vector", 10).setFontAlign(0, 0).drawString(``, g.getWidth() / 2, g.getHeight() / 2 + 10);

Bangle.on('accel', (acc) => {
  lastAccelerationData = acc;
});



// Load widgets
Bangle.loadWidgets();
Bangle.drawWidgets();
