$ = jQuery;

function genScenario(momentstring,id) {
	that = this;
	this.id = id;
	this.momentstring = momentstring;
	this.loadwait = 0;
	this.loadHtml();
	
	$(guiSpecialCloseBtn).click(function () {
		that.addMoment("clspec");
		that.runMoment("clspec");
	});
}
genScenario.prototype.runMoments = function() {
	var damoments = this.momentstring.split("|");
	for(i=0;i<damoments.length;i++) {
		this.runMoment(damoments[i]);
	}
}
genScenario.prototype.runMoment = function(damoment) {
	switch(damoment) {
		case "start":
			this.start();
			break;
		case "clspec":
			closeSpecial();
			break;
		default:
			this.figureOutMoment(damoment);
			break;
	}
}
genScenario.prototype.loadHtml = function() {
	$(guiAllContent).hide();
	turnOffBtns();
	this.loadwait = 5;
	$(guiIntro).html($("."+this.code+"_intro").html());
	$(guiSetup).html($("."+this.code+"_setup").html());
	$(guiRules).html($("."+this.code+"_rules").html());
	$(guiEnd).html($("."+this.code+"_end").html());
	$(guiSpecialContent).html($("."+this.code+"_special").html());
	this.postLoad();
	this.start();
}
genScenario.prototype.start = function() {
	turnOnBtns();
	$(guiIntroBtn).css("display","inline-block");
	$(guiSetupBtn).css("display","inline-block");
	$(guiRulesBtn).css("display","inline-block");
	$(guiEndBtn).css("display","inline-block");
	showContent(guiIntroBtn,guiIntro);
	
	$(".btn.ending").click(function() {
		that.doEnding(this);
	});
}
genScenario.prototype.postLoad = function() {
	$(guiLoading).hide();
	sizeDaWindow();
}
genScenario.prototype.figureOutMoment = function(damoment) {}
genScenario.prototype.addMoment = function(momentname) {
	this.momentstring += "|"+momentname;
}
genScenario.prototype.doEnding = function(endbutton) {
	$(".btn.ending").hide();
	turnOffBtns();
	var daend = "won";
	if($(endbutton).hasClass("won")) {
		$(".end-story.won").show();
	} else if($(endbutton).hasClass("lost-infection")) {
		$(".end-story.lost-infection").show();
		daend = "lost-infection";
	} else if($(endbutton).hasClass("lost-raxxon")){
		$(".end-story.lost-raxxon").show();
		daend = "lost-raxxon";
	}
}

var codepath = "";
var dascenmoments = "";
var dascenid = "";
var dascenreal = "";
var guiAllContent = ".scen-container .scen-content .scen-snippet";
var guiAllBtn = ".scen-container .scen-menu .btn";
var guiLoading = ".scen-container .loading";
var guiIntro = ".scen-container .scen-content .scen-snippet.intro";
var guiSetup = ".scen-container .scen-content .scen-snippet.setup";
var guiRules = ".scen-container .scen-content .scen-snippet.rules";
var guiEnd = ".scen-container .scen-content .scen-snippet.end";
var guiIntroBtn = ".scen-container .scen-menu .btn.intro";
var guiSetupBtn = ".scen-container .scen-menu .btn.setup";
var guiRulesBtn = ".scen-container .scen-menu .btn.rules";
var guiEndBtn = ".scen-container .scen-menu .btn.end";
var guiSpecial = ".scen-container .scen-content .scen-snippet.special";
var guiSpecialCloseBtn = ".scen-container .scen-content .scen-snippet.special .special-close";
var guiSpecialContent = ".scen-container .scen-content .scen-snippet.special .special-content";

jQuery( document ).ready(function( $ ) {
	$(window).resize(function() {
		sizeDaWindow();
	});
	
	$(".scen-btn").click(function() {
		$(".scentable-container").hide();
		$(".scen-btn").off();
		$(".scen-btn-cont").off();
		var daname = $(this).text();
		$(".startsel").html("<p>Loading scenario... To start another new scenario, refresh this page.</p>");
		startScenario(daname);
	});
	$(".scen-btn-cont").click(function() {
		$(".scen-btn").off();
		$(".scen-btn-cont").off();
		var danid = $(this).find(".scen-cont-nid").text();
		contScenario(danid);
	});
	
	sizeDaWindow();
	
	
});


