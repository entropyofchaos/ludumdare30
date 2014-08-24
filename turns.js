
//returns an array containing [paragraph, decisionstrings, decisionfunctions]
function nextTurn()
{	
	currentDecisions=[];
	status = "";
	
	currentNation.turnCount++;

	currentNation = nations[(currentNationVal+1)%2];

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

	return ["Blah Blah", ["The only choice!"], [function(){boom()}]];
}
