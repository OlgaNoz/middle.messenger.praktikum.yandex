export interface Options {
    data?: object;
    headers?: object;
    timeout?: number;
    method?: string;
}

const METHODS = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
};

function queryStringify(data: object) {
    let result = "?";
    for (const [key, value] of Object.entries(data)) {
        result += `${key}=${value}&`;
    }
    result = result.substr(0, result.length - 1);
    return result;
}

export class HTTPTransport {
    get = (url: string, options: Options = {}) => {
        if (options.data) {
            url += queryStringify(options.data);
        }
        return this.request(url, {...options, method: METHODS.GET}, options.timeout);
    };

    post = (url: string, options: Options = {}) => {
        return this.request(url, {...options, method: METHODS.POST}, options.timeout);
    };

    put = (url: string, options: Options = {}) => {
        return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
    };

    delete = (url: string, options: Options = {}) => {
        return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
    };

    // options:
    // headers — obj
    // data — obj
    request = (url: string, options: Options, timeout = 5000) => {
        const {method, data, headers} = options;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method !== undefined ? method : METHODS.GET, url);

            xhr.onload = function() {
                resolve(xhr);
            };
            
            if (headers) {
                for (const [key, value] of Object.entries(headers)) {
                    xhr.setRequestHeader(key, value);
                }
            }

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = function() {
                reject;
                throw new Error("Превышено время ожидания");
            };

            if (method === METHODS.GET || !data) {
                xhr.send();
            } else {
                xhr.send(JSON.stringify(data));
            }
        });
    };
}
