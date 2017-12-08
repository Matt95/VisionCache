var config = {}

//config
config.daysToCache = 100 //number of days before cached tags are updated.

//throttle limits
//default throttle is based on IP (not botnet safe)
//however this throttle is intended to limit the cost of any dev mistakes.
//a hard limit should be set on each API's console anyway but this is in total for all users not per IP.
//can be extended to include a cost function that would selectively throttle requests that require
//going out to the API's
//NOTE: Memory based - Will reset when process restarts!
config.throttleOptions = {
  "burst": 100,
  "rate": '1000/day'
}

module.exports = config;
