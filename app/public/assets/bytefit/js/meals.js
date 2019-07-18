function get_userdata() {
    const calories = document.getElementById("calories").value;

    const data=calculate();

    const user=data.uuid;

    console.log('User: '+user+' '+'Calories: '+calories)

};