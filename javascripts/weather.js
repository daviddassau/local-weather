"use strict";

let weatherKey;
const dom = require("./dom");

const searchWeatherAPI = (query) => {
	return new Promise((resolve, reject) => {
		$.ajax(`http://api.openweathermap.org/data/2.5/forecast?zip=${query},us&appid=${weatherKey}&units=imperial&cnt=7`).done((data) => {
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
	});
};

const setKeys = (apiKey) => {
	weatherKey = apiKey;
};

const showResults = (weatherArray) => {
	dom.clearDom();

	// just get all 7 days, store em in setWeatherArray, only show what the user asks for
	// That way I can minimize the calls I make to the API

	dom.setWeatherArray(weatherArray);
};

module.exports = {setKeys, searchWeather};