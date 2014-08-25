function receiveFishFunction()
{
	currentNation.food += .25;	
}

function reduceFoodSupply()
{
	currentNation.food -= .2;
	otherNation.food -= .2;
	internationalRelations -= .2;
	
	addUpcomingEvent(otherNation(), 0, function(){}, "Sauria's overfishing has damaged the ocean's ecosystem, reducing the amount of food available for Rothingrad as well. ");
}

function fishingDecision()
{
	addUpcomingEvent(currentNation, 0, receiveFishFunction, "You have greatly expanded your fishing industry, helping greatly with your food shortage. ");
	addUpcomingEvent(currentNation, currentNation.turnCount + 2, reduceFoodSupply, "Overfishing has endangered the food supply.  Pundits blame lax regulation in Sauria. ");
}


function sendAidFunction()
{
	//addUpcomingEvent(nations[1], 0, function(){}, "SAURIA SAURIA SAURIA");
	
	addUpcomingEvent(otherNation(), 0, receiveAidFunction, "You have received food aid from Rothingrad.  ");	
}

function receiveAidFunction()
{
	currentNation.foodFromTrade += .15;
}

function initialMilitarization()
{
	currentNation.militarization = .25;
	
	addUpcomingEvent(currentNation, 0, function(){}, "You have expanded your military presence. ");
	
}

function secondaryMilitarization()
{
	currentNation.militarization = otherNation().militarization + .1;
}

function secondaryMilitarizationWeak()
{
	currentNation.militarization = otherNation().militarization;
}


function intialIndustryExpansion()
{
	currentNation.industry = .4;
	addUpcomingEvent(currentNation, 0, function(){}, "You have greatly expanded your industry. ");
	
	var secondaryMilitarizationStr = "You can leverage the newfound strength of your industry to greatly expand your military over Sauria's. ";
	var seondaryMilitarizationWeakStr = "Alternatively, you can just match their strength. ";

	addPotentialDecision( currentNation, 0, "Expand your military greatly?", function(){return true;}, secondaryMilitarizationStr, secondaryMilitarization);
	addPotentialDecision( currentNation, 0, "Match Sauria's military?", function(){return true;}, seondaryMilitarizationWeakStr, secondaryMilitarizationWeak);
	
}


function tradeDecision()
{
	
}

function initGame()
{
  
	addUpcomingEvent(nations[0], 0, function(){}, prologue);

	addUpcomingEvent(nations[0], 0, function(){}, rothingrad);
  
	addUpcomingEvent(nations[1], 0, function(){play('intoTheme');play('raptorGrowl');}, saurian);
	
	
	addPotentialDecision(nations[0], 0, "Expand your military?", function(){return true;}, "<br><br>You could start expanding your military, although your industrial capacity is weak at the moment and you risk an arms race with Sauria. ", initialMilitarization);
	
	addPotentialDecision(nations[0], 0, "Send aid to Sauria?", function(){return true;}, "<br><br>However, Sauria has been suffering from a long famine.  You could send aid instead to  end the humanitarian (reptilitarian?) crisis and help improve foreign relations.", sendAidFunction);
	
	addPotentialDecision(nations[0], 0, "Invest in industry?", function(){return true;}, "<br><br>Finally, you could invest in building up your industry, whether you need it for military or trade goods. ", intialIndustryExpansion);
	
	///\todo only allow trade if not already trading in general. 
	addPotentialDecision(nations[0], 1, "Open trade with Sauria?", canTrade, "<br><br>Your ambassadors have reported that a new trade agreement with Sauria is on the table. ", tradeDecision);
	
	/////////////////////
	
	addPotentialDecision(nations[1], 0, "Expand your fishing industry?", function(){return true}, "<br><br>You can expand your fishing industry, however " 
	+ "doing so could potentially cause overfishing to occur, lowering the amount of available fish around the world.", function(){stop('intoTheme');stop('raptorGrowl');
	play('fish');fishingDecision();});
	
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

