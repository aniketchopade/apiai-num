
'use strict';

process.env.DEBUG = 'actions-on-google:*';
const Assistant = require('actions-on-google').ApiAiAssistant;

const ADDNUM_ACTION = 'add_numbers';
const NUMBER_ARGUMENT = 'number';
const NUMBER1_ARGUMENT = 'number1';


exports.addNumbers = (req, res) => {
  const assistant = new Assistant({request: req, response: res});
  console.log('Request headers: ' + JSON.stringify(req.headers));
  console.log('Request body: ' + JSON.stringify(req.body));

  function makeName (assistant) {
    let number = assistant.getArgument(NUMBER_ARGUMENT);
    let number1 = assistant.getArgument(NUMBER1_ARGUMENT);
    let sum = parseInt(number) + parseInt(number1);
    assistant.tell('Addition result is ' + sum +
      '! I hope it is correct. See you next time.');
  }

  let actionMap = new Map();
  actionMap.set(ADDNUM_ACTION, makeName);

  assistant.handleRequest(actionMap);
};

