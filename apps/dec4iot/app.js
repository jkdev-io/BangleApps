const http = require('dec4iot_lib_http');
const sensors = require('dec4iot_lib_sensor');

// clear the screen
g.clear();
g.reset().clearRect(Bangle.appRect);


// Load widgets
Bangle.loadWidgets();
Bangle.drawWidgets();
