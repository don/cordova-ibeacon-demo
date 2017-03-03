/* global cordova, regionDiv, rangeDiv, ble, Uint8Array */
var SERVICE_UUID = 'ccc0';
var COLOR_CHARACTERISTIC_UUID = 'ccc1';

var app = {
  initialize: function () {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },
  onDeviceReady: function () {
    this.rangeBeacon();
  },
  rangeBeacon: function () {

    var uuid = '12345678-aaaa-bbbb-cccc-123456789abc';
    var identifier = 'ibeacon';
    var major = 1;
    var minor = 10;
    var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);

    var delegate = new cordova.plugins.locationManager.Delegate();

    delegate.didEnterRegion = function (/*pluginResult*/) {
      regionDiv.innerText = 'Inside Region';
      cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion)
        .fail(function (e) { console.error(e); })
        .done();
      app.connectToLamp();
    };

    delegate.didExitRegion = function (/*pluginResult*/) {
      regionDiv.innerText = 'Outside Region';
      cordova.plugins.locationManager.stopRangingBeaconsInRegion(beaconRegion)
        .fail(function (e) { console.error(e); })
        .done();
      app.disconnect();
    };

    delegate.didRangeBeaconsInRegion = function (pluginResult) {
      if (pluginResult.beacons.length > 0) {
        var proximity = pluginResult.beacons[0].proximity;
        app.updateColor(proximity);
        rangeDiv.innerText = proximity.replace('Proximity', 'Proximity: ');
      } else {
        rangeDiv.innerText = '';
      }
    };

    cordova.plugins.locationManager.setDelegate(delegate);
    cordova.plugins.locationManager.requestAlwaysAuthorization();

    cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion)
      .fail(function (e) { console.error(e); })
      .done();

  },
  connectToLamp: function () {
    ble.startScan([SERVICE_UUID], function(device){
      console.log('Discovered', device.id);
      // stop scan and connect to first device discovered
      ble.stopScan(function(){
        console.log('Connecting to', device.id);
        ble.connect(device.id, function(peripheral) {
          console.log('Connected to', peripheral.id);
          app.peripheral = peripheral;
        });
      });
    });
  },
  disconnect: function() {
    if (app.peripheral) {
      app.peripheral.disconnect();
    }
  },
  updateColor: function (proximity) {
    var color;
    switch (proximity) {
    case 'ProximityImmediate':
      color = new Uint8Array([0xff,0x00, 0x00]); // Red
      break;
    case 'ProximityNear':
      color = new Uint8Array([0x00, 0x00, 0xff]); // Blue
      break;
    case 'ProximityFar':
      color = new Uint8Array([0x00, 0xff, 0x00]); // Green
      break;
    case 'ProximityUnknown':
      color = new Uint8Array([0x00, 0x00, 0x00]); // Black/Off
      break;
    default:
      console.log(proximity);
    }
    ble.write(app.peripheral.id, SERVICE_UUID, COLOR_CHARACTERISTIC_UUID, color.buffer);
  }
};

app.initialize();