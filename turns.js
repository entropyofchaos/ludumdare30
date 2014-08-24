
//returns an array containing [paragraph, decisionstrings, decisionfunctions]
function nextTurn()
{	
	currentDecisions=[];
	status = "";
	
	currentNation.turnCount++;

	currentNation = nations[(currentNation+1)%2];

	if(isFamine(currentNation))
	{
	  currentNation.famineCounter++;
	}

	if(isRiots(currentNation))
	{
	  currentNation.riotCounter++;
	}

	if(cultureMoribund(currentNation))
	{
	  currentNation.assimilationCounter++;
	}

	
}
