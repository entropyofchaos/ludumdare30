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
	else
	{
	  currentNation.famineCounter=0;
	}
	

	if(isRiots(currentNation))
	{
	  status += riotStrings[currentNation.riotCounter];	
	
	  currentNation.riotCounter++;
	}
	else
	{
	  currentNation.riotCounter=0;
	}
	

	if(cultureMoribund(currentNation))
	{
	  status += assimilationStrings[currentNation];
		
	  currentNation.assimilationCounter++;
	}
	else
	{
	  currentNation.assimilationCounter=0;
	}
}


//returns an array containing [paragraph, decisionstrings, decisionfunctions]
function nextTurn()
{	
	turnReset();
	
	currentNation.turnCount++;

	currentNationVal = (currentNationVal + 1)%2;
	
	currentNation = nations[currentNationVal];

	checkForTriggeredEvents(currentNation);
	
	checkForCurrentDecisions(currentNation);

	pollCounters();
	
	if(isLoss(currentNation))
	{
	
	  status += lossString(currentNation);
	  
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
