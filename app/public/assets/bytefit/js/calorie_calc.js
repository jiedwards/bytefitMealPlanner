var gender;
var unitConf = "imperial";
var weightMultiplier;
var heightMultiplier;

document.getElementById('metricUnits').style.display = 'none';
document.getElementById('imperialUnits').style.display = 'none';


(function() {
    ('[data-toggle="tooltip"]').tooltip();
});

// UUID generation function. In time, this will be replaced with a cookie to identify the user. 
function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
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
        $("#metricUnits").hide()
        $("#imperialUnits").show()
    } else if (choice.value == "metric") {
        unitConf = choice.value;
        $("#imperialUnits").hide()
        $("#metricUnits").show()
    }
}

function calculate() {
    //heavy lifting!

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
    //RETURN HERE AND FIGURE OUT CALCULATION FROM FT + IN into single value, readable only when dropdown has selected imperial/metric
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

    if (gender == "male") {
        if (endGoalText == "Lose Weight") {
            var result = ((((weightMultiplier * parseFloat(weight)) + (heightMultiplier * parseFloat(height)) - (5 * age) + 5) * activityLevel) - parseInt(endGoal.value));
        } else if (endGoalText == "Gain Weight") {
            var result = ((((weightMultiplier * parseFloat(weight)) + (heightMultiplier * parseFloat(height)) - (5 * age) + 5) * activityLevel)) + parseInt(endGoal.value);
        } else if (endGoalText == "Maintain Weight") {
            var result = (((weightMultiplier * parseFloat(weight)) + (heightMultiplier * parseFloat(height)) - (5 * age) + 5) * activityLevel);
        }
        // console.log("TEST" + endGoalText);

        // console.log(endGoal + "test" + endGoal.value + "test" + endGoal.text)
        // console.log("LEVEL : BOOM " + activityLevel)
        // console.log("LEVEL : goal " + endGoal)
        // var result = (((10 * parseFloat(weight)) + (6.25 * parseFloat(height)) - (5 * age) + 5) * activityLevel) + endGoal || - endGoal;
    } else if (gender == "female") {
        if (endGoalText == "Lose Weight") {
            var result = ((((weightMultiplier * parseFloat(weight)) + (heightMultiplier * parseFloat(height)) - (5 * age) - 161) * activityLevel) - endGoal.value);
        } else if (endGoalText == "Gain Weight") {
            var result = ((((weightMultiplier * parseFloat(weight)) + (heightMultiplier * parseFloat(height)) - (5 * age) - 161) * activityLevel) + endGoal.value);
        } else if (endGoalText == "Maintain Weight") {
            var result = (((weightMultiplier * parseFloat(weight)) + (heightMultiplier * parseFloat(height)) - (5 * age) - 161) * activityLevel);
        }

    }

    result = Math.round(result);
    // Write the result to the screen
    document.getElementById("answer").innerHTML = "Your expected calorie intake (daily) is: " + result;
    document.getElementById("calories").value = result;
    return result;
}


function generate_table(data) {
    let uuid = data.uuid;
    let calories = data.calories;
    let num_meals = data.num_meals;

    // get the reference for the body
    var body = document.getElementsByTagName("body")[0];

    // creates a <table> element and a <tbo> element
    var tbl = document.createElement("table");
    tbl.className='table table-bordered table-striped text-center'
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
    fetch('/api', options).then(function(response) {
        return response.text();
    }).then(function(data) {
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