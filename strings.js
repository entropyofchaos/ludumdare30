//game specific strings and string generator functions

var prologue = "A long long time ago, in a land far far away, there were two mighty kingdoms, Sauria and Rothingrad. "
				+ " Sauria was run by High Raptor Lord Saurian III. Rothingrad was run by Shifu Rothstine. <br><br>Rothstine's people are content, lead peaceful lives, and excel at agriculture.<br><br>Saurian's people are industrious, take pride in their military, and have strong cultural convictions.  However, they are inherently mistrustful of authority and have tragically suffered from a long famine and overpopulation.  <br><br>" ;//prologue paragraph for the game

var rothingrad = "You are Shifu Rothstine. Doesn't your portrait look lovely?<br><br>"

var saurian = "You are High Raptor Lord Saurian III. What nice shiny teeth you have.<br><br>"

var riotString1 = "The people are discontented.  Riots have begun.  ";

var riotString2 = "The rioting has continued.  The violence has spread far and wide.  Your forces are mobilizing in an effort to maintain control.  ";

var riotString3 = "Despite a strong show of force, you have been unable to suppress the growing dissent among your people.  ";

var riotStrings = [riotString1, riotString2, riotString3];

var famineString1 = "Your people are hungry.  ";

var famineString2 = "Your people are starving.  ";

var famineString3 = "Severe famine has spread through your nation.  ";

var famineStrings = [famineString1, famineString2, famineString3];


var assimilationString2 = "The people's faith is shakened.  ";
var assimilationString1 = "The people are losing touch with their roots.  ";
var assimilationString3 = "The people feel completely alienated from their own culture.  ";

var assimilationStrings = [assimilationString1, assimilationString2, assimilationString3];

function approvalString(nation)
{
  if(approvalStrong(nation))
  {
    return "Your people revere you.  ";
  }
  else if(approvalWeak(nation))
  {
    return "Your people despise you.  "
  }
  
  return "";
}

function otherNationName()
{

  return nations[(currentNationVal+1)%2].name;
  
}

function nationName()
{
return currentNation.name;
	
}



function relationsString(nation)
{
  var rival = nations[(currentNationVal+1)%2].name;
  
  prefix = "Relations with "+rival+ " are ";
  
  if(internationalRelations >= .8)
  {
    return prefix + " excellent.  ";
  }
  else if(internationalRelations >= .6)
  {
    return prefix + " good.  "
  }
  else if(internationalRelations >= .4)
  {
    return prefix + " neutral.";
  }
  else if(internationalRelations >= 2)
  {
    return prefix + " strained.  ";
  }
  else
  {
    return prefix + " hostile.  ";
  }
}

function appendOtherStatusStrings(nation)
{
  if(cultureStrong(nation))
  {
    status += "Pride in the nation is keeping your people united.  "
  }
  
  if(industryStrong(nation))
  {
    status += "Your industrial machine is the envy of the world.  "
  }else if(industryWeak(nation)){
	  status += "Your industry is weak. ";
   }
  
  if(isSurplus(nation))
  {
	status += "Your people have an abundance of food.  ";   
  }else{
	  //status += "No surplus!";
	  }
  
  status += approvalString(nation);
  
  status += relationsString(nation);
  
  
}


//generates a unique game loss state string based on the current game state
function lossString(nation)
{
  
  if(internationalRelations<=0)
  {
    return "Relations between " + nation1State.name + " and " + nation2State.name + " have been strained to the point of war.  It may be years before the damage can be fully repaired. <br> GAME OVER";
  }
    
  if( nation.riotCounter >=3)
  {
    return "Discontent among the people has grown into a full scale revolution.  Your people have overthrown you and replaced you with someone who can get the job done better. <br> GAME OVER"
  }
  
  if(nation.famineCounter >=3 )
  {
	  return "Widespread starvation has spread throughout the land.  Foreign governments seize upon the tragedy to intervene in your affairs and remove you from power. ";
  }
  
  otherNation = nations[(currentNationVal+1)%2].name;

  return "Your nation's cultural values have eroded and been replaced with those of " + otherNation+ ".  "+otherNation + "'s political influence over your people has rendered you as little more than a tributary of their great empire.  <BR> GAME OVER";
  
}
