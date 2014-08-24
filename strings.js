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

return "You have lost the game";
}
