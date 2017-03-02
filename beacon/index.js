var Bleacon = require('bleacon');
var uuid = '12345678-aaaa-bbbb-cccc-123456789abc';
var major = 1;
var minor = 10;
var measuredPower = -57;
Bleacon.startAdvertising(uuid, major, minor, measuredPower);