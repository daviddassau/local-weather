"use strict";

let weatherKey;
let forecastCity = "";
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

// const searchForecastAPI = (query) => {
// 	return new Promise((resolve, reject) => {
// 		$.ajax(`http://api.openweathermap.org/data/2.5/weather?zip=${query},us&appid=${weatherKey}&units=imperial`).done((data) => {
// 			resolve(data);
// 		}).fail((error) => {
// 			reject(error);
// 		});
// 	});
// };

// const searchForecast = (query) => {
// 	searchForecastAPI(query).then((data) => {
// 		showResults(data);
// 	}).catch((error) => {
// 		dom.printError();
// 	});
// };

const setKeys = (apiKey) => {
	weatherKey = apiKey;
};

const showResults = (weatherArray) => {

	let fiveDayForecast = [];
	forecastCity = weatherArray.city.name;
	console.log("forecastCity", forecastCity);

	for (let i = 0; i < weatherArray.list.length; i++) {
		if (i === 0 || i ===  8 || i === 16 || i ===  32 || i === 39) {
			fiveDayForecast.push(weatherArray.list[i]);
		}
	}
	dom.clearDom();

	console.log("forecastCity", forecastCity);
	dom.setWeatherArray(fiveDayForecast, forecastCity);
};

let getCity = () => {
	return forecastCity;
};

module.exports = {setKeys, searchWeather, getCity};




