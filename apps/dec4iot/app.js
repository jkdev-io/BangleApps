const http = require('dec4iot_lib_http');

// clear the screen
g.clear();


// redraw the screen
function draw(text) {
  g.reset().clearRect(Bangle.appRect);
  g.setFont("Vector", 20).setFontAlign(0, 0).drawString(text, g.getWidth() / 2, g.getHeight() / 2 + 30);
}

http.get("https://banglejs-dec4iot.jkdev.workers.dev/connectivitycheck").then(data => {
  draw(data.resp);
});

draw("Hello Lads");

// Load widgets
Bangle.loadWidgets();
Bangle.drawWidgets();
