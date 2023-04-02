const http = require('dec4iot_lib_http');

// clear the screen
g.clear();
g.reset().clearRect(Bangle.appRect);

http.post("https://banglejs-dec4iot.jkdev.workers.dev/connectivitycheck", {}, {"this-is-a-header": "from-a-post-request"}).then(data => {
  let json = JSON.stringify(data.resp);
  
  g.setFont("Vector", 10).setFontAlign(0, 0).drawString(`Method: ${json.method}`, g.getWidth() / 2, g.getHeight() / 2 + 70);
  g.setFont("Vector", 10).setFontAlign(0, 0).drawString(`AS: ${json.as}`, g.getWidth() / 2, g.getHeight() / 2 + 50);
  g.setFont("Vector", 10).setFontAlign(0, 0).drawString(`Headers: ${json.headers}`, g.getWidth() / 2, g.getHeight() / 2 + 30);
  g.setFont("Vector", 10).setFontAlign(0, 0).drawString(`Colocation: ${json.colo}`, g.getWidth() / 2, g.getHeight() / 2 + 10);

});

// Load widgets
Bangle.loadWidgets();
Bangle.drawWidgets();
