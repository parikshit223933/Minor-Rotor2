const appliance = require('./appliance');

module.exports={
  [appliance.FAN]:['isTurnedOn', 'speed'],
  [appliance.BULB]:['isTurnedOn', 'intensity']
}