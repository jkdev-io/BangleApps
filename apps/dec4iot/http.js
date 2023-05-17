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

function request(url, options) {
    return Bangle.http(url, options);
}

exports.get = url => {
    return request(url, {
        'method': "GET"
    });
};

exports.post = (url, body, headers) => {
    return request(url, {
        'method': "POST",
        'body': body,
        'headers': headers
    });
};