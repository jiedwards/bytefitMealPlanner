var gender;
var unitConf = "imperial";
var weightMultiplier;
var heightMultiplier;
var result;

document.getElementById('metricUnits').style.display = 'none';
document.getElementById('imperialUnits').style.display = 'none';


(function () {
    ('[data-toggle="tooltip"]').tooltip();
});

// UUID generation function. In time, this will be replaced with a cookie to identify the user. 
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

// Function to read gender, is read immediately if changed
function profileTest(genderProfile) {
    if (genderProfile.value == "male") {
        gender = genderProfile.value;
    } else if (genderProfile.value == "female") {
        gender = genderProfile.value;
    }
}

var imp;

// Function to read unit choice, this is used to hide/show div's, WIP - will be used to change the equation
function unitChoice(choice) {

    if (choice.value == "imperial") {
        unitConf = choice.value;
        $("#metricUnits").hide();
        document.getElementById("imperialWeight").value = Math.round((document.getElementById("metricWeight").value * 2.2));
        $("#imperialUnits").show();
    } else if (choice.value == "metric") {
        unitConf = choice.value;
        document.getElementById("metricWeight").value = Math.round((document.getElementById("imperialWeight").value / 2.2));

        $("#imperialUnits").hide()
        $("#metricUnits").show()
    }
}
// Displays more information on certain area's of the page when scrolled over.
function moreInfo(choice) {

    tippy('#goalTooltip', {
        placement: 'right',
        content: "Why we need this data? <br><h7>If <u>lose weight</u> is chosen, a calorie defecit of 500 calories is applied with the aim to lose 1lb per week</h7><br><h7>If <u>gain weight</u> is chosen, a calorie surplus of 500 calories is applied with the aim to gain 1lb per week</h7><br><h7>If <u>maintain weight</u> is chosen, no calorie defecit/surplus is applied</h7>",
    })

    tippy('#activityTooltip', {
        placement: 'right',
        content: "Why we need this data? <br><h7>To provide you with an accurate calorie reading, it's important to know how active you are on a daily basis as this factor contributes to your daily calorie allowance.</h7> <br> <h7><u>Sedentary</u>: Very little exercise weekly </h7><br><h7><u>Lightly Active</u>: Light Exercise: 1-3 days per week </h7><br><h7><u>Moderately Active</u>: A good amount of exercise, 5-7 times per week </h7><br><h7><u>Very Active</u>: Hard Exercise Daily: 2x's per day </h7><br><h7><u>Extremely Active</u>: Hard Exercise: Twice or more daily, marathon training, triathalon etc. </h7>",
    })
}
//Function to calculate user calorie intake.
function calculate() {
    //retrieves the values selected on the form to calculate a users' calorie intake.
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
    //figures out which unit type is being used, then it sets the appropriate values to do the calculation.
    if (unitConf == "imperial") {

        var imperialHeightFt = document.getElementById("imperialHeightFt");
        var imperialHeightFtUnit = imperialHeightFt.options[imperialHeightFt.selectedIndex].value;
        var imperialHeightInch = document.getElementById("imperialHeightInch");
        var imperialHeightInchUnit = imperialHeightInch.options[imperialHeightInch.selectedIndex].value;

        height = (((imperialHeightFtUnit) * 12) + parseInt(imperialHeightInchUnit));
        weight = document.getElementById("imperialWeight").value;
        heightMultiplier = 15.88;
        weightMultiplier = 4.536;
    } else if (unitConf == "metric") {
        height = document.getElementById("metricHeight").value;
        weight = document.getElementById("metricWeight").value;
        heightMultiplier = 6.25;
        weightMultiplier = 10;
    }
    //calculation for end calorie result, it's dependent on gender + user's goal.
    if (gender == "male") {
        if (endGoalText == "Lose Weight") {
            result = ((((weightMultiplier * parseFloat(weight)) + (heightMultiplier * parseFloat(height)) - (5 * age) + 5) * activityLevel) - parseInt(endGoal.value));
        } else if (endGoalText == "Gain Weight") {
            result = ((((weightMultiplier * parseFloat(weight)) + (heightMultiplier * parseFloat(height)) - (5 * age) + 5) * activityLevel)) + parseInt(endGoal.value);
        } else if (endGoalText == "Maintain Weight") {
            result = (((weightMultiplier * parseFloat(weight)) + (heightMultiplier * parseFloat(height)) - (5 * age) + 5) * activityLevel);
        }
    } else if (gender == "female") {
        if (endGoalText == "Lose Weight") {
            result = ((((weightMultiplier * parseFloat(weight)) + (heightMultiplier * parseFloat(height)) - (5 * age) - 161) * activityLevel) - parseInt(endGoal.value));
        } else if (endGoalText == "Gain Weight") {
            result = ((((weightMultiplier * parseFloat(weight)) + (heightMultiplier * parseFloat(height)) - (5 * age) - 161) * activityLevel) + parseInt(endGoal.value));
        } else if (endGoalText == "Maintain Weight") {
            result = (((weightMultiplier * parseFloat(weight)) + (heightMultiplier * parseFloat(height)) - (5 * age) - 161) * activityLevel);
        }

    }

    //total result and macros calculation
    result = Math.round(result);
    var carbs = Math.round((result * 0.5) / 4);
    var fats = Math.round((result * 0.3) / 4);
    var proteins = Math.round((result * 0.2) / 9);
    // Write the result to the screen



    //checks to see if result is valid, if no then it prints an error message, and sets the manual calorie box to default.
    if (isNaN(result)) {
        document.getElementById("answer").innerHTML = "You have not filled in the form correctly, please try again!";
        document.getElementById("calories").value = 2000;
    }
    //if yes then it prints cal's and macros
    else {
        document.getElementById("calories").value = result;
        document.getElementById("answer").innerHTML = "Your expected calorie intake (daily) is: " + result;
        document.getElementById("macros").innerHTML = "A balanced macronutrient ratio for you would be: " +
            "Carbs: " + carbs + "g " +
            "Protein: " + proteins + "g " +
            "Fats: " + fats + "g ";
    }
    return result;

}

