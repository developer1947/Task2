import { getObjByKey } from "./Storage";

export const POSTNETWORK = async (url, payload, token = false) => {
    let headers = {
        'Accept': 'application/json',
        'Content-Type':  'application/json'
        // 'Content-Type': 'multipart/form-data'

    };
    if (token) {
        let loginRes = await getObjByKey('loginResponse');
        // let loginAdminRes = await getObjByKey('loginAdminResponse');
        // headers = {...headers, Authorization: 'Bearer ' + loginAdminRes};
        // headers = { ...headers, Authorization: loginRes.token }
        headers = { ...headers, Authorization:`Bearer ${loginRes}` }
        // console.log("________________________________Retrieved Token",loginRes)


    }
    return await fetch(url, {
        method: 'POST',
        headers: headers,
        redirect: 'follow',
        body: JSON.stringify(payload)
    }).then((response) => response.json())
        .then((response) => {
            return response
        }).catch(error => {
            console.log('error' + error);
        });
}




export const GETNETWORK = async (url, token = false) => {
    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    if (token) {
        let loginRes = await getObjByKey('loginResponse');
        headers = { ...headers, Authorization: "Bearer " + loginRes };
    }

    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: headers
        });

        if (!response.ok) {
            throw new Error(`error status: ${response.status}`);
        }

        const jsonResponse = await response.json();
        return jsonResponse;
    } catch (error) {
        console.error('error', error.message);
        throw error; 
    }
};


export const DELETENETWORK = async (url, token = false) => {
    let headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };

    if (token) {
        let loginRes = await getObjByKey('loginResponse');
        headers = { ...headers, Authorization: "Bearer " + loginRes };
    }

    try {
        const response = await fetch(url, {
            method: 'DELETE',
            headers: headers
        });

        if (!response.ok) {
            throw new Error(`error status: ${response.status}`);
        }

        const jsonResponse = await response.json();
        return jsonResponse;
    } catch (error) {
        console.error('Error', error.message);
        throw error; 
    }
};
