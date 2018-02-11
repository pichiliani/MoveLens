var request = require("request");
var TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
var asyncSeries = require('async-series');
var medusalibs =  require("medusa-libs");
var fs = require("fs");
var _ = require("underscore");
var exec = require('child_process').execSync;



// Makes sure a sequence of asyncronous functions execute sequentially
asyncSeries([
  function(callback){ main(callback) }
], function (err) {
  if (err){
    console.log(err);
  }
});

function main(callback){
  var text_to_speech = new TextToSpeechV1 ({
    username: config.TTSUsername,
    password: config.TTSPassword
  });


  var TJBot = require('tjbot');
  var config = require('./config');

  // obtain our credentials from config.js
  var credentials = config.credentials;

  // these are the hardware capabilities that TJ needs for this recipe
  var hardware = ['microphone', 'speaker'];

  // set up TJBot's configuration
  var configuration = {
    robot: {
      gender: 'female',
      name: 'guru'
    },
    listen: {
      language: 'pt-BR'
    }
  };
  
  // instantiate our TJBot!
  var tj = new TJBot(hardware, configuration, credentials);

  tj.listen(function(msg) {
    
    if(msg.toLowerCase()=="down")
	{
		 var run = exec('sudo python s_desce.py', function (error, stdout, stderr) {
          if (error !== null) {
            console.log('exec error: ' + error);
          }
        }); 
	}
	
	if(msg.toLowerCase()=="up")
	{
		 var run = exec('sudo python s_sobe.py', function (error, stdout, stderr) {
          if (error !== null) {
            console.log('exec error: ' + error);
          }
        }); 
		
	}

  });

}
