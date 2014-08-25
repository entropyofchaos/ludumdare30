function theBeginning() {
	document.getElementById("title").innerHTML = "Interdependence: THE GAME";
	initGame();
	startNextTurn();
}

function startNextTurn() {
	var results = nextTurn();
	var text = document.getElementById("text");
	text.innerHTML = results[0];
	createOptions(results[1], results[2]);
	
	if (currentNation.name == "Rothingrad") {
		addAnImage("leader", "Rothstine.png", 237, 237); 
	} else if (currentNation.name == "Sauria") {
		addAnImage("leader", "Saurian.png", 237, 237);
	}
	
	// Country Name: Turn
	var turn = document.getElementById("turn");
	turn.innerHTML = currentNation.name + ": Turn " + (currentNation.turnCount + 1);
}

function createOptions(stringArray, fnctArray) {
	var choices = document.getElementById("choices");
	choices.innerHTML = '';
	var i;
	for (i = 0; i < stringArray.length; i++) {
		var fnct = fnctArray[i];
		if (typeof fnct != 'undefined') {
			addButton(stringArray[i], function(){(fnctArray[i]());startNextTurn();});
		} else {
			addButton(stringArray[i], function(){startNextTurn();});
		}
	}
}

function addButton(text, refFnct) {
	var p = document.createElement("p");
	
	var li = document.createElement("li");
	li.style.color = "blue";
	li.style.cursor = "pointer";
	p.appendChild(li);
	
	var textnode = document.createTextNode(text);
	li.appendChild(textnode);
	
	p.onclick = refFnct;
	document.getElementById("choices").appendChild(p);
}

function addAnImage(targetId, src, width, height) {
    var img;
    img = document.getElementById(targetId);
	img.src = src;
    img.style.width  = width  + "px";
    img.style.height = height + "px";
}