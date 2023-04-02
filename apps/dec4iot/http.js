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