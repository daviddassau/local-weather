"use strict";

const weather = require("./weather");
const dom = require("./dom");
const firebaseApi = require("./firebaseApi");

const usZipCodeRegex =/(^\d{5}$)|(^\d{5}-\d{4}$)/;

const pressEnter = () => {
	$(document).keypress((event) => {
		if (event.key === "Enter") {
			searchZipcode();
			} 
	});
};

const pressSearch = () => {
	$("#search-btn").click((event) => {
		searchZipcode();
	});
};


const daysChosen = () => {
	$(document).click((e) => {
		// only run when the buttons are clicked
		if (e.target.parentNode.id === "days") {
			let currentChoiceFromDom = e.target.id;

			// using the id name set the corresponding number of days to show up
			let currentChoiceNumber = (currentChoiceFromDom === "one-day" ? 1 : currentChoiceFromDom === "three-day" ? 3 : 5);
			
			// And re-run the dom function showing the correct number of days chosen, using the same zip search.
			dom.showChosenNumberOfDays(currentChoiceNumber);
		}
	});
};

const searchZipcode = () => {
	let searchInput = $("#search-input").val();

	if (searchInput.match(usZipCodeRegex)) {
		weather.searchWeather(searchInput);
		// weather.searchForecast(searchInput);
		daysChosen();

	} else {
		dom.printError();
	}
};

const myLinks = () => {
	$(document).click(() => {
		if(event.target.id === "authenticateTab"){
			$("#authScreen").removeClass("hide");
			$("#weatherScreen").addClass("hide");
			$("#mySavedWeatherScreen").addClass("hide");
		} else if(event.target.id === "weatherTab"){
			$("#authScreen").addClass("hide");
			$("#weatherScreen").removeClass("hide");
			$("#mySavedWeatherScreen").addClass("hide");
		} else if(event.target.id === "mySavedWeatherTab"){
			$("#authScreen").addClass("hide");
			$("#weatherScreen").addClass("hide");
			$("#mySavedWeatherScreen").removeClass("hide");
		}
	});
};

const googleAuth = () => {
	$("#googleButton").click((e) => {
		firebaseApi.authenticateGoogle().then((result) => {
			console.log("result", result);
		}).catch((err) => {
			console.log("error in authenticateGoogle", err);
		});
	});
};



module.exports = {pressEnter, pressSearch, daysChosen, myLinks, googleAuth};


