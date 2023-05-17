let acclCb = (a) => {};
let compCb = (a) => {};
let baroCb = (a) => {};
let gpsCb = (a) => {};

let data = {
    accl: {},
    comp: {},
    baro: {},
    gps: {}
}

let currentlyGathering = false;

function internalAccelCb(accel) {
    if(currentlyGathering) { data.accl = accel }

    acclCb(accel);
}
function activateAcceleration() {
    Bangle.on('accel', internalAccelCb);
}
function deactivateAcceleration() {
    Bangle.on('accel', (x) => {})
}

function internalCompassCb(mag) {
    if(currentlyGathering) { data.comp = mag }

    compCb(mag)
}
function activateCompass() {
    Bangle.setCompassPower(1);
    Bangle.on('mag', internalCompassCb);
}
function deactivateCompass() {
    Bangle.setCompassPower(0);
    Bangle.on('mag', (x) => {});
}

function internalBaroCb(bar) {
    if(currentlyGathering) { data.baro = bar }

    baroCb(bar);
}
function activateBarometer() {
    Bangle.setBarometerPower(true);
    Bangle.on('pressure', internalBaroCb);
}
function deactivateBarometer() {
    Bangle.setBarometerPower(false);
    Bangle.on('pressure', (x) => {});
}

function internalGpsCb(gps) {
    if(currentlyGathering) { data.gps = gps }

    gpsCb(gps);
}
function activateGPS() {
    Bangle.setGPSPower(1, "dec4iot");
    Bangle.on('GPS', internalGpsCb);
}
function deactivateGPS() {
    Bangle.setGPSPower(0, "dec4iot");
    Bangle.on('GPS', (x) => {});
}

function allTrue(object) {
    for (let key in object) {
        if (!object[key]) {
            return false;
        }
    }
    return true;
}

function gatherAllData() {
    return new Promise((res, rej) => {
        activateAcceleration();
        activateBarometer();
        activateCompass();
        activateGPS();

        currentlyGathering = true;

        let done = {
            accl: false,
            comp: false,
            baro: false,
            gps: false
        }

        let intervalId = setInterval(() => {
            Object.keys(data).forEach(i => {
                let e = data[i];
                if(e !== {}) {done[i] = true;}
            });

            if(allTrue(done)) {
                currentlyGathering = false;
                clearInterval(intervalId);
                res(data);
            }

        }, 500);

        deactivateAcceleration();
        deactivateBarometer();
        deactivateCompass();
        deactivateGPS();
    });
}

module.exports = {
    acclCb,
    compCb,
    baroCb,
    gpsCb,

    activateAcceleration,
    activateBarometer,
    activateCompass,
    activateGPS,

    deactivateAcceleration,
    deactivateBarometer,
    deactivateCompass,
    deactivateGPS,

    gatherAllData
}