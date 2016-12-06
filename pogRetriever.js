var request = require("request");

var searchLimit = 20;

//Gets a random pog from the overwatch reddit.
var getRandomPog = function(callback){
    //Request API.
   request("https://www.reddit.com/r/Overwatch/search.json?limit=" + searchLimit + "&sort=new&restrict_sr=on&q=flair:PotG", function(error, response, body){
       //If response is allgood.
       if(!error && response.statusCode === 200){
           var responseJSON = JSON.parse(body);
           var random = Math.round((Math.random() * searchLimit));
           callback(responseJSON.data.children[random].data.url);
       }
   }); 
}

var toExport = {};
toExport.getRandomPog = getRandomPog;

module.exports = toExport;

//children -> data[] -> url

