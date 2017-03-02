var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        this.receivedEvent('deviceready');
        this.rangeBeacon();
    },

    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },

    monitorBeacon: function () {
        var logToDom = function (message) {
            var e = document.createElement('label');
            e.innerText = message;

            var br = document.createElement('br');
            var br2 = document.createElement('br');
            document.body.appendChild(e);
            document.body.appendChild(br);
            document.body.appendChild(br2);

            window.scrollTo(0, window.document.height);
        };

        var delegate = new cordova.plugins.locationManager.Delegate();

        delegate.didDetermineStateForRegion = function (pluginResult) {

            logToDom('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));

            cordova.plugins.locationManager.appendToDeviceLog('[DOM] didDetermineStateForRegion: '
                + JSON.stringify(pluginResult));
        };

        delegate.didStartMonitoringForRegion = function (pluginResult) {
            console.log('didStartMonitoringForRegion:', pluginResult);

            logToDom('didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
        };

        delegate.didRangeBeaconsInRegion = function (pluginResult) {
            logToDom('[DOM] didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
        };


        var uuid = '11111111-1111-1111-1111-111111111111';
        var identifier = 'ibeacon';
        var minor = 1000;
        var major = 5;
        var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);

        cordova.plugins.locationManager.setDelegate(delegate);

        // required in iOS 8+
        //cordova.plugins.locationManager.requestWhenInUseAuthorization();
        cordova.plugins.locationManager.requestAlwaysAuthorization();

        cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion)
            .fail(function (e) { console.error(e); })
            .done();
    },
    rangeBeacon: function () {
        var logToDom = function (message) {
            var e = document.createElement('label');
            e.innerText = message;

            var br = document.createElement('br');
            var br2 = document.createElement('br');
            document.body.appendChild(e);
            document.body.appendChild(br);
            document.body.appendChild(br2);

            window.scrollTo(0, window.document.height);
        };

        var delegate = new cordova.plugins.locationManager.Delegate();

        delegate.didDetermineStateForRegion = function (pluginResult) {

            logToDom('[DOM] didDetermineStateForRegion: ' + JSON.stringify(pluginResult));

            cordova.plugins.locationManager.appendToDeviceLog('[DOM] didDetermineStateForRegion: '
                + JSON.stringify(pluginResult));
        };

        delegate.didStartMonitoringForRegion = function (pluginResult) {
            console.log('didStartMonitoringForRegion:', pluginResult);

            logToDom('didStartMonitoringForRegion:' + JSON.stringify(pluginResult));
        };

        delegate.didRangeBeaconsInRegion = function (pluginResult) {
            logToDom('[DOM] didRangeBeaconsInRegion: ' + JSON.stringify(pluginResult));
        };

        var uuid = '11111111-1111-1111-1111-111111111111';
        var identifier = 'ibeacon';
        var minor = 1000;
        var major = 5;
        var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid, major, minor);

        cordova.plugins.locationManager.setDelegate(delegate);

        // required in iOS 8+
        // cordova.plugins.locationManager.requestWhenInUseAuthorization();
        cordova.plugins.locationManager.requestAlwaysAuthorization();

        cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion)
            .fail(function (e) { console.error(e); })
            .done();
    }
};

app.initialize();