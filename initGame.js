function initGame()
{
  
	addUpcomingEvent(nations[0], 0, function(){}, prologue);

	addUpcomingEvent(nations[0], 0, function(){}, rothingrad);
  
	addUpcomingEvent(nations[1], 0, function(){play('intoTheme');play('raptorGrowl');}, saurian);
	
	addPotentialDecision(nations[1], 0, "Expand your fishing industry?", function(){return true}, "<br><br>You can expand your fisihing industrying, however " 
	+ "doing so could potentially cause overfisihing to occur, lowering the amount of available fish around the world.", function(){stop('intoTheme');stop('raptorGrowl');
	alert("So long and thanks for all the fish.")});
	
	addPotentialDecision(nations[1], 0, "Expand your farm production?", function(){return true}, "<br><br>Alternativly, you can expand your farm production. However " 
	+ "this may take three cycles of the sun to complete.",function(){stop('intoTheme');stop('raptorGrowl');alert("Yay, more food.")});
}

function play(song) 
{
	var audio = document.getElementById(song);
	audio.play();
}

function stop(song)
{
	var audio = document.getElementById(song);
	audio.pause();
}

