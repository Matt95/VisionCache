var Google_Vision = require('@google-cloud/vision');
var mapping = require('./mapping');
//start a vision client, the project ID and keyfile are
//from the google cloud console
var visionClient = Google_Vision({
  projectId: 'yourprojectid',
  keyFilename: './visionAPIs/Google/keyfile.json'
});


var requestImageLabels = function(imageURI, callback) {

  //format for API request
  var image = {
    source: {imageUri: imageURI}
  };

  console.log("Requesting Google labels for image:", imageURI)
  visionClient.labelDetection(image).then(response => {
    console.log("Recived Labels for image:", imageURI)
    callback(response[0]);
  }).catch(err => {
    //API error
    //ToDo: Improve handling of error, retry?
    console.log(err);
    console.log("Error getting labels for image:", imageURI);
    callback(null);
  });

}

module.exports.requestImageLabels = requestImageLabels
module.exports.mapToTags = mapping
