17Mar2017
FB videos Team !!!

Improve accuracy in videos team.

This extension will show alerts when the agents clicked the tags which they often select wrongly.

Extension
	Captures loggedinuser name.
	Shows alerts when corresponding tag is clicked.
	It reads keyboard presses as well.

Log:
=======
Added Users data in the js file.
Need to implement 
	-log the user decision after popup came up.
	-Show customized popup.

Note:
	We are using extension id in "js\jquery-ui-1.11.4-sunny.css@1221" to manually load the images it needed from images folder.
	To make the extension work in all browsers, we need maintain the same id everywhere. To do that, we need to use the same key which is generated when packing the extension everywhere. For that purpose, Key is given in the manifest.json. While uploading it into the chrome store, need to give the same key file.

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
