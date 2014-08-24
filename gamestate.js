//choice to trade; exchanges resources, increases approval for other side
//event to end trade route 
//grow crops or build fishing industry

var fishPopulation = 1.0;
var globalPollution = 0.0;
var internationalRelations = .5;
var isTrading = false; 

var nation1State = {}

nation1State.food = .25;
nation1State.culturalHealth = .5;
nation1State.population = .25;  
nation1State.militarization = .1;
nation1State.approval = .5;
nation1State.name = "Rothstein";
nation1State.turnCount=0;
nation1State.industry = .1;


nation1State.upcomingEvents = [];
nation1State.upcomingDecisions = [];

nation1State.famineCounter = 0;
nation1State.riotCounter = 0.0;
nation1State.assimilationCounter =0.0;

var nation2State = {}
nation2State.food = .15;
nation2State.culturalHealth = .9; //faith in the nation is keeping us strong
nation2State.population = .25; //population can’t exceed food or famine
nation2State.militarization = .2;
nation2State.approval = .5;
nation2State.name = "Sauria";
nation2State.turnCount = -1; //nextTurn() will be called at the start of the game.  default naiton is nation2State.  will increment turncounter to 0 before cycling to nation1State. 
nation2State.industry = .6;

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

function isFamine(nation)
{
	
  return nation.food < nation.population;

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


function cultureMoribund()
{
	
  

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
  if(largerPop.population >1.0){
	
	//tweakable param
	spilloverrate = .1;

  	maxspillover = largerPop.population - 1.0;
	spillover = Math.min(spilloverrate, maxspillover);

	///\todo something to track that immigration is an issue
	smallerPop.population += spillover;
	internationalRelations -= .5 * spillover;
	
  }
	
}

