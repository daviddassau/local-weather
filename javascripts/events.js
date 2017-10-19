"use strict";

const weather = require('./weather');

const pressEnter = () => {
	$(document).keypress((e) => {
		if(e.key === 'Enter'){
			// let searchText = $('#searchBar').val();
			validateInput();
			weather.searchWeather(90210);
			console.log("event", e);
		}
	});
};

const validateInput = (zip) => {   
    if($('#searchBar').val().length > 5){
        console.log("The zip code must have 5 digits");   
    } 
};


module.exports = {pressEnter};