//Function to save user calorie intake.
function saveUserCal() {

    console.log(result);
 
    var url = "/users/userCal"
    xhr.open("PUT", url, true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
    xhr.send(result);
}


function generate_table(data) {
    let uuid = data.uuid;
    let calories = data.calories;
    let num_meals = data.num_meals;

    // get the reference for the body
    var body = document.getElementsByTagName("body")[0];

    // creates a <table> element and a <tbo> element
    var tbl = document.createElement("table");
    tbl.className = 'table table-bordered table-striped text-center'
    var tblBody = document.createElement("tbody");

    // creates table rows from the number of meals
    for (var i = 0; i < num_meals; i++) {
        var row = document.createElement("tr");

        // creates table rows (this should match up against macros or something)
        for (var j = 0; j < 4; j++) {
            // Create a <td> element and a text node, make the text
            // node the contents of the <td>, and put the <td> at
            // the end of the table row
            var cell = document.createElement("td");
            var cellText = document.createTextNode("cell in row " + i + ", column " + j);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }

        // add the row to the end of the table body
        tblBody.appendChild(row);
    }

    // put the <tbody> in the <table>
    tbl.appendChild(tblBody);
    // appends <table> into <body>
    body.appendChild(tbl);
    // sets the border attribute of tbl to 2;
    return tbl;
}

function go(submitted) {
    // if button is clicked change this to true, this will then hide DOM elements.
    var is_submitted = true;
    // how many calories btn purely fills a box now, when go! is hit, this function is ran.

    // this doesnt do any calculations, it just prepares for the next stage.
    calories = document.getElementById("calories").value
    num_meals = document.getElementById("num_meals").value

    if (calories == "") {
        console.log('No calories specified');
        return null;
    }
    // Get a new UUID.
    const uuid = uuidv4()

    // package the calorie number and an identifier together into a json object
    const data = {
        uuid,
        calories,
        num_meals
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
    fetch('/api', options).then(function (response) {
        return response.text();
    }).then(function (data) {
        console.log(data); // this will be a string
    });
    // return both uuid and result


    if (is_submitted == "false") {
        $("#calculation").show()
        $("#meal_page").hide()
    } else {
        console.log(is_submitted);
        $("#calculation").hide()
        $("#banner").hide()
        $("#meal_page").show()
        document.getElementById("calories_span").innerHTML = calories;
        document.getElementById("meal_table").innerHTML = generate_table(data);
    }

}