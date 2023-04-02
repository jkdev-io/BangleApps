const http = require('dec4iot_lib_http');

// clear the screen
g.clear();


// redraw the screen
function draw(text) {
  g.reset().clearRect(Bangle.appRect);
  g.setFont("Vector", 20).setFontAlign(0, 0).drawString(text, g.getWidth() / 2, g.getHeight() / 2 + 30);
}

http.get("https://pur3.co.uk/hello.txt").then(data => {
  draw('HTTP success');
});

draw("Hello Lads");

// Load widgets
Bangle.loadWidgets();
Bangle.drawWidgets();
