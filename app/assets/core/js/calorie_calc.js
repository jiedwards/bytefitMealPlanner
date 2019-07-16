
    var gender;

function profileTest(genderProfile) {
    if (genderProfile.value == "male"){
        gender = genderProfile.value;
    }
    else if (genderProfile.value == "female") {
        gender = genderProfile.value;
    }
}

function calculate() {

    var height=document.getElementById("height").value;
    var weight=document.getElementById("weight").value;
    var age=document.getElementById("age").value;
    var activityLevel = document.getElementById("activityLevel");
    activityLevel = activityLevel.options[activityLevel.selectedIndex].value;
    var endGoal = document.getElementById("endGoal");
    var endGoalText = endGoal.options[endGoal.selectedIndex].text;
    var radios = document.getElementsByName('activityLevel');

    for (var i = 0, length = radios.length; i < length; i++){
    if (radios[i].checked) {
        activityLevel = radios[i].value;
        console.log("test" + activityLevel);
    }
    }

    if (gender == "male"){
        console.log(endGoalText);
        console.log(endGoal.value);
        if (endGoalText == "Lose Weight")
        {
            var result = ((((10 * parseFloat(weight)) + (6.25 * parseFloat(height)) - (5 * age) + 5) * activityLevel) - endGoal.value);
        }
        else if (endGoalText == "Gain Weight")
        {
            var result = ((((10 * parseFloat(weight)) + (6.25 * parseFloat(height)) - (5 * age) + 5) * activityLevel) + endGoal.value);
        }
        else if (endGoalText == "Maintain Weight")
        {
            var result = (((10 * parseFloat(weight)) + (6.25 * parseFloat(height)) - (5 * age) + 5) * activityLevel);
        }
        // console.log("TEST" + endGoalText);

        // console.log(endGoal + "test" + endGoal.value + "test" + endGoal.text)
        // console.log("LEVEL : BOOM " + activityLevel)
        // console.log("LEVEL : goal " + endGoal)
        // var result = (((10 * parseFloat(weight)) + (6.25 * parseFloat(height)) - (5 * age) + 5) * activityLevel) + endGoal || - endGoal;
    }
    else if (gender == "female"){
        console.log("LEVEL : FEMALE " + activityLevel)
        console.log("LEVEL : goal " + endGoal)
        var result = (((10 * parseFloat(weight)) + (6.25 * parseFloat(height)) - (5 * age) - 161) * activityLevel) + endGoal || - endGoal;
    }
    document.getElementById("answer").innerHTML="Your expected calorie intake (daily) is: " +Math.round(result); 
}