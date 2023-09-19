import Cookies from 'js-cookie';

const searchParams = new URLSearchParams(window.location.search);
const hostname = window.location.hostname.includes('webflow') ? window.location.hostname : 'episodic.co.za'

export function saveCode(key, sessionOnly=false, prefix='eps_') {
    const val = searchParams.get(key);
    if (val) {
        const config = {
            domain: hostname,
            path: '/',
            secure: true,
            sameSite: 'lax'
        };
        if (!sessionOnly) {
            config.expires = 7;
        };
        Cookies.set(prefix + key, val, config);
        sessionStorage.setItem(prefix + key, val);
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
