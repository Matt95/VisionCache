var GoogleVision = require('./Google/googleCloudVision')
var async = require('async');

//returns both raw and mapped results
function getImageLabels(imageURI, callback) {
  var raw = [];
  var mapped = [];

  //query all of the desired API's in parallel
  async.parallel({
      Google: function(callback) {
        GoogleVision.requestImageLabels(imageURI, function (result) {
          if (result) {
            var raw = {source: 'Google', result}
            var mapped = GoogleVision.mapToTags(result)
            callback(null, {raw: raw, mapped: mapped})
          }
        });
      },
      Amazon: function(callback) {
          //implement AWS request here
          callback(null, null)
      },
      Azure: function(callback) {
          //implement Azure request here
          callback(null, null)
      }
  }, function(err, results) {

      //Push all results into a combined collection
      //ToDo: prevent duplicates in mapped copy.
      raw.push(results.Google.raw);
      //raw.push(results.Amazon.raw);
      //raw.push(results.Azure.raw);
      mapped.push(results.Google.mapped);
      //mapped.push(results.Amazon.raw);
      //mappped.push(results.Azure.raw)
      callback({raw: raw, mapped: mapped})

  });

}

module.exports.getImageLabels = getImageLabels;
