exports.accelerationCb = (acc) => {
    console.error("Not implemented yet!");
};

exports.pressureCb = (pressure) => {
    console.error("Not implemented yet!");
};

exports.magnetometerCb = (mag) => {
    console.error("Not implemented yet!");
};

exports.gpsCb = (gps) => {
    console.error("Not implemented yet!");
};

Bangle.on('accel', exports.accelerationCb);
Bangle.on('pressure', exports.pressureCb);
Bangle.on('mag', exports.magnetometerCb);
Bangle.on('GPS', exports.gpsCb);

exports.setCompass = onOff => {
    Bangle.setCompassPower(onOff);
};

exports.setPressure = onOff => {
    Bangle.setBarometerPower(onOff);
};

exports.setGps = onOff => {
    Bangle.setGPSPower(onOff);
};
