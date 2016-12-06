var request = require("request");

var searchLimit = 20;

//Gets a random pog from the overwatch reddit.
var getDefinition = function(term, callback){
    var urbanDictionarySearch = "https://www.urbandictionary.com/define.php?term=" + term;
    callback(urbanDictionarySearch);
}

var toExport = {};
toExport.getDefinition = getDefinition;

module.exports = toExport;

//children -> data[] -> url

