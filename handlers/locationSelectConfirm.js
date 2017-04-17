
const LITERAL = require('../literals/literalpool.json')
const ssml = require('ssml-builder');

function locationSelectConfirm (assistant) {

    let selection = assistant.getArgument(LITERAL.SELECTION_ARGUMENT);
    let ordinal = assistant.getArgument(LITERAL.SELECTION_ORDINAL_ARGUMENT);
    let ssmldoc  = new ssml();

    if (selection === null && ordinal) {
        selection = ordinal;
    }

    console.log('inside location selection cofirm'+ selection);
    
    if (selection > LITERAL.NUM_OF_SUGGESTIONS || selection === null) {
        ssmldoc.say("Sorry!  I am having trouble hearing you. Did you say?")
               .sayAs({
                   "word": selection.toString(),
                   "interpret": "ordinal"
               })
               .pause('300ms')
               .say('Plese say first, second or third');           
        
        let params = {};
        assistant.setContext(LITERAL.SELECT_CHOICE_CONTEXT, 
                             LITERAL.DEFAULT_LIFESPAN, params);
        assistant.ask ( ssmldoc.toObject().speech );
        return;
    }
    
    assistant.data.checkout__station = assistant.data.nearbylocs[selection-1];
    if (assistant.data.checkout__station) {
        ssmldoc.say("Okay, Your rental location is")
            .pause('200ms')
            .say(assistant.data.nearbylocs[selection-1])
        assistant.tell ( ssmldoc.toObject().speech  )
        //set next context here
        return;
    }
}
module.exports = locationSelectConfirm;