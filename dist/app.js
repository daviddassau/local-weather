(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

const weather = require('./weather');

const apiKeys = () => {
	// promise
	return new Promise((resolve, reject) => {
		$.ajax('./db/apiKeys.json').done((data) => {
			resolve(data.apiKeys);
		}).fail((error) => {
			reject(error);
		});
	});
};

const retrieveKeys = () => {
	apiKeys().then((results) => {
		weather.setKey(results.weather.apiKey);
		console.log(results);
	}).catch((error) => {
		console.log('error in retrieveKeys', error);
	});
};

module.exports = {retrieveKeys};
},{"./weather":5}],2:[function(require,module,exports){
"use strict";

const domString = (weatherArray) => {
	let domStrang = '';
	for (let i = 0; i < weatherArray.length; i++) {
		domStrang += `<div class="row">`;
		domStrang +=   `<div class="col-md-12">`;
		domStrang +=     `<p>Temperature</p>`;
		domStrang +=     `<p>Conditions</p>`;
		domStrang +=     `<p>Air pressure</p>`;
		domStrang +=     `<p>Wind speed</p>`;
		domStrang +=   `</div>`;
		domStrang += `</div>`;
	}
	printToDom(domStrang);
};

const printToDom = (strang) => {
	$('#weatherDom').append(strang);
};

module.exports = {domString};




// const domString = (movieArray, imgConfig) => {
// 	let domStrang = '';
// 	for (let i = 0; i < movieArray.length; i++) {
// 		if (i % 3 === 0) {
// 			// console.log(i % 3);
// 			domStrang += `<div class="row">`;
// 		}
// 		domStrang += `<div class="col-sm-6 col-md-4">`;
// 		domStrang +=   `<div class="thumbnail">`;
// 		domStrang +=     `<img src="" alt="">`;
// 		domStrang +=     `<div class="caption">`;
// 		domStrang +=       `<img src="${imgConfig.base_url}w300${movieArray[i].poster_path}">`;
// 		domStrang +=       `<h3>${movieArray[i].original_title}</h3>`;
// 		domStrang +=       `<p>${movieArray[i].overview}</p>`;
// 		domStrang +=       `<p><a href="#" class="btn btn-primary" role="button">Review</a> <a href="#" class="btn btn-default" role="button">Watchlist</a></p>`;
// 		domStrang +=     `</div>`;
// 		domStrang +=   `</div>`;
// 		domStrang += `</div>`;
// 		if (i % 3 === 2 || i === movieArray.length -1) {
// 			domStrang += `</div>`;
// 		}
// 	}
// 	printToDom(domStrang);
// };

// const printToDom = (strang) => {
// 	$('#movies').append(strang);
// };

// const clearDom = () => {
// 	$('#movies').html('');
// };


},{}],3:[function(require,module,exports){
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
},{"./weather":5}],4:[function(require,module,exports){
"use strict";

let events = require('./events');
let apiKeys = require('./apiKeys');

apiKeys.retrieveKeys();

events.pressEnter();
},{"./apiKeys":1,"./events":3}],5:[function(require,module,exports){
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
},{"./dom":2}]},{},[4]);
