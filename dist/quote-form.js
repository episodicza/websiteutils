function saveTrackingCookie(tkey, tval, tsession=false) {
    if (tval) {
        var config = {domain: 'episodic.co.za', path:'/', secure: true, sameSite: 'lax'};
        if (!tsession) { config.expires = 7; };
        Cookies.set('eps_'+tkey, tval, config);
    };
};
function saveTracking(tkey, tsession=false, tsp) {
    tsp = (typeof tsp !== 'undefined') ? tsp : new URLSearchParams(location.search);
    const tval = tsp.get(tkey);
    saveTrackingCookie(tkey, tval, tsession);
};
function getTracking(tkey) {
  const tval = new URLSearchParams(location.search).get(tkey);
  if (tval) {return tval};
  return Cookies.get('eps_'+tkey) || '';
};
$(function(){
    const sparams = new URLSearchParams(location.search);
    saveTracking("gclid", false, sparams);
    saveTracking("rx_click_id", true, sparams);
    saveTracking("source", true, sparams);
});
console.log("It Works")
