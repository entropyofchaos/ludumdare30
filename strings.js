//game specific strings and string generator functions

var prologue = ""; //prologue paragraph for the game

var riotString1 = "The people are discontented.  Riots have begun.";

var riotString2 = "The rioting has continued.  The violence has spread far and wide.  Your forces are mobilizing in an effort to maintain control.";

var riotString3 = "Despite a strong show of force, you have been unable to suppress the growing dissent among your people.";

var riotStrings = [riotString1, riotString2, riotString3];


var famineString1 = "Your people are hungry.";

var famineString2 = "Your people are starving.";

var famineString3 = "Severe famine has spread through your nation.";

var famineStrings = [famineString1, famineString2, famineString3];


var assimilationString2 = "The people's faith is shakened.";
var assimilationString1 = "The people are losing touch with their roots.";
var assimilationString3 = "The people feel completely alienated from their own culture.";

var assimilationStrings = [assimilationString1, assimilationString2, assimilationString3];

function approvalString(nation)
{
  if(approvalStrong(nation))
  {
    return "Your people revere you.";
  }
  else if(approvalWeak(nation))
  {
    return "Your people despise you."
  }
  
  return "";
}


function appendOtherStatusStrings(nation)
{
  if(cultureStrong(nation))
  {
    status += "Pride in the nation is keeping your people united."
  }
  
  if(industryStrong(nation))
  {
    status += "Your industrial machine is the envy of the world."
  }
  
  status += approvalString(nation);
  
}


//generates a unique game loss state string based on the current game state
function lossString(nation)
{
  
  if(internationalRelations<=0)
  {
    return "Relations between " + nation1State.name + " and " + nation2State.name + " have been strained to the point of war.  It may be years before the damage can be fully repaired. <br> GAME OVER";
  }
    
  if(nation.famineCounter >=3 || nation.riotCounter >=3)
  {
    return "Discontent among the people has grown into a full scale revolution.  Your people have overthrown you and replaced you with someone who can get the job done better. <br> GAME OVER"
  }
  
  otherNation = nations[(currentNationVal+1)%2].name;

  return "Your nation's cultural values have eroded and been replaced with those of " + otherNation+ ".  "+otherNation + "'s political influence over your people has rendered you as little more than a tributary of their great empire.  <BR> GAME OVER";
  
}