function startScenario(scenarioname) {
	$(guiLoading).show();
	openScenarioBox();
	if(scenarioname==="Gathering Ghosts Scenario") {
		dascenreal = new ggScenario(dascenmoments,dascenid);
	}
	if(scenarioname==="Uncertainty Scenario") {
		dascenreal = new checkScenario(dascenmoments,dascenid);
	}
	if(scenarioname==="Mutation Madness Scenario") {
		dascenreal = new mmScenario(dascenmoments,dascenid);
	}
	if(scenarioname==="Calm the Crowd Scenario") {
		dascenreal = new riotScenario(dascenmoments,dascenid);
	}
	if(scenarioname==="High Priority Targets Scenario") {
		dascenreal = new vipScenario(dascenmoments,dascenid);
	}
}
function contScenario(scenarionid) {
	$(guiLoading).show();
	openScenarioBox();
}
function scenarioLoader(data) {
	$.getScript("scenarios/"+data.code+".js");	
}

function sizeDaWindow() {
	$(".scen-content").height($(window).height()-$(".scen-menu").height()-64);
	$(".scen-content").width($(window).width()-64);
}
function openScenarioBox() {
	$(".scen-container").css("display", "flex");
}
function showContent(dabutton,dacontent) {
	$(guiAllBtn).removeClass("btn-theme");
	$(dabutton).addClass("btn-theme");
	$(guiAllContent).hide();
	$(dacontent).show();
	$(".scen-container .scen-content").scrollTo($(dacontent));
}
function turnOnBtns() {
	$(guiAllBtn).removeClass('disabled');
	$(guiIntroBtn).click(function() {
		showContent(guiIntroBtn,guiIntro);
	});
	$(guiSetupBtn).click(function() {
		showContent(guiSetupBtn,guiSetup);
	});
	$(guiRulesBtn).click(function() {
		showContent(guiRulesBtn,guiRules);
	});
	$(guiEndBtn).click(function() {
		showContent(guiEndBtn,guiEnd);
	});
}
function turnOffBtns() {
	$(guiAllBtn).removeClass("btn-theme");
	$(guiAllBtn).addClass("disabled");
	$(guiAllBtn).off("click");
}
function openSpecial() {
	turnOffBtns();
	$(guiAllContent).hide();
	$(guiSpecial).show();
	$(".scen-container .scen-content").scrollTo($(guiSpecial));
}
function closeSpecial() {
	$(guiSpecial).hide();
	turnOnBtns();
	showContent(guiRulesBtn,guiRules);
}
function removeStringFromArray(dastring,daarray) {
	for (var i=daarray.length-1; i>=0; i--) {
	    if (daarray[i] === dastring) {
	        daarray.splice(i, 1);
	    }
	}
	return daarray;
}
function loadCheck() {
		dascenreal.postLoad();
}
function endingLink(data) {
	
}
jQuery.fn.scrollTo = function(elem) { 
    $(this).scrollTop($(this).scrollTop() - $(this).offset().top); 
    return this; 
};





function ggScenario(momentstring,id) {
	this.code = "s_gg";
	this.rxcards = [ "rx1", "rx2", "rx3", "rx4", "rx5", "rx6", "rx7", "rx8" ];
	this.storymoments = [ "sm1", "sm2","sm3"];
	genScenario.call(this,momentstring,id);
}

ggScenario.prototype = Object.create(genScenario.prototype);
ggScenario.prototype.constructor = genScenario;

