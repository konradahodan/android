/***
CyberTourism Mobile App
Load home menu list script
***/
$(document).bind("deviceready", function(){ 
    // jQuery
    toast.showLong('Starting categories list');
    $.getScript('js/ipadress.js', function(){
            toast.showLong('Starting categories list'+IP);
    });
});
