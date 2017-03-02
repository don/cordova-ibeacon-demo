var Bleacon = require('bleacon');
var uuid = '11111111-1111-1111-1111-111111111111';
var minor = 1000;
var major = 5;
var measuredPower = -57;
Bleacon.startAdvertising(uuid, major, minor, measuredPower);