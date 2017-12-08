var express = require('express')
var config = require('../configs/config');
var moment = require('moment');
var throttle = require('express-throttle');

//var vision = require('../visionAPIs/Google/googleCloudVision')

var Images = require('../models/image')
var visionRequestManager = require('../VisionAPIs/visionRequestManager')

router = express.Router()

//returns detected tags from cache or directly based on URI
router.get('/tags/:uri', throttle(config.throttleOptions), function(req, res) {

  //get the ID from asset store URL
  var id = extractId(req.params.uri)

  //check if already in db and return tags if found
  Images.getEntryByAssetStoreId(id, function(err, entry) {

    //error check first
    if (err) {
      console.log(err)
      res.sendstaus(500)
    }

    //check for cached response
    if (entry) {

      //check if cached response is in date
      if (entry.daysSinceUpdate() > config.daysToCache) {
        //cached response is out off date - update before sending
        visionRequestManager.getImageLabels(req.params.uri, function(result) {
          entry.cachedApiResonses = result.raw
          entry.detectedTags = result.mapped
          entry.save();
        })
      } else {
        //cached response is good - send
        res.send(entry.detectedTags)
      }
    } else {
      visionRequestManager.getImageLabels(req.params.uri, function(result) {
        var newEntry = new Images({
          assetID: id,
          assetURL: req.params.uri,
          cachedApiResponses: result.raw,
          detectedTags: result.mapped
        })
        Images.createEntry(newEntry)
        res.send(newEntry.detectedTags);
      })
    }
  })


});

router.get('/pallet/uri', throttle(config.throttleOptions), function(req, res) {

  //get the ID from asset store URL
  var id = extractId(req.params.uri)




})
///helper to extract the asset store ID from the image URI
var extractId = function(ImageURI) {
  var segments = ImageURI.split('/');
  return segments[segments.length-2];
}


module.exports = router;
