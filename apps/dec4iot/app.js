const SERVICE = "34defd2c-c8fe-b18e-9a70-591970cba32b";
const ble_filler = [0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF, 0xFF];

//BLE Code
const EspDownlink = {
  characteristics: {},
  advertiseUUIDs: [],

  bindMe: function() {
    let keys = Object.keys(this);
    keys.forEach(e => {
      if(e === "bindMe") { return; }
      if(e.startsWith("__")) { return; }
      if(typeof this[e] !== "function") { return; }

      this[e].bind(this);

      return;
    });
  },
  startAdvertising: function(name) {
    let advertiseThis = {};
    let services = {};
    services[SERVICE] = this.characteristics;
    advertiseThis[SERVICE] = undefined;

    NRF.setServices(services, { advertise: this.advertiseUUIDs, uart: false });

    NRF.setAdvertising({}, {
      "name": name,
      "showName": true,
      "manufacturer": 0x0590,
      "manufacturerData": JSON.stringify({})
    });
  },
  __charUpdate: function() {
    let services = {};
    services[SERVICE] = this.characteristics;

    try {
      NRF.updateServices(services);
    } catch(e) {
      if(e.message.includes("Can't update services until BLE restart")) { return; }
      else { throw e; }
    }
  },
  addCharacteristic: function(uuid, data) {
    this.characteristics[uuid] = data;
    this.advertiseUUIDs.push(uuid);
    return this.characteristics;
  },
  updateCharacteristic: function(uuid, data) {
    this.characteristics[uuid] = data;
  },
  updateCharacteristics: function() { this.__charUpdate(); }
};
(() => {
  EspDownlink.bindMe.bind(EspDownlink);
  EspDownlink.bindMe();
})();
const BleInit = {
  "value": filler,
  "readable": true,
  "writable": false,
  "notify": true
};

// Utility functions
function hours(hours) {
  return hours * 60 * 60 * 1000;
}

function minutes(minutes) {
  return minutes * 60 * 1000;
}

function seconds(seconds) {
  return seconds * 1000;
}

// Actual code from now
const getSensorFuns = {
  "battery": Puck.getBatteryPercentage,
  "temperature": E.getTemperature,
};

const BleNumbers = {
  "battery": 0x2A19,
  "button": 0x2AE2,
  "movement": 0x2C01,
  "heartrate": 0x2A37,
  "lat": 0x2AAE,
  "long": 0x2AAF,
  "barometricpressure": 0x2A6D,
  "altitude": 0x2AB3,
  "temperature": 0x2C02
};

const sensors = [
  'battery',
  'temperature',
  'movement',
  'button',
  'heartrate',
  'location',
  'barometricpressure'
];

// clear the screen
g.clear();

var n = 0;

// redraw the screen
function draw(text) {
  g.reset().clearRect(Bangle.appRect);
  g.setFont("Vector",10).setFontAlign(0,0).drawString(text,g.getWidth()/2,g.getHeight()/2 + 30);
}

Bangle.http("https://pur3.co.uk/hello.txt").then(data=>{
  draw(data.text);
});

draw("Hello Lads");

// Load widgets
Bangle.loadWidgets();
Bangle.drawWidgets();
