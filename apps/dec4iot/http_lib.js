const httpReq = (url, options) => {
    return Bangle.http(url, options);
};

exports.httpGet = (url) => {
    return httpReq(url, {
        method: 'GET'
    });
};

exports.httpPost = (url, body, headers) => {
    return httpReq(url, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: headers
    });
};

exports.httpReq = httpReq;