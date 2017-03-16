console.log("popup.js");

window.onload = function() {

	/*var showLogs = $('#logs').is(':checked');

	$('#logs').on('change', function(){
		console.log("1 message");
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			console.log("Sending message");
	        chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello", logStatus: showLogs }, function(response) {
	            console.log(response.farewell);
	        });
	    });
	});*/

	$('#logs').change(function(){
		console.log("checkbox clicked");
	    if ($(this).is(':checked')) {
	        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				console.log("Sending message");
		        chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello", logStatus: true }, function(response) {
		            //console.log(response.farewell);
		        });
		    });
	    } else {
	    	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
				console.log("Else-Sending message");
		        chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello", logStatus: false }, function(response) {
		            //console.log(response.farewell);
		        });
		    });
	    }
	});

	$('#btn').on('click', function(){
		console.log("Listening the click event...");
		alert("Are you sure !!!");
	});


 } //Window.onload