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

