//choice to trade; exchanges resources, increases approval for other side
//event to end trade route 
//grow crops or build fishing industry

var fishPopulation = 1.0;
var globalPollution = 0.0;
var internationalRelations = .5;
var isTrading = false; 

var nation1State = {}

nation1State.food = .4;
nation1State.culturalHealth = .5;
nation1State.population = .25;  
nation1State.militarization = .1;
nation1State.approval = .5;
nation1State.name = "Rothingrad";
nation1State.turnCount=0;
nation1State.industry = .1;

nation1State.tradedFood = 0.0;
nation1State.tradedIndustry = 0.0;

nation1State.upcomingEvents = [];
nation1State.upcomingDecisions = [];

nation1State.famineCounter = 0;
nation1State.riotCounter = 0.0;
nation1State.assimilationCounter =0.0;

var nation2State = {}
nation2State.food = .15;
nation2State.culturalHealth = .9; 
nation2State.population = .4; 
nation2State.militarization = .25;
nation2State.approval = .35;
nation2State.name = "Sauria";
nation2State.turnCount = -1; //nextTurn() will be called at the start of the game.  default naiton is nation2State.  will increment turncounter to 0 before cycling to nation1State. 
nation2State.industry = .6;

nation2State.tradedFood = 0.0;
nation2State.tradedIndustry = 0.0;

nation2State.upcomingEvents = [];
nation2State.upcomingDecisions = [];

nation2State.famineCounter = 0;
nation2State.riotCounter = 0.0; //turns in a row riots have gone on
nation2State.assimilationCounter =0.0;

var nations = [nation1State, nation2State];
var currentNationVal = 1;

var currentNation = nations[currentNationVal];

var status = "";

var currentDecisionStrings=[];
var currentDecisionFunctions = [];

function isWin()
{
	return currentNation.turnCount == 3;
}


function isSurplus(nation)
{
	return nation.food > nation.population;
}

function makeTradeEvents()
{

 var rivalNation = otherNation();
 var industryDiff = currentNation.industry - otherNation.industry;
 var foodDiff = currentNation.food - otherNation.food;
 
 var isSurplusCurrent = currentNation.food > currentNation.population;
 var isSurplusRival = rivalNation.food > rivalNation.population;

 if(Math.sign(industryDiff) == Math.sign(foodDiff))
 {
   //enqueue no trade event
   if(Math.sign(industryDiff) <= 0.0){
   	addUpcomingEvent(currentNation, 0, function(){}, "No trade with "+rivalNation.name+" has occurred since you have nothing they want. ");	
   }
   else
   {	
   	addUpcomingEvent(currentNation, 0, function(){}, "No trade with "+rivalNation.name+" has occurred since they have nothing you want. ");
   }
 }
 else
 {
 	
   if(Math.sign(industryDiff) > 0.0)
   {
   	addUpcomingEvent(currentNation,0,tradeIndustryForFood, "You have traded industrial goods for food. ");
   }
   else
   {
   	addUpcomingEvent(currentNation, 0, tradeFoodForIndustry, "You have traded food for products from "+rivalNation.name);
   }
   	
 }

 //increase relations and approval
 
 //addUpcomingEvent(currentNation, 0, tradeFunction, "Trade with "+rival+" has ended. ");
 //Math.abs();

}


function otherNation()
{
  return nations[(currentNationVal +1 )%2];
}


function underMilitarized(currentNation, rival)
{
	return ( currentNation.militarization / rival.militarization) <= (1.0 / 1.25) ;
}

function overMilitarized(currentNation, rival)
{
	return (currentNation.militarization / rival.militarization) > 1.25;
}


function enqueueStatusTriggers(currentNation)
{
	
  rival = otherNation();
  
  //check for events that should trigger based on the current state machine
  if (overMilitarized(currentNation,rival))
  {
     
     var milstr = "International relations have been strained slightly due to the strength of your military presence. However, your people feel secure. "
 
     function milFunction(){ 
     	internationalRelations -=.1; 
     	currentNation.approval += .1;
     }
  
     addUpcomingEvent(currentNation, 0, milFunction, milstr);
  	
  }
  else if( underMilitarized(currentNation, rival) )
  {
     var milstr = "Your national security is much weaker than " + otherNationName() + ".  Your political rivals internally call you weak and sow dissent amongst your populace. ";
     
     function milFunction()
	 { 
     	currentNation.approval -= .1;
     }
     
     addUpcomingEvent(currentNation, 0, milFunction, milstr);
  
  }
  
  if(isTrading)
  {
  	if(!canTrade())
  	{
  	  function tradeFunction(){
  	  	trading  = false;
  	  }
  	  addUpcomingEvent(currentNation, 0, tradeFunction, "Trade with "+rival+" has ended. ");
  	}else
  	{
  	  
  	  makeTradeEvents();
  	  
  	}
  }
	
	
}


function isFamine(nation)
{
	
  return (nation.food + nation.tradedFood) < nation.population;

}


function isRiots(nation)
{

 var riotThresh=.1;

 if(nation.approval <= riotThresh)
 {

   //shit breaks out
   if(!nation.riotCounter)
   {
      return nation.approval <= riotThresh;
   }

   //mobilization to restore order
   if(nation.riotCounter ==1)
   {
     return nation.approval + nation.militarization <= riotThresh; 
   }

   //mob escalation
   return nation.approval + .75 * nation.militarization <= riotThresh;

 }

return false;
    
}


function cultureMoribund(nation)
{
return (nation.culturalHealth < .2);
}


function approvalStrong(nation)
{
 return nation.approval >=.7;
}

function approvalWeak(nation)
{
 return nation.approval <=.15;
}

function industryStrong(nation)
{
  return nation.industry >= .8;
}

function industryWeak(nation)
{
  return nation.industry <= .2;
}

function cultureStrong(nation)
{
  return nation.culturalHealth>=.8;
}


function canTrade()
{
   return internationalRelations > .4;
}

function isLoss( nation )
{
	if(nation.internationalRelations <=0.0)
	{
	  return true;
	}

	if(nation.riotCounter >= 3.0)
	{
	  return true; 
	}

	if(nation.famineCounter>=3.0)
	{
	  return true; 
	}

	if(nation.assimilationCounter >= 3.0)
	{
	 return true;
	}	
	
	return false;	
}





function populationSpillover()
{
  var largerPop;
  var smallerPop;

  if(nation1State.population > nation2State.population)
  {
    largerPop = nation1State;
    smallerPop = nation2State;
  }else
  {
    largerPop =nation2State;
    smallerPop = nation1State;
  }
  
  //the larger nation is overpopulated
  if(largerPop.population >1.0)
  {
	
	//tweakable param
	spilloverrate = .1;

  	maxspillover = largerPop.population - 1.0;
	spillover = Math.min(spilloverrate, maxspillover);

	///\todo something to track that immigration is an issue
	smallerPop.population += spillover;
	internationalRelations -= .5 * spillover;
	
  }
	
}

