log("Facebook SRT/contentscripts.......");

chrome.runtime.onMessage.addListener(	
  function(request, sender, sendResponse) {
		if("COMBINATION_1" === request.combination) {
			COMBINATION_1();			
		} else if ("COMBINATION_2" === request.combination) {
			COMBINATION_2();
		} else if ("COMBINATION_3" === request.combination) {
			COMBINATION_3();
		} else if ("COMBINATION_4" === request.combination) {
			COMBINATION_4();
		} else if ("COMBINATION_5" === request.combination) {
			COMBINATION_5();
		}   
  });

function selectOption(radioBtnName) {
	//log("selectOption....");
	var radios = document.getElementsByTagName('input');
    for (i = 0; i < radios.length; i++) {
        if (radios[i].type == 'radio' ) {
            
            if(radioBtnName === radios[i].value) {	            	
            	document.getElementById(radios[i].id).checked = false;
            	log("Selected option::" + radios[i].value);
            	document.getElementById(radios[i].id).click();            	
            }
        }
    }//&& radios[i].checked
}

function clickEnter() {
	var buttons = document.getElementsByTagName('button');	
	for(i=0; i<buttons.length; i++) {
		if(buttons[i].innerHTML.includes("Continue [Enter]")) {
			buttons[i].click();			 //breakPoint
			log("Tagging Completed....................................!!!");
			break;		
		}    	
    }
}

function COMBINATION_1() {
	log("Executing--->COMBINATION_1");
	//"tags: [ Entertainment/gaming ] [ None of the policies below ] [Absolutely Certain]"
	selectOption("Entertainment/gaming");
	setTimeout(function(){
		clickEnter();
	}, 200);
	setTimeout(function(){
		clickEnter();
	}, 200);
	setTimeout(function(){
		clickEnter();
    }, 200);
}

function COMBINATION_2() {
	log("Executing--->COMBINATION_2");
	//tags: [ None of the products/services below ] [ 9-Facebook Reference ] 
	//		[7-Incorrect 'f' Logo] [1-No] [f-Absolutely Certain]
	setTimeout(function(){
		clickEnter();
	}, 200);
	setTimeout(function(){
		selectOption("Facebook Reference");
			setTimeout(function(){
				selectOption("Incorrect \"f\" Logo");
					setTimeout(function(){
						clickEnter();
						setTimeout(function(){
							clickEnter();
						}, 200);
				}, 200);	
			}, 200);
	}, 200);
	

	
	/*setTimeout(function(){
		clickEnter();
	}, 200);*/
}
//Done up to 2 combinations only.
function COMBINATION_3() {
	log("Executing--->COMBINATION_3");
	//{"tags":["rep_adulthealth","comp_prod_all"]}
	selectOption("Adult health products");
	setTimeout(function(){
		selectOption("All components");
	}, 200);

	clickEnter();
}

function COMBINATION_4() {
	log("Executing--->COMBINATION_4");
	//{"tags":["rep_tobaccosale","comp_prod_all"]}
	selectOption("Tobacco products and related paraphernalia");
	setTimeout(function(){
		selectOption("All components");
	}, 200);

	clickEnter();
}

function COMBINATION_5() {
	log("Executing--->COMBINATION_5");
	//{"tags":["lowquality","rep_nonproduct","pil_nonproduct_promotions","pil_nonproduct_tickets_promotion"]}
	//Low Risk - misleading, fraudulent, deceptive or offensive / Non products / Tickets, Coupons or Promotions / Promotion
	selectOption("Low Risk - misleading, fraudulent, deceptive or offensive");
	setTimeout(function(){
		selectOption("Non products");
	}, 200);
	setTimeout(function(){
		selectOption("Tickets, Coupons or Promotions");
	}, 200);
	setTimeout(function(){
		selectOption("Promotion");
	}, 200);
	setTimeout(function(){
		clickEnter();
    }, 200);
}

function COMBINATION_6() {
	log("Executing--->COMBINATION_6");
	//{"tags":["lowquality","rep_nonproduct","pil_nonproduct_services","pil_nonproduct_services_others"]}
	//Low Risk - misleading, fraudulent, deceptive or offensive / Non products / Services / Others
	selectOption("Low Risk - misleading, fraudulent, deceptive or offensive");
	setTimeout(function(){
		selectOption("Non products");
	}, 200);
	setTimeout(function(){
		selectOption("Services");
	}, 200);
	setTimeout(function(){
		selectOption("Others");
	}, 200);
	setTimeout(function(){
		clickEnter();
    }, 200);
}

function log(message) {
	//alert(message);
	console.log(message);
}