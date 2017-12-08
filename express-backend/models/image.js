var restful = require('node-restful');
var moment = require('moment');
var mongoose = restful.mongoose;

//schema for an image entry
var imageSchema = new mongoose.Schema({
  assetID:       {type: String, index: true},
  assetStoreURL: {type: String}, //will be urlencoded
  created:       {type: Date, default: Date.now},
  lastUpdated:   {type: Date, default: Date.now},
  cachedApiResponses: [], //might as well save ALL data we get from the API's
  detectedTags: [mongoose.Schema.Types.Mixed],
  colorPalet:   [mongoose.Schema.Types.Mixed]
})

//methods to be called on an instance
imageSchema.methods.daysSinceUpdate = function() {
  return moment().diff(this.lastUpdated, "days");
}

imageSchema.methods.updateTags = function(tags) {
  this.lastUpdated = Date.now //set last update time
  this.detectedTags = tags;
  this.save(); //probably need to add error handling.
}

//rather than keeping two copies of tags this fucntion will format them on recall
imageSchema.methods.getFormatedTags = function(callback) {
  cachedApiResonses.forEach()
}

//export model, restful allows exposure as a REST API for testing.
var images = module.exports = restful.model('images', imageSchema);

//static methods
module.exports.createEntry = function(newEntry, callback){
  newEntry.save(callback)
}

module.exports.getEntryByAssetStoreId = function(id, callback) {
  images.findOne({assetID: id}).exec(callback);
}
