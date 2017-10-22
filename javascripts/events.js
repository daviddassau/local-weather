"use strict";

const weather = require("./weather");
const dom = require("./dom");

// const fiveDigitRegex=/^[0-9]+$/;
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



// This function might need clean up aka try not to use such nasty dom traversal
const daysChosen = () => {
	$(document).click((e) => {
		// only run when the buttons are clicked
		if (e.target.parentNode.id === "days") {
		// if (e.target.parentNode.id === "days") {
			console.log("here!");
			let currentChoiceFromDom = e.target.id;

			// using the id name set the corresponding number of days to show up
			let currentChoiceNumber = (currentChoiceFromDom === "one-day" ? 1 : currentChoiceFromDom === "three-day" ? 3 : 7);
			
			// And re-run the dom function showing the correct number of days chosen, using the same zip search.
			dom.showChosenNumberOfDays(currentChoiceNumber);
		}
	});
};

const searchZipcode = () => {
	let searchInput = $("#search-input").val();

	if (searchInput.length === 5 && searchInput.match(usZipCodeRegex)) {
		console.log("you entered a zipcode!");
		weather.searchWeather(searchInput);
		daysChosen();

	}
			// else {
			// 	// dom.printError(notAZip);
			// }
};



module.exports = {pressEnter, daysChosen, pressSearch};