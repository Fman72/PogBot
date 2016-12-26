//General controller class for the chatbot.

'use strict';

const Discord = require('discord.js');
const client = new Discord.Client();
var pogRetriever = require("./pogRetriever"); 
var urbanDictionaryRetriever = require("./urbanDictionaryRetriever");

const aboutMessage = "I am pog bot. Here are my commands. \n .pogbot help - Shows this message. \n .pogbot pog - Shows some fresh pogs. \n .pogbot define term \/ .pogbot define 'terms terms' - Gets the urban dictionary definition of the term. (Single and double quotes work for mulitiple word terms).";

const commandPrefix = ".pogbot";

//EVENT HANDLERS

//Runs when the chatbot is ready.
client.on('ready', () => {
    console.log('I am ready!');
    var dankPlaysChannel = client.channels.find(textChannel => (textChannel.name === "dank-plays"));
    dankPlaysChannel.sendMessage(aboutMessage);
});

//Lambda that runs when a message is sent.
client.on('message', message => {
  if (message.content.startsWith(commandPrefix)) {
      makeResponse(message, extractWordAtPosition(message, 1));
  }
});

//Makes the chatbot respond to user input.
var makeResponse = function(message, command){
    switch(command){
        case "help":
            message.reply(aboutMessage);
            break;
        case "pog":
            var pogURL = pogRetriever.getRandomPog(function(pogURL) {
                console.log("URL" + pogURL);
                if(pogURL){
                    message.reply(pogURL);
                }
                else{
                    message.reply("Oops! I can't get a pog for you right now.");
                }
            });
            break;
        case "define":
            var messageWords = message.content.split(" ");
            var searchWords;
            if(messageWords[2][0] === "\""){
                console.log("Inside");
                searchWords = message.content.slice(message.content.indexOf("\""));
                console.log(searchWords);
            }
            else if(messageWords[2][0] === "\'"){
                searchWords = message.content.slice(message.content.indexOf("\'"));
            }
            if(!searchWords){
                urbanDictionaryRetriever.getDefinition(extractWordAtPosition(message, 2), (searchString => message.reply(searchString)));
            }
            else{
                searchWords = searchWords.replace(/ /g, "+");
                searchWords = searchWords.replace(/"/g, "");
                searchWords = searchWords.replace(/'/g, "");
                
                urbanDictionaryRetriever.getDefinition(searchWords, (searchString => message.reply(searchString)));
            }
            break;
        default:
            message.reply("I dont understand you " + message.author + ". Type .pogbot help to see what I can do!");
            break;
    }
}

//Extracts the chatbot's command from messages user's send it. 
var extractWordAtPosition = function(message, position){
    var messageWords = message.content.split(' ');
    if(messageWords.length > position){
        return messageWords[position];
    }
}


client.login('Your token here.').then(
function(){
	console.log("Logged in successfully!");
},
function(){
	console.log("You did not enter a valid bot token");
	process.exit(1);
});
