"use strict";

let chosenLength = 1;
let weatherArray;
let weatherData = require('./weather');


const runDomString = (forecastCity) => {
	clearDom();
	domString(weatherArray, forecastCity, chosenLength);
};

const domString = (weatherArray, forecastCity, chosenLength) => {
	let domStrang = "";
	console.log("weatherArray", weatherArray);
	// console.log("forecastCity", forecastCity);

		domStrang +=	`<div class="container-fluid">`;

	for (let i=0; i<chosenLength; i++) {

		if (i % 3 === 0) {
			domStrang +=	`<div class="row">`;
		}

		domStrang +=			`<div class="col-sm-4 weather">`;
		domStrang +=				`<div class="thumbnail text-center">`;
		domStrang +=					`<div class="info">`;
		domStrang +=		                `<h3 class="text-center" id="cityName">${forecastCity}</h3>`;
		domStrang +=						`<p class="date">Date: ${new Date(weatherArray[i].dt_txt).toLocaleDateString()}</p>`;
		domStrang +=						`<p class="temperature">Temperature: ${weatherArray[i].main.temp}&deg F</p>`;
		domStrang +=						`<p class="conditions">Conditions: ${weatherArray[i].weather[0].description}</p>`;
		domStrang +=						`<p class="air-pressure">Air pressure: ${weatherArray[i].main.pressure} hpa</p>`;
		domStrang +=						`<p class="wind-speed">Wind speed: ${weatherArray[i].wind.speed} m/s</p>`;
		domStrang +=						`<p><a class="btn btn-success save-weather" role="button">Save Weather</a></p>`;
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
  		    <div>
				<div class="btn-group col-xs-offset-4" role="group" id="days">
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


const setWeatherArray = (weather, forecastCity) => {
	 weatherArray = weather;
	 runDomString(forecastCity);
};

const showChosenNumberOfDays = (numberOfDays) => {
	chosenLength = numberOfDays;
	let savedCity = weatherData.getCity();
	console.log("cityName", savedCity);
	// runDomString(cityName);
};


const clearDom = () => {
	$("#output").empty();
};

const printError = () => {
	clearDom();
	let userError = "";
		userError += `<div class="row">`;
		userError += `<div class="alert text-center col-xs-6 col-xs-offset-3" role="alert"><strong>I only accept valid 5 digit US zip codes</strong></div>`;
		userError += `</div>`;
	$("#output").append(userError);
};




module.exports = {setWeatherArray, clearDom, showChosenNumberOfDays, printError};





