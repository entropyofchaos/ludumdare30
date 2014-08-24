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
		
	  currentNation.famineCounter++;
	}

	if(isRiots(currentNation))
	{
	  status += riotStrings[currentNation.riotCounter];	
	
	  currentNation.riotCounter++;
	}

	if(cultureMoribund(currentNation))
	{
	  status += assimilationStrings[currentNation];
		
	  currentNation.assimilationCounter++;
	}
}


//returns an array containing [paragraph, decisionstrings, decisionfunctions]
function nextTurn()
{	
	turnReset();
	
	currentNation.turnCount++;
	
	currentNation = nations[(currentNationVal+1)%2];

	checkForTriggeredEvents(currentNation);
	
	checkForCurrentDecisions(currentNation);

	pollCounters();
	
	if(isLoss(currentNation))
	{
	
	  status += lossString(currentNation);
	  
	  currentDecisionStrings = [];
	  currentDecisionFunctions = [];
	  
	}
	
	return [status, currentDecisionStrings, currentDecisionFunctions];
}
