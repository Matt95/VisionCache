//defines a mapping between googles format and our standard format
var mapping = function(apiResponse) {
  var tags = apiResponse.labelAnnotations.map(item => ({
    tag: item.description,
    confidence: item.score,
    source: 'Google'
  }))
  return tags;
}

module.exports = mapping;
