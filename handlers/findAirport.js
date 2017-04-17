const ssml = require('ssml-builder');
const LITERAL = require('../literals/literalpool.json');
const findAvisLocation = require('./findAvisLocation');

function findAirport(assistant) {
    let request = {};
        request.airport = assistant.getArgument(LITERAL.US_AIRPORT_ARGUMENT);
        //request.city = assistant.getArgument(LITERAL.GEO_CITY_ARGUMENT);
        request.check_out_date = assistant.getArgument(LITERAL.CHECK_OUT_DATE_ARGUMENT);
        request.rental_period = assistant.getArgument(LITERAL.RENTAL_PERIOD_ARGUMENT);
        request.location_type = assistant.getArgument(LITERAL.LOCATION_TYPE_ARGUMENT);

        let ssmldoc  = new ssml();
    
        console.log("***airport name***" + request.airport );

        if (request.airport.IATA)
        {         
            ssmldoc.say('Okay, I understand you want to book at Airport')
                    .pause('200ms')
                    .sayAs({
                        "word": request.airport.IATA,
                        "interpret": "acronym"
                     })
                     //ask is this correct ?
            assistant.tell(ssmldoc.toObject().speech);
        }
        else if(request.airport) {
             let params = {};
             console.log("fallback to airport name becasue no IATA avaialable");
             assistant.body_.result.parameters["geo-city"]=request.airport;
             findAvisLocation(assistant);
             console.log('I spoke earlier..');
             if (assistant.data.nearbylocs)
             {
                 console.log('setting context now..');
                 assistant.setContext(LITERAL.SELECT_CHOICE_CONTEXT, 
                          LITERAL.DEFAULT_LIFESPAN, params);
             }
        }
}

module.exports = findAirport;

