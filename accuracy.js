console.log("Videos-Improve Accuracy !!!");

window.onload = function() {

	var showLogs = true;

	/*chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	        console.log("listening messages...");
	        console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");

	        if (request.greeting === "hello") {
	            showLogs = request.logStatus;
	            console.log("showLogs", showLogs);
	            sendResponse({farewell: "goodbye"});
	        }
	});*/

$(document).ready(function(){
	/////Adding Custom alert
	//using Jquery UI Theme -sunny.
	$('body').append(
	    $('<div/>', {'id': 'dialog'})
	    .append(
            $('<span/>', {text: 'Based on your accuracy trend, this can be an incorrect decision !!!'})
	    )
	    .append(
	    	$('<br><br>')
	    )
	    .append(
	    	$('<span/>', {text: 'Please review  the Job Once again \u263A'}) // '\u263A' is for smiley
	    )
	);
	
	$('#dialog').dialog({
		title: 'Alert !!!',
		draggable: false,
		resizable: false,
		autoOpen: false,
		modal: true,
		width: 410,
		closeOnEscape: false
	});	
	
	/////
	
	function log(message, value) {
	 	if(showLogs) {
	 		console.log(message, value);
	 	}
	}

	//Getting the user data from the bottom of the file.
	var user = getUsers();
	//console.log("A Sravanthi", user["A Sravanthi"]);

	var userName = $('div._5knz').text();
	var userTooltipName = $('div._1h9c a').attr('data-tooltip-content');

	console.log("userName", userName);
	console.log("userTooltipName", userTooltipName);

	//Adding users for testing.
	user["Rubesh Kumar"] = [
						"Entertainment/gaming-No, none of the below-Absolutely Certain",
						"Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
						"Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
						"None of the products/services below-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain"
				   	 ];
	user["Avik"]   = [
						"Adult product/service (explicit sale of)-Absolutely Certain",
						"Non-Adult Health Physical Improvement (explicit sale of)-Clinic non-surgical services (ex: dental non-surgery)-No, none of the below-Absolutely Certain",
						"None of the products/services below-Profanity-Absolutely Certain"
				   	 ];
	//If LoggedInUser not present in the users list here, throws error.
	if(undefined !== user[userTooltipName]) {
		//"clickTags" -stores all the extracted tags for the loggedin user from var "user".
		//It will be used by "MouseClick" events.
		var clickTags = user[userTooltipName];

		log("Tags under \"MouseClick\",\"Keypress\" events", clickTags);

		//Captures Mouse clicks...
		$('div#content').on('click', "input[type=\"radio\"][value=\"Absolutely Certain\"]", function(){
			//console.log(getTags(), clickTags);
			setTimeout(function(){
				if(-1 !== $.inArray(getTags(), clickTags)) {  //if getTags() will be there in "clickTags", goes in.
					console.log("Listening the click event...");
					//alert("Are you sure !!!");
					$('#dialog').dialog("open");
				}
		    }, 200);
		});

		//Captures Keypresses...
		$(document).on('keypress', function(event){
			log("Key pressed--->"+event.which);
			if(70 === event.which || 102 === event.which || 13 === event.which) {
				if(-1 !== $.inArray(getTags(), clickTags)) {  //if getTags() will be there in "clickTags", goes in.
					console.log("Listening the Press event...");
					$('#dialog').dialog("open");
				}
			}
		});

		//Fetches all the tags in the "arrow status bar" in an array.
		function getTags() {
			console.log("getTags");
			if($('div._5awe').length > 0) { //Checking "arrow status bar" has data
				var tag = "";
				var count = 0;
				$('div._5awe').each(function() {
					if(count == 0) {
						tag = $(this).text();
					} else {
						tag = tag +"-"+ $(this).text();
					}
					count++;
				});
				console.log("Tags in Arrow status bar::", tag);
			}//.............................Checking "arrow status bar" has data
			return tag;
		}
		//Mutation Observer START
		var observer = new MutationObserver(function(mutations) {
		    mutations.forEach(function(mutation) {
		      console.log("mutation.type = " + mutation.type);
		      console.log("Content", mutation.target);
		      console.log("Calling rest API>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
		      //postRequest();
		      //Getting the case details
		      console.log($('span._3-90._c24').text());
		    });
		  });

		setTimeout(function(){
			console.log("Adding Mutation Observers>>>");
			observer.observe($('div._962 div:nth-child(3)')[0], { subtree: true, attributes: true, childList: true, characterData: true });
		}, 20000);
		//Mutation Observer END

		//Rest calls START
		function postRequest() {
			log("In PostRequest", userName);
			//var url = "http://10.142.131.108:8088/api/";
			var url = "http://localhost:4000/api/";

			var href = url + userName;
			log(href, null);
			$.ajax({
			    url: href,
			    type: "POST",
			    //dataType: "json",
			    async: false,
			    success: function (data) {
			        console.info(data);
			    },
			    error: function (data) {
			   		console.error("error while doing POST ajax call");
			    }
			});
		}
		//Rest calls END
	} else {
		console.error("=================>loggedin user not in the list");
	} // LoggedInUser

//============================================USERS-DATA==========================================================================
	function getUsers() {
	var user = 
				{
				  "A Sravanthi": [
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain",
				    "Alcohol (explicit sale of)-None of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Cosmetic services (ex: waxing)-No, none of the below-Absolutely Certain",
				    "News-No, none of the below-Absolutely Certain"
				  ],
				  "Abdul Aleem": [
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Clinic non-surgical services (ex: dental non-surgery)-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Profanity-Absolutely Certain",
				    "Adult product/service (explicit sale of)-Absolutely Certain"
				  ],
				  "Afsha Tahseen": [
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Alcohol (explicit sale of)-None of the below-Absolutely Certain",
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Profanity-Absolutely Certain",
				    "None of the products/services below-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Surgery-No, none of the below-Absolutely Certain"
				  ],
				  "Anusha Regulagadda": [
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "Alcohol (explicit sale of)-None of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Profanity-Absolutely Certain",
				    "News-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain"
				  ],
				  "ARDHI DEEPAK RAO": [
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "Alcohol (explicit sale of)-None of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain",
				    "None of the products/services below-Profanity-Absolutely Certain",
				    "Adult Health (explicit sale of)-Surgery-No, none of the below-Absolutely Certain"
				  ],
				  "Ashwini Gandla": [
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Alcohol (explicit sale of)-None of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Cosmetic services (ex: waxing)-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Clinic non-surgical services (ex: dental non-surgery)-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain"
				  ],
				  "Ashwini Sneha": [
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Alcohol (explicit sale of)-None of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Clinic non-surgical services (ex: dental non-surgery)-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Profanity-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain"
				  ],
				  "B Rama kanth": [
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Cosmetic services (ex: waxing)-No, none of the below-Absolutely Certain",
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Clinic non-surgical services (ex: dental non-surgery)-No, none of the below-Absolutely Certain",
				    "Alcohol (explicit sale of)-None of the below-Absolutely Certain",
				    "Entertainment/gaming-Profanity-Swearwords related to sex (ex: f**k-motherf*cker-etc)-5 or more-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-Idealized Body-Pinching-circling-pointing out defect-Absolutely Certain"
				  ],
				  "Bhanu Kalahasti": [
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain",
				    "Alcohol (explicit sale of)-None of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Surgery-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Clinic non-surgical services (ex: dental non-surgery)-No, none of the below-Absolutely Certain"
				  ],
				  "Bhargav Varma Chinda": [
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain",
				    "Alcohol (explicit sale of)-None of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Surgery-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "News-No, none of the below-Absolutely Certain"
				  ],
				  "Brahmendra Tanneeru": [
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "Alcohol (explicit sale of)-None of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Profanity-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Cosmetic services (ex: waxing)-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain"
				  ],
				  "Chandan Kumar S": [
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain",
				    "Alcohol (explicit sale of)-None of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "News-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Surgery-No, none of the below-Absolutely Certain"
				  ],
				  "Deepika G": [
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Profanity-Absolutely Certain",
				    "Alcohol (explicit sale of)-None of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain",
				    "Adult Health (explicit sale of)-Surgery-No, none of the below-Absolutely Certain"
				  ],
				  "Farha Nausheen": [
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Alcohol (explicit sale of)-None of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Cosmetic services (ex: waxing)-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Surgery-No, none of the below-Absolutely Certain"
				  ],
				  "Girimalla Kathyaini": [
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Alcohol (explicit sale of)-None of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Clinic non-surgical services (ex: dental non-surgery)-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Surgery-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Cosmetic services (ex: waxing)-No, none of the below-Absolutely Certain"
				  ],
				  "Girish Supriya": [
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Cosmetic services (ex: waxing)-No, none of the below-Absolutely Certain",
				    "Alcohol (explicit sale of)-None of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Botox-No, none of the below-Absolutely Certain",
				    "News-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain"
				  ],
				  "Goutham Chennamadhavuni": [
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Alcohol (explicit sale of)-None of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Cosmetic services (ex: waxing)-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Clinic non-surgical services (ex: dental non-surgery)-No, none of the below-Absolutely Certain"
				  ],
				  "Jadali Sushmita": [
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Alcohol (explicit sale of)-None of the below-Absolutely Certain",
				    "None of the products/services below-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Cosmetic services (ex: waxing)-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Clinic non-surgical services (ex: dental non-surgery)-No, none of the below-Absolutely Certain"
				  ],
				  "K Ramu": [
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Alcohol (explicit sale of)-None of the below-Absolutely Certain",
				    "None of the products/services below-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Clinic non-surgical services (ex: dental non-surgery)-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Profanity-Absolutely Certain"
				  ],
				  "K Saraswathi": [
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Clinic non-surgical services (ex: dental non-surgery)-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Surgery-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Cosmetic services (ex: waxing)-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain"
				  ],
				  "Keerthi Jyothi": [
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Profanity-Absolutely Certain",
				    "Alcohol (explicit sale of)-None of the below-Absolutely Certain",
				    "None of the products/services below-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Clinic non-surgical services (ex: dental non-surgery)-No, none of the below-Absolutely Certain"
				  ],
				  "Manikantareddy Reddy": [
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Alcohol (explicit sale of)-None of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Cosmetic services (ex: waxing)-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain",
				    "News-No, none of the below-Absolutely Certain"
				  ],
				  "manohar soodula": [
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Alcohol (explicit sale of)-None of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Surgery-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Clinic non-surgical services (ex: dental non-surgery)-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain"
				  ],
				  "Mirza Hameed Baig": [
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Alcohol (explicit sale of)-None of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Cosmetic services (ex: waxing)-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-Idealized Body-Repeated before & after-Absolutely Certain"
				  ],
				  "Mohammed Uzair": [
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Alcohol (explicit sale of)-None of the below-Absolutely Certain",
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Procedures involving lasers-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Profanity-Absolutely Certain"
				  ],
				  "Mouna Priya": [
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Alcohol (explicit sale of)-None of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Clinic non-surgical services (ex: dental non-surgery)-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-Idealized Body-Pinching-circling-pointing out defect-Absolutely Certain"
				  ],
				  "Naresh K": [
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "Alcohol (explicit sale of)-None of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Profanity-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Clinic non-surgical services (ex: dental non-surgery)-No, none of the below-Absolutely Certain"
				  ],
				  "Ninny Gidda": [
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Alcohol (explicit sale of)-None of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Cosmetic services (ex: waxing)-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain",
				    "Adult Health (explicit sale of)-Surgery-No, none of the below-Absolutely Certain"
				  ],
				  "Nithin Chepyala": [
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Alcohol (explicit sale of)-None of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Cosmetic services (ex: waxing)-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Profanity-Absolutely Certain"
				  ],
				  "Pooja Thakur": [
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Clinic non-surgical services (ex: dental non-surgery)-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Alcohol (explicit sale of)-None of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain",
				    "Adult Health (explicit sale of)-Surgery-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Cosmetic services (ex: waxing)-No, none of the below-Absolutely Certain"
				  ],
				  "Prajwal Ganji": [
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "Alcohol (explicit sale of)-None of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Surgery-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Profanity-Absolutely Certain"
				  ],
				  "Prashanth Buyankar": [
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "Alcohol (explicit sale of)-None of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Profanity-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Cosmetic services (ex: waxing)-No, none of the below-Absolutely Certain"
				  ],
				  "Praveen Potharaveni": [
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Alcohol (explicit sale of)-None of the below-Absolutely Certain",
				    "None of the products/services below-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Clinic non-surgical services (ex: dental non-surgery)-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Specifically whitening cream-No, none of the below-Absolutely Certain"
				  ],
				  "Preethi D": [
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "Alcohol (explicit sale of)-None of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain",
				    "Adult Health (explicit sale of)-Surgery-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Profanity-Absolutely Certain"
				  ],
				  "Pruthvi Krishna": [
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Alcohol (explicit sale of)-None of the below-Absolutely Certain",
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain",
				    "None of the products/services below-Profanity-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Entertainment/gaming-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain",
				    "Adult Health (explicit sale of)-Surgery-No, none of the below-Absolutely Certain"
				  ],
				  "Ravi Kunchala": [
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "Alcohol (explicit sale of)-None of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Profanity-Absolutely Certain",
				    "Adult Health (explicit sale of)-Surgery-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Cosmetic services (ex: waxing)-No, none of the below-Absolutely Certain"
				  ],
				  "Rebekah Lawrence": [
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain",
				    "Alcohol (explicit sale of)-None of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Profanity-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Clinic non-surgical services (ex: dental non-surgery)-No, none of the below-Absolutely Certain"
				  ],
				  "Reena Summera": [
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Alcohol (explicit sale of)-None of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Cosmetic services (ex: waxing)-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Surgery-No, none of the below-Absolutely Certain"
				  ],
				  "Sai Priya Vinder": [
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Alcohol (explicit sale of)-None of the below-Absolutely Certain",
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Clinic non-surgical services (ex: dental non-surgery)-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Profanity-Absolutely Certain"
				  ],
				  "Sai Sharan Chandra Macharla": [
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Alcohol (explicit sale of)-None of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Surgery-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Procedures involving lasers-No, none of the below-Absolutely Certain"
				  ],
				  "Sangeetha EM": [
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Alcohol (explicit sale of)-None of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Clinic non-surgical services (ex: dental non-surgery)-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Cosmetic services (ex: waxing)-No, none of the below-Absolutely Certain"
				  ],
				  "Shashidhar Maru": [
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Alcohol (explicit sale of)-None of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Surgery-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain",
				    "None of the products/services below-Profanity-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain"
				  ],
				  "Shikha Rani Upadhyay": [
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Alcohol (explicit sale of)-None of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Clinic non-surgical services (ex: dental non-surgery)-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Profanity-Absolutely Certain"
				  ],
				  "Simon Patakula": [
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Alcohol (explicit sale of)-None of the below-Absolutely Certain",
				    "None of the products/services below-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain",
				    "None of the products/services below-Profanity-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Cosmetic services (ex: waxing)-No, none of the below-Absolutely Certain"
				  ],
				  "Soni Khatun": [
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain",
				    "Alcohol (explicit sale of)-None of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Clinic non-surgical services (ex: dental non-surgery)-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-Idealized Body-Repeated before & after-Absolutely Certain",
				    "Adult Health (explicit sale of)-Surgery-No, none of the below-Absolutely Certain"
				  ],
				  "sreedhar Gangakhedkar": [
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Alcohol (explicit sale of)-None of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Surgery-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Cosmetic services (ex: waxing)-No, none of the below-Absolutely Certain"
				  ],
				  "Swetha Kandhada": [
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Alcohol (explicit sale of)-None of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Cosmetic services (ex: waxing)-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-Idealized Body-Repeated before & after-Absolutely Certain"
				  ],
				  "SyedMeesum Hussain Razvi": [
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Alcohol (explicit sale of)-None of the below-Absolutely Certain",
				    "None of the products/services below-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Clinic non-surgical services (ex: dental non-surgery)-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Surgery-No, none of the below-Absolutely Certain"
				  ],
				  "VamshiRaju Dappu": [
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Alcohol (explicit sale of)-None of the below-Absolutely Certain",
				    "None of the products/services below-Profanity-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Cosmetic services (ex: waxing)-No, none of the below-Absolutely Certain"
				  ],
				  "Vineeth Madiraju": [
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Profanity-Absolutely Certain",
				    "Alcohol (explicit sale of)-None of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-Language-Physical or Mental health attribute-Assertion-Weight-loss-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-Idealized Body-Repeated before & after-Absolutely Certain"
				  ],
				  "Vinu Anthony": [
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Alcohol (explicit sale of)-None of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Clinic non-surgical services (ex: dental non-surgery)-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Profanity-Absolutely Certain"
				  ],
				  "VIshal Tiwari": [
				    "Entertainment/gaming-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Facebook Reference-Incorrect \"f\" Logo-No-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Adult Health (explicit sale of)-Explicit Diet/Weight Loss Product or Service-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Cosmetic services (ex: waxing)-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Non-ingestible treatments (ex: topical cream)-No, none of the below-Absolutely Certain",
				    "Non-Adult Health Physical Improvement (explicit sale of)-Specifically whitening cream-No, none of the below-Absolutely Certain",
				    "None of the products/services below-Facebook Reference-Thumbs Up Icon-No-Absolutely Certain"
				  ]
				};
				return user;
			}
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