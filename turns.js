function turnReset()
{
	currentDecisionStrings=[];
	currentDecisionFunctions = [];
	status = "";
}


function pollCounters()
{
	if(isFamine(currentNation))
	{
	  status += famineStrings[currentNation.famineCounter];
		
	  currentNation.approval -= .15;
		
	  currentNation.famineCounter++;
	}
	else
	{
		
	  if(currentNation.famineCounter)
	  {
		 
		 currentNation.approval += .1;
		 status += "The famine has ended. ";
		 
	  }
		
	  currentNation.famineCounter=0;
	}
	
	if(cultureMoribund(currentNation))
	{
	  status += assimilationStrings[currentNation];
		
	  currentNation.assimilationCounter++;
	}
	else
	{
		
	 if(currentNation.assimilationCounter)
	  {
		 
		 currentNation.approval += .1;
		 status += "The people have a renewed sense of their values. ";
		 
	  }
	  currentNation.assimilationCounter=0;
	}

	if(isRiots(currentNation))
	{
	  status += riotStrings[currentNation.riotCounter];
	  
	  currentNation.approval -= .15;
	
	  currentNation.riotCounter++;
	}
	else
	{
		
	  if(currentNation.riotCounter)
	  {
		 
		 currentNation.approval += .1;
		 status += "The riots have been suppressed. ";
		 
	  }
		
	  currentNation.riotCounter=0;
	}
	
	if(isHated(currentNation))
	{
		var holdFestivalStr = "Your people disapprove of your leadership skills. You can hold a festival to gain the peoples favor. ";

		addPotentialDecision( currentNation, 0, "Hold a festival?", function(){return true;}, holdFestivalStr, holdFestival);
	}
	
	if (nation1State.turnCount == 1 && nation2State.turnCount == 1)
	{
		stop('intoTheme');
		stop('raptorGrowl');
	}
	
	if (currentNation.militarization >= .25 && currentNation.bio == 0)
	{
		addPotentialDecision( currentNation, 0, "Develop biological weapons?", function(){return true;}, "<br><br>Your scientists have devised a way to destroy your enemies. You can now develop biological weapons.  ", developChemicalWeapons);
	}
}



//returns an array containing [paragraph, decisionstrings, decisionfunctions]
function nextTurn()
{	
	nation1State.tradedFood =0;
	nation2State.tradedFood=0;
	
	nation1State.tradedIndustry =0;
	nation2State.tradedIndustry=0;

	turnReset();
	
	currentNation.turnCount++;

	currentNationVal = (currentNationVal + 1)%2;
	
	currentNation = nations[currentNationVal];

	//instant events
	enqueueStatusTriggers(currentNation);

	checkForTriggeredEvents(currentNation);

	appendOtherStatusStrings(currentNation);
	
	pollCounters();

	checkForCurrentDecisions(currentNation);

	if(isLoss(currentNation))
	{
	
	  status += lossString(currentNation);
	  
	  currentDecisionStrings = [];
	  currentDecisionFunctions = [];
	  
	}
	else if(isWin())
	{
	
		status += winString;
		
		currentDecisionStrings = [];
		currentDecisionFunctions = [];
	
	}
	else
	{	//if we're not ending the game we must always have an option to continue
		if(!currentDecisionStrings.length)
		{
			currentDecisionStrings = ["Continue"];
			currentDecisionFunctions = [function(){}];
		}
	}
	
	return [status, currentDecisionStrings, currentDecisionFunctions];
}
