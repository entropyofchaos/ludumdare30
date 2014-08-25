function initGame()
{
  
	addUpcomingEvent(nations[0], 0, function(){}, prologue);

	addUpcomingEvent(nations[0], 0, function(){play('jrasic1.wav')}, rothingrad);
  
	addUpcomingEvent(nations[1], 0, function(){play('raptor1.wav')}, saurian);
}

function play(song) 
{
  var embed=document.createElement('object');
  embed.setAttribute('type','audio/wav');
  embed.setAttribute('data', song);
  embed.setAttribute('autostart', true);
  document.getElementsByTagName('body')[0].appendChild(embed);
}