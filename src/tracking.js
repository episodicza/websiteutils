import Cookies from 'js-cookie';

const searchParams = new URLSearchParams(window.location.search);
const hostname = window.location.hostname.includes('webflow') ? window.location.hostname : 'episodic.co.za'

export function saveCode(key, value=null, sessionOnly=false, prefix='eps_') {
    if (value == null) {
        value = searchParams.get(key);
    }
    if (value) {
        const config = {
            domain: hostname,
            path: '/',
            secure: true,
            sameSite: 'lax'
        };
        if (!sessionOnly) {
            config.expires = 7;
        };
        Cookies.set(prefix + key, value, config);
        sessionStorage.setItem(prefix + key, value);
    } 
}

export function getCode(key, prefix='eps_') {
    let val = searchParams.get(key);
    if (val == null) {
        val = sessionStorage.getItem(prefix + key)
    };
    if (val == null) {
        val = Cookies.get(prefix + key);
        if (typeof val == 'undefined') { val = null }
    };
    return val;
}
