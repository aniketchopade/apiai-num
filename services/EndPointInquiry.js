const rp = require('request-promise');
const LITERAL = require('../literals/literalpool.json');


function EndPointInquiry(service, endpoint, options) {
    const END_POINT = endpoint;
    let default_options = {
        method: 'GET',
        uri: END_POINT,
        json: true,
        headers: {
            'content-type': 'plain/text',
        }
    };
    options = options || default_options;

    const promise = new Promise((resolve, reject) => {
        console.log("Creating promise");
        rp(options)
        .then((response) => {
            switch(service) {
            case LITERAL.FIND_LOCATION_ACTION:
                if (response.suggestions.length>0) { 
                    const locations = response.suggestions;
                    const loc_len = response.suggestions.length > 
                                    LITERAL.NUM_OF_SUGGESTIONS ? LITERAL.NUM_OF_SUGGESTIONS : 
                                    response.suggestions.length;
                    const suggestions = [];
                    for (let i=0; i<loc_len; i++){
                    if (locations[i].suggDescription){
                        suggestions.push(locations[i].suggDescription);
                    }
                }
                resolve(suggestions);                  
                }else {
                    reject("No locations found");
                }   
            break;
            default:
        }
        }, (err) => {
            console.log("Error in location inquiry");
            reject("Some uknown error occured");
        });
    })
    console.log("Returning promise");
    return promise;
}
module.exports = EndPointInquiry;