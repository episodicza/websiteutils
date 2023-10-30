var Webflow = Webflow || [];
Webflow.push(function () {
    $(function(){
        const tabName = new URLSearchParams(window.location.search).get("tab");
        if (tabName){
            $('#' + tabName).triggerHandler('click');
        }    
    });
});
