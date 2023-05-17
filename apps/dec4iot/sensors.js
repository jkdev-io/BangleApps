/**
    dec4IoT on Bangle.js
    Copyright (C) 2023 Jakob Kampichler / jkdev

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program. If not, see <https://www.gnu.org/licenses/> or <https://choosealicense.com/licenses/gpl-3.0/>.
**/

let acclCb = (a) => {};
let compCb = (a) => {};
let baroCb = (a) => {};
let gpsCb = (a) => {};
let hrmCb = (a) => {};

let data = {
    accl: {},
    comp: {},
    baro: {},
    gps: {},
    hrm: {}
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

function internalHrmCb(hrm) {
    if(currentlyGathering) { data.hrm = hrm }

    hrmCb(hrm);
}
function activateHRM() {
    Bangle.setHRMPower(true, "dec4iot");
    Bangle.on('HRM', internalHrmCb);
}
function deactivateHRM() {
    Bangle.setHRMPower(false, "dec4iot");
    Bangle.on('HRM', (x) => {})
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
        activateHRM();

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
        deactivateHRM();
    });
}

module.exports = {
    acclCb,
    compCb,
    baroCb,
    gpsCb,
    hrmCb,

    activateAcceleration,
    activateBarometer,
    activateCompass,
    activateGPS,
    activateHRM,

    deactivateAcceleration,
    deactivateBarometer,
    deactivateCompass,
    deactivateGPS,
    deactivateHRM,

    gatherAllData
}