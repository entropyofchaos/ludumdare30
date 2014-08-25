function initGame()
{
  
	addUpcomingEvent(nations[0], 0, function(){}, prologue);

	addUpcomingEvent(nations[0], 0, function(){}, rothingrad);
  
	addUpcomingEvent(nations[1], 0, function(){play('intoTheme');play('raptorGrowl');}, saurian);
	
	
	addPotentialDecision(nations[0], 0, "Expand your military?", function(){return true;}, "<br><br>You could start expanding your military, although your industrial capacity is weak at the moment and you risk an arms race with Sauria. ", function(){});
	
	addPotentialDecision(nations[0], 0, "Send aid to Sauria?", function(){return true;}, "<br><br>However, Sauria has been suffering from a long famine.  You could send aid instead to  end the humanitarian (reptilitarian?) crisis and help improve foreign relations.", function(){});
	
	addPotentialDecision(nations[0], 0, "Invest in industry?", function(){return true;}, "<br><br>Finally, you could invest in building up your industry, whether you need it for military or trade goods. ", function(){});
	
	/////////////////////
	
	addPotentialDecision(nations[1], 0, "Expand your fishing industry?", function(){return true}, "<br><br>You can expand your fishing industry, however " 
	+ "doing so could potentially cause overfishing to occur, lowering the amount of available fish around the world.", function(){stop('intoTheme');stop('raptorGrowl');
	play('fish');});
	
	addPotentialDecision(nations[1], 0, "Expand your farm production?", function(){return true}, "<br><br>Alternatively, you can expand your farm production. However " 
	+ "this may take three cycles of the sun to complete.",function(){stop('intoTheme');stop('raptorGrowl');});
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

