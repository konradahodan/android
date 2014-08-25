/***
CyberTourism Mobile App
Load home menu list script
***/

// Global variable that will tell us whether PhoneGap is ready
var isPhoneGapReady = false;
// Default all phone types to false
var isAndroid = false;
var isBlackberry = false;
var isIphone = false;
var isWindows = false;
// Store the device's uuid
var deviceUUID;
// Store the current network status
var isConnected = false;
var isHighSpeed;
var internetInterval;
var currentUrl;



function init(url) {
    if (typeof url != 'string') {
        currentUrl = location.href;
    } else {
        currentUrl = url;
    }

    if (isPhoneGapReady) {
        onDeviceReady();
    } else {
    // Add an event listener for deviceready
    document.addEventListener("deviceready",
        onDeviceReady, false);
    }
}

function onDeviceReady() {
 // set to true
 isPhoneGapReady = true;
 deviceUUID = device.uuid;
 // detect the device's platform
 deviceDetection();
 // detect for network access
 networkDetection();
 // execute any events at start up
 executeEvents();
 // execute a callback function
 //executeCallback();
}

function executeEvents() {
 if (isPhoneGapReady) {
 // attach events for online and offline detection
 document.addEventListener("online", onOnline, false);
 document.addEventListener("offline", onOffline, false);
 // set a timer to check the network status
 internetInterval = window.setInterval(function() {
 if (navigator.network.connection.type != Connection.NONE) {
    onOnline();
 } else {
    onOffline();
    toast.showLong("No internet acces");
 }

 }, 5000);}
}


function executeCallback() {
 if (isPhoneGapReady) {
 // get the name of the current html page
 var pages = currentUrl.split("/");
 var currentPage = pages[pages.length - 1].
 slice(0, pages[pages.length - 1].indexOf(".html"));
 // capitalize the first letter and execute the function
 currentPage = currentPage.charAt(0).toUpperCase() +
 currentPage.slice(1);
 if (typeof window['on' + currentPage + 'Load'] ==
 'function') {
 window['on' + currentPage + 'Load']();
 }}
}

function deviceDetection() {
 if (isPhoneGapReady) {
    switch (device.platform) {
        case "Android":
            isAndroid = true;
            toast.showLong("Android device");
            $.getScript('js/ipadress.js', function(){
                AndroidDeviceProcess();
            });
            
            break;
        case "Blackberry":
            isBlackberry = true;
            break;
        case "iPhone":
            isIphone = true;
            break;
        case "WinCE":
            isWindows = true;
            break;
    }
 }
}

    //All android device process
    function AndroidDeviceProcess(){
        toast.showLong('Starting at '+IP);
        //Loading  menu 
            getHomeMenuList();                  
    } 

$(document).on('pagebeforeshow', '#home', function(){      
    
});

function networkDetection() {
 if (isPhoneGapReady) {
 // as long as the connection type is not none,
 // the device should have Internet access
 if (navigator.network.connection.type != Connection.NONE) {
    isConnected = true;
 }
 // determine if this connection is high speed or not
 switch (navigator.network.connection.type) {
    case Connection.UNKNOWN:
    case Connection.CELL_2G:
        isHighSpeed = false;
        break;
    default:
        isHighSpeed = true;
        break;
    }
 }
}

function onOnline() {
 isConnected = true;
}
function onOffline() {
 isConnected = false;
}


//get home menu data
function getHomeMenuList() {  
    //toast.showLong('Starting at '+IP);
    $.mobile.loading('show');
    $('#root-listview li').remove();
    $('<li>').attr({'data-role':'list-divider'}).append('Services Offerts').appendTo('#root-listview');
    var jqxhr = $.getJSON(serviceURL+'home_menu.php', function(data) {
        //Loading ressources menu 
        //toast.showLong('Loading home menu');
        menus = data.items;
        $.each(menus, function(index, menu) {
            var img = $('<img>').attr({'src':serviceURL+menu.logo});
            var h3 = $('<h3>').append($('<strong>').append(menu.libelle));
            var p = $('<p>').append(menu.description);
            var a = $('<a>').attr({'href':'cat_culture.html?id='+menu.id}).append(img).append(h3).append(p);
            $('<li>').append(a).appendTo('#root-listview');
        });
        var date = new Date();
        $('<li>').attr({'data-role':'list-divider'}).append($('<p>').append('Dernière mise à jour le').append($('<span style="font-size:0.1em">').attr({'class':'ui-li-count'}).append(date))).appendTo('#root-listview');
        $('#root-listview').listview('refresh');
    });

    jqxhr.complete(function() {
        $.mobile.loading('hide');
    });
}

//ajax error testing
$(document).ajaxError(function(event, request, settings) {
    toast.showLong('No acces to server');
    getHomeMenuList();
});


// Set an onload handler to call the init function
window.onload = init;
