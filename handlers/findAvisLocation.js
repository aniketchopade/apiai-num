const httppromise = require('../services/EndPointInquiry');
const ssml = require('ssml-builder');
const LITERAL = require('../literals/literalpool.json');

function findAvisLocation (assistant) {

    let zipcode = assistant.getArgument(LITERAL.ZIP_CODE_ARGUMENT);
    let city = assistant.getArgument(LITERAL.GEO_CITY_ARGUMENT);
    let state = assistant.getArgument(LITERAL.GEO_STATE_ARGUMENT);
    let ssmldoc  = new ssml();

    console.log("********ZIP*****"+ zipcode);
    console.log("********city*****"+ city);
    console.log("********state*****"+ state);

    state = state || ""
    zipcode = zipcode || city + ' ' + state || null;

    console.log(zipcode);
    
    let default_zipcode = "07869";
    zipcode = zipcode || default_zipcode; 
    if (zipcode === "me" )
    {
        zipcode = "07869"      
    }
    let endpoint = `https://www.avis.com/webapi/v1/locations/suggestions/${zipcode}/en_US`;

    httppromise(LITERAL.FIND_LOCATION_ACTION, endpoint)
        .then( 
            function(response)
            {                  
                console.log("I am here");
                ssmldoc.say('Okay, I found locations ..').pause('500ms');
                if (response.length > 0) {                  
                    for (let i=0; i< response.length; i++) {                     
                    ssmldoc.sayAs(
                                {
                                    word: (i+1).toString(),
                                    interpret: "ordinal"
                                })
                            .pause('100ms')
                            .say(response[i])
                            .pause('500ms');
                    }
                    ssmldoc.say('Which one do you want to choose?');
                    assistant.data.nearbylocs = response;
                    assistant.ask(ssmldoc.toObject().speech);
                    
                    return;
                } else {
                    let params = {};
                    assistant.setContext(LITERAL.LOCATION_CONTEXT, 
                                         LITERAL.DEFAULT_LIFESPAN, params);
                    assistant.ask('I did not find any Avis locations');    
                    //and set different context here
                    return;
                }
            }, 
            function(error)
            { 
                console.log('I am in reject area');
                assistant.tell('I did not find any Avis locations');    
            })
        .catch(function(error) 
            {

            } ); 
}
module.exports = findAvisLocation;