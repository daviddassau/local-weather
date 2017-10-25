"use strict";

let weatherKey;
const dom = require("./dom");

const searchWeatherAPI = (query) => {
	return new Promise((resolve, reject) => {
		$.ajax(`http://api.openweathermap.org/data/2.5/forecast?zip=${query},us&appid=${weatherKey}&units=imperial`).done((data) => {
			resolve(data);
		}).fail((error) => {
			reject(error);
		});
	});
};

const searchWeather = (query) => {
	searchWeatherAPI(query).then((data) => {
		showResults(data);
	}).catch((error) => {
		console.log("error in search weather", error);
		dom.printError();
	});
};

const setKeys = (apiKey) => {
	weatherKey = apiKey;
};

const showResults = (weatherArray) => {

	let fiveDayForecast = [];

	for (let i = 0; i < weatherArray.list.length; i++) {
		if (i === 0 || i ===  8 || i === 16 || i ===  32 || i === 39) {
			fiveDayForecast.push(weatherArray.list[i]);
		}
	}
	dom.clearDom();

	// just get all 5 days in 3h format, store em in search-input, only show what the user asks for
	// every 8th object is pushed to a new array to be used
	// That way I can minimize the calls I make to the API

	dom.setWeatherArray(fiveDayForecast);
};

module.exports = {setKeys, searchWeather};