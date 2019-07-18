var gender;

// UUID generation function. In time, this will be replaced with a cookie to identify the user. 
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function profileTest(genderProfile) {
    if (genderProfile.value == "male") {
        gender = genderProfile.value;
    } else if (genderProfile.value == "female") {
        gender = genderProfile.value;
    }
}

function calculate() {
    //heavy lifting!
    var height = document.getElementById("height").value;
    var weight = document.getElementById("weight").value;
    var age = document.getElementById("age").value;
    var activityLevel = document.getElementById("activityLevel");
    activityLevel = activityLevel.options[activityLevel.selectedIndex].value;
    var endGoal = document.getElementById("endGoal");
    var endGoalText = endGoal.options[endGoal.selectedIndex].text;
    var radios = document.getElementsByName('activityLevel');

    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            activityLevel = radios[i].value;
        }
    }

    if (gender == "male") {
        if (endGoalText == "Lose Weight") {
            var result = ((((10 * parseFloat(weight)) + (6.25 * parseFloat(height)) - (5 * age) + 5) * activityLevel) - parseInt(endGoal.value));
        } else if (endGoalText == "Gain Weight") {
            var result = ((((10 * parseFloat(weight)) + (6.25 * parseFloat(height)) - (5 * age) + 5) * activityLevel)) + parseInt(endGoal.value);
        } else if (endGoalText == "Maintain Weight") {
            var result = (((10 * parseFloat(weight)) + (6.25 * parseFloat(height)) - (5 * age) + 5) * activityLevel);
        }
        // console.log("TEST" + endGoalText);

        // console.log(endGoal + "test" + endGoal.value + "test" + endGoal.text)
        // console.log("LEVEL : BOOM " + activityLevel)
        // console.log("LEVEL : goal " + endGoal)
        // var result = (((10 * parseFloat(weight)) + (6.25 * parseFloat(height)) - (5 * age) + 5) * activityLevel) + endGoal || - endGoal;
    } else if (gender == "female") {
        if (endGoalText == "Lose Weight") {
            var result = ((((10 * parseFloat(weight)) + (6.25 * parseFloat(height)) - (5 * age) - 161) * activityLevel) - endGoal.value);
        } else if (endGoalText == "Gain Weight") {
            var result = ((((10 * parseFloat(weight)) + (6.25 * parseFloat(height)) - (5 * age) - 161) * activityLevel) + endGoal.value);
        } else if (endGoalText == "Maintain Weight") {
            var result = (((10 * parseFloat(weight)) + (6.25 * parseFloat(height)) - (5 * age) - 161) * activityLevel);
        }

    }

    result=Math.round(result);
    // Write the result to the screen
    document.getElementById("answer").innerHTML = "Your expected calorie intake (daily) is: " + result;
    document.getElementById("calories").value = result;

    // Get a new UUID.
    const uuid = uuidv4()

    // package the calorie number and an identifier together into a json object
    const data = {
        uuid,
        result
    };

    // Define the headers for the POST request
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    // send a POST request to /api in index.js, the data can then be parsed serverside (added to db). 
    // the server will respond purely by reflecting the data which is good for debugging, but probably going to be deleted eventually.
    // .then down top the console log can go tbf
    fetch('/api', options).then(function(response) {
        return response.text();
    }).then(function(data) {
        console.log(data); // this will be a string
    });
    // return both uuid and result
    return data;
}