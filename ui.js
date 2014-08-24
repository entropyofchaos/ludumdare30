function inTheBeginning() {
	document.getElementById("title").innerHTML = "Interdependence: THE GAME";
	initGame();
	startNextTurn();
}
function boom() {
	//document.getElementById("text").innerHTML = "there was Dr. Saurian!";
	//setTimeout(function(){alert("The world exploded. Good Job.")},800);
	alert("The world exploded. Good Job.");
}

function startNextTurn() {
	var results = nextTurn();
	var text = document.getElementById("text");
	text.innerHTML = results[0];
	createOptions(results[1], results[2]);
	
	if (currentNation.name == "Rothstein") {
		
	} else if (currentNation.name == "Sauria") {
		
	}
}

// nextTurn returns an array
// array[0] = status string
// array[1] = array of string choices
// array[2] = funct array

function createOptions(stringArray, fnctArray) {
	var choices = document.getElementById("choices");
	choices.innerHTML = '';
	var i;
	for (i = 0; i < stringArray.length; i++) {
		var funct = fnctArray[i];
		addButton(stringArray[i], function(){funct();startNextTurn();} );
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