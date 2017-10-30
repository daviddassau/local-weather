"use strict";

let events = require("./events");
let apiKeys = require("./apiKeys");

apiKeys.retrieveKeys();
events.googleAuth();
events.savedWeatherEvents();
events.pressEnter();
events.pressSearch();
events.myLinks();