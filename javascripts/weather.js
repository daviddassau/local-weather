"use strict";

let weatherKey;
const dom = require('./dom');

const searchWeather = (query) => {
	// Promise weather
	return new Promise((resolve, reject) => {
		console.log(weatherKey);
		console.log(query);
		$.ajax(`http://api.openweathermap.org/data/2.5/weather?zip=${query}&appid=${weatherKey}&units=imperial`).done((data) => {
			resolve(data);
			console.log(data);
		}).fail((error) => {
			reject(error);
		});
	});
};

const setKey = (apiKey) => {
	weatherKey = apiKey;
	console.log(weatherKey);
};

module.exports = {searchWeather, setKey};