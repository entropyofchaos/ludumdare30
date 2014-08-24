//event is [turn, functionToCall, dayString]
//decision is [turn, choicestring, canExecuteFun, statusString, executeFun]

var EVENT_TURN_INDEX = 0;
var EVENT_FUNCTION_INDEX=1;
var EVENT_DAY_STRING=2;

var DECISION_TURN_INDEX=0;
var DECISION_CHOICE_STRING_INDEX=1;
var DECISION_CAN_EXECUTE_FUN_INDEX=2;
var DECISION_STATUS_STRING_INDEX=3;
var DECISION_EXECUTE_FUN_INDEX=4;

function addPotentialDecision(nation, turnToExecute, choiceString, canExecuteFun, statusString, executeFun)
{
	nation.upcomingDecisions.push([turnToExecute, choiceString, canExecuteFun, statusString, executeFun]);
}

function addUpcomingEvent(nation, onTurn, fToCall, dayString)
{
	nation.upcomingEvents.push([onTurn, fToCall, dayString]);
}

function fireEvent(event)
{
	event[EVENT_FUNCTION_INDEX]();
	status += event[EVENT_DAY_STRING];
}

function wrapDecision(decision)
{
	return function(){fireDecision(decision);};
}

function fireDecision(decision)
{

}

function pushDecision()
{
	if(decision[DECISION_CAN_EXECUTE_FUN_INDEX]())
	{
	  status += decision[DECISION_STATUS_STRING_INDEX];
	  currentDecisionFunctions.push(decision[DECISION_EXECUTE_FUN_INDEX]);
	  currentDecisionStrings.push(decision[DECISION_CHOICE_STRING_INDEX]);
	}	
}


function eraseEvent(nation, event)
{
  var index = nation.upcomingEvents.indexOf(event);

  if (index > -1) {
    nation.upcomingEvents.splice(index, 1);
  }
}

function eraseDecision(nation, event)
{
  var index = nation.upcomingDecisions.indexOf(event);

  if (index > -1) {
    nation.upcomingDecisions.splice(index, 1);
  }
}


function checkForTriggeredEvents(nation)
{
  for(i =0; i < nation.upcomingEvents.length; i++)
  {
	event = nation.upcomingEvents[i];

	if(event[0] <= nation.turnCount)
	{	
	   fireEvent(event);
	   eraseEvent(nation, event);
	}	
  }
}

function checkForCurrentDecisions()
{
	for(i =0; i < nation.upcomingDecisions.length; i++)
	{
		decision = nation.upcomingDecisions[i];

		if(decision[0] <= nation.turnCount)
		{
			pushDecision(decision);
			eraseDecision(nation,decision); 
		}
	}
}