ggScenario.prototype.postLoad = function() {
	$(guiLoading).hide();
	sizeDaWindow();
	
	$(".scen-rx-btn").click(function() {
		dascenreal.doRxDraw();
	});
	$(".story-btn").click(function() {
		dascenreal.doStory();
	})
	
	this.runMoments();
}
ggScenario.prototype.figureOutMoment = function(damoment) {
	if(damoment.substr(0,2)=="rx") {
		this.rxcards = removeStringFromArray(damoment,this.rxcards);
		$(guiSpecialContent).find(".context-moment").hide();
		$(guiSpecialContent).find("."+damoment).show();
		openSpecial();
		if(!this.rxcards.length) {
			$(".scen-rx-btn").off();
			$(".scen-rx-btn").addClass("disabled");
		}
	} else if(damoment=="sm") {
		$("span.changeit").text("uncontained quarantine");
		var dastorym = this.storymoments.shift();
		$(guiSpecialContent).find(".context-moment").hide();
		$(guiSpecialContent).find("."+dastorym).show();
		openSpecial();
		if(!this.storymoments.length) {
			$(".story-btn").off();
			$(".story-btn").addClass("disabled");
			$(".movin").html("<strong>No player may move any cards to quarantine via quarantine actions.</strong>");
			$(".wherecarrier").html("<strong>Whenever you use a Quarantine action on a carrier infected card, place it in the evacuation pile.</strong>")
			$("span.vchange").text("or in the evacuation pile");
			$(".story-btn").hide();
		} else {
			if(this.storymoments.length==1) {
				$(".story-btn").html("<strong>Click here the first time there are 8+ carriers in quarantine.</strong>");
				$(guiRules).find("ol").append("<li class='movin'><strong>For the rest of the game, no player may move any infected cards to quarantine via quarantine actions except for carrier cards.</strong></li>");
			} else {
				$(".story-btn").html("<strong>Click here the first time there are 6+ carriers in quarantine.</strong>");
				$(guiRules).find("ol").append("<li class='wherecarrier'><strong>Whenever Quarantine actions are used, any carrier cards moved go to the UNCONTAINED quarantine instead of the CONTAINED quarantine.</strong></li>");
			}
		}
	}
}
ggScenario.prototype.doRxDraw = function() {
	var whichone = Math.floor(Math.random() * this.rxcards.length);
	this.addMoment(this.rxcards[whichone]);
	this.runMoment(this.rxcards[whichone]);
}
ggScenario.prototype.doStory = function() {
	this.addMoment("sm");
	this.runMoment("sm");
}




function checkScenario(momentstring,id) {
	this.code = "s_check";
	this.rxcards = [ "rx1", "rx2", "rx3", "rx4", "rx5", "rx6", "rx7", "rx8" ];
	genScenario.call(this,momentstring,id);
}

checkScenario.prototype = Object.create(genScenario.prototype);
checkScenario.prototype.constructor = genScenario;

checkScenario.prototype.postLoad = function() {
	$(guiLoading).hide();
	sizeDaWindow();
	
	$(".scen-rx-btn").click(function() {
		dascenreal.doRxDraw();
	});
	
	this.runMoments();
}
checkScenario.prototype.figureOutMoment = function(damoment) {
	if(damoment.substr(0,2)=="rx") {
		this.rxcards = removeStringFromArray(damoment,this.rxcards);
		$(guiSpecialContent).find(".context-moment").hide();
		$(guiSpecialContent).find("."+damoment).show();
		openSpecial();
		if(!this.rxcards.length) {
			$(".scen-rx-btn").off();
			$(".scen-rx-btn").addClass("disabled");
		}
	}
}
checkScenario.prototype.doRxDraw = function() {
	var whichone = Math.floor(Math.random() * this.rxcards.length);
	this.addMoment(this.rxcards[whichone]);
	this.runMoment(this.rxcards[whichone]);
}




function mmScenario(momentstring,id) {
	this.code = "s_mm";
	this.rxcards = [ "rx1", "rx2", "rx3", "rx4", "rx5", "rx6", "rx7", "rx8" ];
	genScenario.call(this,momentstring,id);
}

mmScenario.prototype = Object.create(genScenario.prototype);
mmScenario.prototype.constructor = genScenario;

mmScenario.prototype.postLoad = function() {
	$(guiLoading).hide();
	sizeDaWindow();
	
	$(".scen-rx-btn").click(function() {
		dascenreal.doRxDraw();
	});
	
	this.runMoments();
}
mmScenario.prototype.figureOutMoment = function(damoment) {
	if(damoment.substr(0,2)=="rx") {
		this.rxcards = removeStringFromArray(damoment,this.rxcards);
		$(guiSpecialContent).find(".context-moment").hide();
		$(guiSpecialContent).find("."+damoment).show();
		$(guiRules).find(".rx-rule").hide();
		$(guiRules).find(".rule-"+damoment).show();
		openSpecial();
		if(!this.rxcards.length) {
			$(".scen-rx-btn").off();
			$(".scen-rx-btn").addClass("disabled");
		}
	}
}
mmScenario.prototype.doRxDraw = function() {
	var whichone = 0;
	this.addMoment(this.rxcards[whichone]);
	this.runMoment(this.rxcards[whichone]);
}






function riotScenario(momentstring,id) {
	this.code = "s_riot";
	this.rxcards = [ "rx1", "rx2", "rx4", "rx6", "rx7", "rx8" ];
	this.did3=false;
	this.did5=false;
	genScenario.call(this,momentstring,id);
}

riotScenario.prototype = Object.create(genScenario.prototype);
riotScenario.prototype.constructor = genScenario;

