(function () {
    ('[data-toggle="tooltip"]').tooltip();
});

function toggleFoodFields() {
    var x = document.getElementById("additionalFoodNutrients");
    var fieldsButton = document.getElementById("additionalFieldsBtn");
    if (x.style.display === "block") {
        x.style.display = "none";
        fieldsButton.innerHTML = "Show Additional Fields";
    } else {
        x.style.display = "block";
        fieldsButton.innerHTML = "Hide Additional Fields";
    }
}