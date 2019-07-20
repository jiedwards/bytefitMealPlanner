Pseudocode Algorithm Food Picker 

user enters a caloric amount -> 
that caloric amount is then divided proportionally between the amount of meals a user wants to eat. ->
calorie meal splits should be created to recommend how many calories should to be allocated to each meal. 
(Can be pre-defined using percentages as seen below, the values have to be flexible though, a user may not want to only eat 400 cals max for breakfast, may want 700 instead on certain days. ) ->

e.g. a 2000 calorie, 4 meal choice: 

Meal 1: 20% of calories (400 cals)
Meal 2: 30% of calories (600 cals)
Meal 3: 35% of calories (700 cals)
Snack: 15% of calories (300 cals)

there won’t be a perfect meal plan which will allocate for 2000 cals exactly, so we should aim to go at least 150 cal’s on either side of the value we are aiming for, but still as close to possible to the goal.

Var calVariance = 150;
var minCal =  result - calVariance;
var maxCal = result + calVariance;

meal plan = Math.floor(Math.random() * (maxCal - minCal + 1)) + min;

generate plan as long as it falls into the value of meal plan.


ideally, foods should be categorised into suitable meal options ->
e.g. egg’s should be suitable for meal 1,2 or snack,
Chicken suitable for meal 2, 3

but for right now, whilst we're working out the algorithms we can do it all as completely random and improve it at a later date.
