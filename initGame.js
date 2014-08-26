function receiveFishFunction()
{
	currentNation.food += .25;
	currentNation.approval += .2;
}

function farmsDone()
{
	
	currentNation.food += .5;
	currentNation.approval+= .3;
	
}

function farmDecision()
{
	addUpcomingEvent(currentNation, currentNation.turnCount + 2,  farmsDone, "Your farmland expansion is complete and well worth the wait! ");
}

function templeDecision()
{
	
  internationalRelations += .2;
  currentNation.culturalHealth += .4;
  otherNation.culturalHealth -= .1;
  currentNation.approval += .2;
  
  addUpcomingEvent(currentNation, 0, function(){}, "Your sky-temples are a wonder of the world and your missionaries have made your nation's values a global phenomenon. ");
 
 	///\todo hack
  addUpcomingEvent(otherNation(),1, function(){}, "Missionaries have popularized the Rothingradian lifestyle and values amongst your people. "); 
}


function raidFunction()
{
	
	internationalRelations -= .2;
	currentNation.food += .15;
	otherNation().food -= .15;
	currentNation.approval += .1;
	
}

function raidDecision()
{
	
	addUpcomingEvent(currentNation, 0, raidFunction, "You annexed farmland from "+otherNation().name+", improving your food situation but greatly hurting your diplomacy situation. ");
	addUpcomingEvent(otherNation(), 0, function(){}, currentNation.name + " has annexed some of your farmland.  ");
	
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
	addUpcomingEvent(otherNation(), 0, receiveAidFunction, "You have received food aid from Rothingrad.  ");	
}

function receiveAidFunction()
{
	currentNation.foodFromTrade += .15;
	internationalRelations += .2;
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
	
	addPotentialDecision(currentNation, 2, "Begin pollution cleanup efforts?", function(){return true;}, "<br><br>Rothingrad's increased industry has resulted in increased pollution levels.  You can begin an initiative to clean it up, but it could be a long time before you see the effects.  ");
}


function tradeDecision()
{
	isTrading = true;
	//function that checks for status triggers handles the actual trading mechanic
}

function foodEff()
{
	var diff = currentNation.industry * .5;
	currentNation.industry *= .5;
	currentNation.food += diff;
}

function holdFestival()
{
	currentNation.approval += .15;
	addUpcomingEvent(currentNation, 0, function(){}, "You citizens party in the streets and adore you. ");
}

function initGame()
{
  
	addUpcomingEvent(nations[0], 0, function(){}, prologue);

	addUpcomingEvent(nations[0], 0, function(){}, rothingrad);
  
	addUpcomingEvent(nations[1], 0, function(){play('intoTheme');play('raptorGrowl');}, saurian);
	


	addPotentialDecision(nations[0], 0, "Expand your military?", function(){return true;}, "<br><br>You could start expanding your military, although your industrial capacity is weak at the moment and you risk an arms race with Sauria. ", initialMilitarization);
	
	addPotentialDecision(nations[0], 0, "Send aid to Sauria?", function(){return true;}, "<br><br>However, Sauria has been suffering from a long famine.  You could send aid instead to  provide temporary relief to the humanitarian (reptilitarian?) crisis and help improve foreign relations.", sendAidFunction);
	
	addPotentialDecision(nations[0], 0, "Invest in industry?", function(){return true;}, "<br><br>Finally, you could invest in building up your industry, whether you need it for military or trade goods. ", intialIndustryExpansion);
	
	///\todo only allow trade if not already trading in general. 
	addPotentialDecision(nations[0], 1, "Open trade with Sauria?", canTrade, "<br><br>Your ambassadors have reported that a new trade agreement with Sauria is on the table. ", tradeDecision);
	
		
	addPotentialDecision(nations[0], 2, "Build temples?", function(){return true;}, "<br><br>Your spiritual advisors tell you that building more sky-temples will give your people a stronger sense of solidarity and patriotism, and that missionaries will spread your faith to foreign lands.", templeDecision);
	
	/////////////////////
	
	addPotentialDecision(nations[1], 0, "Expand your fishing industry?", function(){return true}, "<br><br>You can expand your fishing industry, however " 
	+ "doing so could potentially cause overfishing to occur, lowering the amount of available fish around the world.", function(){stop('intoTheme');stop('raptorGrowl');
	play('fish');fishingDecision();});
	
	
	addPotentialDecision(nations[1], 0, "Expand your farm production?", function(){return true}, "<br><br>Alternatively, you can expand your farm production. However " 
	+ "this may take three cycles of the sun to complete.",function(){farmDecision(); stop('intoTheme');stop('raptorGrowl');});
	
	
	addPotentialDecision(nations[0], 1, "Start researching a cure?", function(){return true;}, "<br><br>Your scouts have given you reports of a deadly plague on another continent.  There are no reports of the disease in your kingdom as of yet.  You can start researching a cure, but it will take a lot of resources and may not pay off for a long time.", function(){});
	
	addPotentialDecision(nations[1], 2, "Begin pollution cleanup efforts?", function(){return true;}, "<br><br>The industrialism of your nation has resulted in increased pollution levels.  You can begin an initiative to clean it up, but it could be a long time before you see the effects.  ");
	
	addPotentialDecision(nations[1], 1, "Commit industry to developing more a efficient food industry?", function(){return true;},"<br><br>New technological developments may allow you to commit some of the might of your industrial machine to increasing your food output." , foodEff );
	
	for( i = 0; i < 3; i++){
		addPotentialDecision(nations[1], i, "Annex Rothingradian farmland?", function(){return overMilitarized(nations[1], nations[0]);}, "<br><br>Your armies are strong.  You can simply annex some farmland from Rothingrad and deal with the consequences later. " , raidDecision);
	}
	
	
	
	
	
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

