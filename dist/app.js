(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

const weather = require("./weather");

const apiKeys = () => {
	return new Promise((resolve, reject) => {
		$.ajax("./db/apiKeys.json").done((data) => {
			resolve(data.apiKeys);
		}).fail((error) => {
			reject(error);
		});
	});
};

const retrieveKeys = () => {
	apiKeys().then((results) => {
		weather.setKeys(results.weather.apiKey);
	}).catch((error) => {
			console.log("error", error);
	});
};

module.exports = {retrieveKeys};
},{"./weather":5}],2:[function(require,module,exports){
"use strict";

let chosenLength = 1;
let weatherArray;


const runDomString = () => {
	clearDom();
	domString(weatherArray, chosenLength);
};

const domString = (weatherArray, days) => {
	let domStrang = "";

		domStrang +=	`<div class="container-fluid">`;
		domStrang +=		`<h3 class="text-center" id="cityName">For Zipcode: "${$('#search-input').val()}"</h3>`;

	for (let i=0; i<chosenLength; i++) {
		if (i % 3 === 0) {
			domStrang +=	`<div class="row">`;
		}

		domStrang +=			`<div class="col-sm-4">`;
		domStrang +=				`<div class="thumbnail text-center">`;
		domStrang +=					`<div class="info">`;
		domStrang +=						`<h3>${weatherArray.city.name}</h3>`;
		domStrang +=						`<p>Temperature: ${weatherArray.list[i].main.temp}&deg F</p>`;
		domStrang +=						`<p>Conditions: ${weatherArray.list[i].weather[0].description}</p>`;
		domStrang +=						`<p>Air pressure: ${weatherArray.list[i].main.pressure} hpa</p>`;
		domStrang +=						`<p>Wind speed: ${weatherArray.list[i].wind.speed} m/s</p>`;
		domStrang +=					`</div>`;
		domStrang +=				`</div>`;
		domStrang +=			`</div>`;
				if (i % 3 === 2 || i === chosenLength - 1) {
			domStrang +=	`</div>`;
		}


	}
		domStrang +=		`</div>`;
	printToDom(domStrang);
};

const printForecastButtons = () => {

	let timeStamp = new Date().toLocaleTimeString();

	$("#days").html (
	`<div class="container">
	  <div class="row">
	 	 <div class=" col-xs-12">
  		 <div class="well">
				<div class="btn-group col-xs-offset-3" role="group" id="days">
					<button type="button" class="btn btn-default" name="one day" id="one-day">Today's forecast</button>
					<button type="button" class="btn btn-default" id="three-day">3 day forecast</button>
					<button type="button" class="btn btn-default" id="five-day">5 day forecast</button>
					<p class="text-center">Last Updated: ${timeStamp}</p>
	 			</div>
	 		</div>
	 	</div>
	 </div>`
	);
};



const printToDom = (strang) => {
	$("#output").append(strang);
	printForecastButtons();
};


const setWeatherArray = (weather) => {
	 weatherArray = weather;
	 runDomString();
};

const showChosenNumberOfDays = (numberOfDays) => {
	chosenLength = numberOfDays;
	runDomString();
};


const clearDom = () => {
	$("#output").empty();
};

const printError = () => {
	clearDom();
	let userError = "";
		userError += `<div class="row">`;
		userError += `<div class="alert alert-danger text-center col-xs-6 col-xs-offset-3" role="alert">I only accept valid 5 digit US zip codes</div>`;
		userError += `</div>`;
	$("#output").append(userError);
};




module.exports = {setWeatherArray, clearDom, showChosenNumberOfDays, printError};






},{}],3:[function(require,module,exports){
"use strict";

const weather = require("./weather");
const dom = require("./dom");

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
			console.log("here!");
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
		daysChosen();

	} else {
			dom.printError();
		}
};



module.exports = {pressEnter, pressSearch, daysChosen};
},{"./dom":2,"./weather":5}],4:[function(require,module,exports){
"use strict";

let events = require("./events");
let apiKeys = require("./apiKeys");

apiKeys.retrieveKeys();
// apiKeys.apiKeys();
events.pressEnter();
events.pressSearch();
},{"./apiKeys":1,"./events":3}],5:[function(require,module,exports){
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
		dom.printError();
	});
};

const setKeys = (apiKey) => {
	weatherKey = apiKey;
};

const showResults = (weatherArray) => {

	let fiveDayForecast = [];

	for (let i=0; i<weatherArray.list.length; i++) {
		if (i === 0 ||i ===  8 || i === 16 ||i ===  32 ||i === 39) {
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
},{"./dom":2}]},{},[4]);
