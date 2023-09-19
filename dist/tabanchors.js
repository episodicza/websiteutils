(function () {
    'use strict';

    var Webflow = Webflow || [];
    Webflow.push(function () {
        const tabName = new URLSearchParams(window.location.search).get("tab");
        if (!tabName) return;
        $('#' + tabName).triggerHandler('click');
    });

})();
