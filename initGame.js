function initGame()
{
  
	addUpcomingEvent(nations[0], 0, function(){}, prologue);

	addUpcomingEvent(nations[0], 0, function(){}, rothingrad);
  
	addUpcomingEvent(nations[1], 0, function(){play('intoTheme');play('raptorGrowl');}, saurian);
}

function play(song) 
{
	var audio = document.getElementById(song);
	audio.play();
}