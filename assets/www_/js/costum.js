/***
CyberTourism Mobile App
Load home menu list script
***/
$(document).bind("deviceready", function(){ 
	// jQuery
	$.getScript('js/ipadress.js', function()
	{
	//Global variable
	isAndroid = false;
	isBlackberry = false;
	isIphone = false;
	isWindows = false;
	isConnected = false;
	isHighSpeed = false;
	var internetInterval;




	//check device type
	switch (device.platform){
		case "Android":
			isAndroid = true;
			AndroidDeviceProcess();
			//start Global Android Process Function
		 	// detect for network access
		 	networkDetection();
		 	// execute any events at start up
		 	executeEvents();

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

	//All android device process
	function AndroidDeviceProcess(){
		toast.showLong('Starting at '+IP);
		//Loading ressources menu 
			getHomeMenuList();					
	} 



//Global process for all device
//get home menu data
function getHomeMenuList() {	
	$('#root-listview li').remove();
	$('<li>').attr({'data-role':'list-divider'}).append('Services Offerts').appendTo('#root-listview');
	$.getJSON(serviceURL+'home_menu.php', function(data) {
		//Loading ressources menu 
		toast.showLong('Connecting to the server');
		menus = data.items;
		$.each(menus, function(index, menu) {
			var img = $('<img>').attr({'src':serviceURL+menu.logo});
			var h3 = $('<h3>').append($('<strong>').append(menu.libelle));
			var p = $('<p>').append(menu.description);
			var a = $('<a>').attr({'href':'sub_menu.html?id='+menu.id}).append(img).append(h3).append(p);
			$('<li>').append(a).appendTo('#root-listview');
		});

		$('<li>').attr({'data-role':'list-divider'}).append($('<p>').append('Dernière mise à jour le').append($('<span>').attr({'class':'ui-li-count'}).append('12-10-2014'))).appendTo('#root-listview');
		$('#root-listview').listview('refresh');
	});
}

//ajax error testing
$(document).ajaxError(function(event, request, settings) {
	toast.showLong('Error accessing to the server');
	getHomeMenuList();
});




	//check network state
function networkDetection() {
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

function onOnline() {
 	isConnected = true;
}

function onOffline() {
 	isConnected = false;
}

//trigger event process
function executeEvents() {
 		// attach events for online and offline detection
 		document.addEventListener("online", onOnline, false);

		// attach events for online and offline detection
 		document.addEventListener("offline", onOffline, false);
 		// set a timer to check the network status
 		internetInterval = window.setInterval(function() {

 	if (navigator.network.connection.type != Connection.NONE) {
 		onOnline();
 		//toast.showLong("Online");
 	} else {
 		onOffline();
 		toast.showLong("Offline");
 	}

 	}, 10000);
}
});
});

//Multilanguage script
$(function() {
    var lang = 'en';
    $.ajax({
        url: '../langs.xml',
        success: function(xml) {
            $(xml).find('translation').each(function(){
                var id = $(this).attr('id');
                var text = $(this).find(lang).text();
                $("." + id).html(text);
            });
        }
    });
}); //end function