riotScenario.prototype.postLoad = function() {
	$(guiLoading).hide();
	sizeDaWindow();
	
	$(".scen-rx-btn").click(function() {
		dascenreal.doRxDraw();
	});
	
	this.runMoments();
}
riotScenario.prototype.figureOutMoment = function(damoment) {
	if(damoment.substr(0,2)=="rx") {
		if(damoment != "rx3" && damoment != "rx5") {
			this.rxcards = removeStringFromArray(damoment,this.rxcards);
		}
		$(guiSpecialContent).find(".context-moment").hide();
		$(guiSpecialContent).find("."+damoment).show();
		openSpecial();
		if(!this.rxcards.length) {
			$(".scen-rx-btn").off();
			$(".scen-rx-btn").addClass("disabled");
		}
	}
}
riotScenario.prototype.doRxDraw = function() {
	var whichone = this.rxcards[Math.floor(Math.random() * this.rxcards.length)];
	if(this.rxcards.length==4 && !this.did3) {
		whichone = "rx3";
		this.did3 = true;
	} else if (this.rxcards.length==3 && !this.did5) {
		whichone = "rx5";
		this.did5 = true;
	}
	this.addMoment(whichone);
	this.runMoment(whichone);
}





function vipScenario(momentstring,id) {
	this.code = "s_vip";

	this.storystate = "start";

	genScenario.call(this,momentstring,id);
}

vipScenario.prototype = Object.create(genScenario.prototype);
vipScenario.prototype.constructor = genScenario;

vipScenario.prototype.postLoad = function() {
	$(guiLoading).hide();
	sizeDaWindow();
	
	$(".story-btn").click(function() {
		dascenreal.doStory(this);
	})
	
	this.runMoments();
}
vipScenario.prototype.figureOutMoment = function(damoment) {
	if(damoment !== "") {
		
	whoseit = "VIP";
	wgn = "she";
	wgo = "her";
	wgp = "her";
	whoseclass = "vip";
	switch(damoment.substr(2,1)) {
		case "c":
			whoseit = "Colby";
			wgn = "he";
			wgo = "him";
			wgp = "his";
			$(".story-colby").hide();
			break;
		case "n":
			whoseit = "Nadia";
			$(".story-nadia").hide();
			break;
		case "m":
			whoseit = "Monica";
			$(".story-monica").hide();
			break;
		case "d":
			$(".story-done").hide();
			break;
	}
	switch(this.storystate) {
		case "start":
			$(".zombied").text(whoseit);
			$(".zombiedn").text(wgn);
			$(".zombiedo").text(wgo);
			$(".zombiedp").text(wgp);
			this.storystate = "zdone";
			$(guiSpecialContent).find(".context-moment").hide();
			$(guiSpecialContent).find(".story-a").show();
			openSpecial();
			$(guiRules).find(".z-rules").show();
			break;
		case "zdone":
			$(".killt").text(whoseit);
			$(".killtn").text(wgn);
			$(".killto").text(wgo);
			$(".killtp").text(wgp);
			this.storystate = "ddone";
			$(guiSpecialContent).find(".context-moment").hide();
			$(guiSpecialContent).find(".story-b").show();
			openSpecial();
			break;
		case "ddone":
			$(".bro").text(whoseit);
			$(".bron").text(wgn);
			$(".broo").text(wgo);
			$(".brop").text(wgp);
			this.storystate = "sdone";
			$(guiSpecialContent).find(".context-moment").hide();
			$(guiSpecialContent).find(".story-c").show();
			openSpecial();
			$(guiSetup).find(".z-objective").show();
			$(guiRules).find(".story-done").show();
			//ad rule NOT to move those 2
			break;
		case "sdone":
			this.storystate = "alldone";
			$(guiSpecialContent).find(".context-moment").hide();
			$(guiSpecialContent).find(".story-d").show();
			openSpecial();
			
			
	}
}
}
vipScenario.prototype.doStory = function(triggerer) {
	if($(triggerer).hasClass("story-colby")) {
		this.addMoment("s_c");
		this.runMoment("s_c");
	} else if($(triggerer).hasClass("story-monica")) {
		this.addMoment("s_m");
		this.runMoment("s_m");
	} else if($(triggerer).hasClass("story-nadia")) {
		this.addMoment("s_n");
		this.runMoment("s_n");
	} else if($(triggerer).hasClass("story-done")) {
		this.addMoment("s_d");
		this.runMoment("s_d");
	}

}