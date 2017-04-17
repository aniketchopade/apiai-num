
'use strict';

process.env.DEBUG = 'actions-on-google:*';
const Assistant = require('actions-on-google').ApiAiAssistant;
//handlers
const findAvisLocation = require('./handlers/findAvisLocation');
const locationSelectConfirm = require('./handlers/locationSelectConfirm');
const findAirport = require('./handlers/findAirport');

//litereals
const LITERAL = require('./literals/literalpool.json');

exports.carBooker = (req, res) => {
  const assistant = new Assistant({request: req, response: res});

  console.log('Request headers: ' + JSON.stringify(req.headers));
  console.log('Request body: ' + JSON.stringify(req.body));

  let actionMap = new Map();

  actionMap.set(LITERAL.FIND_LOCATION_ACTION, findAvisLocation);
  actionMap.set(LITERAL.SELECT_CONFIRM_ACTION, locationSelectConfirm);
  actionMap.set(LITERAL.FIND_AIRPORT_ACTION, findAirport);

  assistant.handleRequest(actionMap);
};

