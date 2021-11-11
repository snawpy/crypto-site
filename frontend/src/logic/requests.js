import * as cookies from './cookies';




export function request(requestMethod, url, postBody=null, requiresLoggedInUser=true) {

    // break these into functions make it clear what each one is doing

    const jsonBodyStringified = postBody !== null 
        ? JSON.stringify(postBody)
        : null;

    let requestData = {
        method: requestMethod,
        headers: {'Content-Type': 'application/json' }
    };

    if (jsonBodyStringified) {
        requestData.body = jsonBodyStringified;
    }
    
    const userToken = requiresLoggedInUser ? cookies.getUserToken() : null;
    
    if (userToken) {
        requestData.headers.Authorization = userToken;
    }

    let status = null;
    let statusText = null;
    let ok = null;

    return fetch(url, requestData).then(response => {
        status = response.status;
        statusText = response.statusText;
        ok = response.ok;

        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            return response.json();
        }
        else {
            return null;
        }
        
    }).then(responseBody => {
        return {
            status: status,
            statusText: statusText,
            ok: ok,
            data: responseBody
        };
    });

}

// anonymous request methods
export function GetAnonymous(url) {
    return request('GET', url, null, false);
}

export function PostAnonymous(url, body) {
    return request('POST', url, body, false);
}

// signed in request methods
export function Get(url) {
    return request('GET', url);
}

export function Post(url, body) {
    return request('POST', url, body);
}

export function Put(url, body) {
    return request('PUT', url, body);
}

export function Delete(url) {
    return request('DELETE', url);
}

