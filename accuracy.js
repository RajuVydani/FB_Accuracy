console.log("Videos-Improve Accuracy !!!");

window.onload = function() {

	var showLogs = false;

	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	        console.log("listening messages...");
	        console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");

	        if (request.greeting === "hello") {
	            showLogs = request.logStatus;
	            console.log("showLogs", showLogs);
	            sendResponse({farewell: "goodbye"});
	        }
	});

$(document).ready(function(){
	
	function log(message, value) {
	 	if(showLogs) {
	 		console.log(message, value);
	 	}
	}

	var userName = $('div._5knz').text();
	var userTooltipName = $('div._1h9c a').attr('data-tooltip-content');

	console.log("userName", userName);
	console.log("userTooltipName", userTooltipName);

	//Users object.
	var user = {
		"agent1" : ["Absolutely Certain", "Online Pharm"],
		"Rubesh" : ["Weapon Sale", "Absolutely Certain", "Online Pharm"],
		"Avik"   : ["Weapon Sale", "Absolutely Certain"]
	};

	if(undefined !== user[userName]) {

		//"clickTags" -stores all the extracted all the tags for the loggedin user from var "user".
		//It will be used by "MouseClick" events.
		//var clickTags = user[userName].split(",");
		var clickTags = user[userName];

		//Hardcode all the tags with Keycode for which, alerts needs to be shown !!!
		var keysCollection = {
			"Weapon Sale": ["88-Weapon Sale", "120-Weapon Sale"],
			"Absolutely Certain": ["70-Absolutely Certain", "102-Absolutely Certain"],
			"Online Pharm": ["65-Online Pharm", "97-Online Pharm"]
		};

		//Tags used for keyPresses.
		var keyPressTags = [];

		//Captures Mouse clicks...
		$.each(clickTags, function(index, value){
			var inputString = "input[type=\"radio\"][value=\"" + value + "\"]";
			log(inputString);

			//Captures Mouse clicks...
			$('div#content').on('click', inputString, function(){
				log("Listening the click event...");
				alert("Are you sure !!!");
			});

			//Building keyPressTags
			if(undefined !== keysCollection[value]) {
				keyPressTags.push(keysCollection[value][0]);
				keyPressTags.push(keysCollection[value][1]);
			}
		});

		log("Tags under \"MouseClick\" event", clickTags);
		log("Tags under \"keyPress\" event", keyPressTags);

		//Captures Keypresses...
		$(document).on('keypress', function(event){
			log("Key pressed--->"+event.which);
			
			if($('div._5awe').length > 0) { //Checking "arrow status bar" has data

				//Fetches all the tags in the "arrow status bar" in an array.
				var tags = getText('div._5awe');
				log("Tags in Arrow status bar::", tags);

				//Gets the key pressed, the last tag present in arrow bar and put in the format "88-Weapon Sale"
				//Then checks whether this combination is there in given set of combinations [keyPressTags].
				if(-1 !== $.inArray(event.which + "-" + tags[tags.length-1], keyPressTags)) {
					alert("Are you sure ???");
				}
			}//.............................Checking "arrow status bar" has data
		});

		//Fetches all the tags in an array.
		function getText(element) {
			var tags = [];
			$(element).each(function() {
				tags.push($(this).text());
			});
			return tags;
		}
	} else {
		console.error("=================>loggedin user not in the list");
	} // LoggedInUser
}); //document.ready
};  // window.onload

//working ids -_4bl7.mlm / notranslate
//arrow span -div._5awe

/*
for (var i = 65; i <= 90; i++) {
    	console.log(i+"-"+String.fromCharCode(i)+","+);
}
ASCII values for alphabets.
"65": "A",    
"66": "B",    "67": "C",    "68": "D",    "69": "E",    "70": "F",    
"71": "G",    "72": "H",    "73": "I",    "74": "J",    "75": "K",    
"76": "L",    "77": "M",    "78": "N",    "79": "O",    "80": "P",    
"81": "Q",    "82": "R",    "83": "S",    "84": "T",    "85": "U",    
"86": "V",    "87": "W",    "88": "X",    "89": "Y",    "90": "Z",    
"96": "`",    "97": "a",    "98": "b",    "99": "c",    "100": "d",    
"101": "e",    "102": "f",    "103": "g",    "104": "h",    "105": "i",    
"106": "j",    "107": "k",    "108": "l",    "109": "m",    "110": "n",    
"111": "o",    "112": "p",    "113": "q",    "114": "r",    "115": "s",    
"116": "t",    "117": "u",    "118": "v",    "119": "w",    "120": "x",    
"121": "y",    "122": "z",    
*/