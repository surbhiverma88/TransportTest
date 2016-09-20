/// <reference path="module.js" />

myApp.service("urlService", function (leafletData, $q) {

    this.getStopsByAreaUrl = function () {

        var result = leafletData
            .getMap()
            .then(function (map) {
                var bounds = map.getBounds();
                var utmBoundNE = Wgs2Utm(bounds._northEast.lat, bounds._northEast.lng);
                var utmBoundSW = Wgs2Utm(bounds._southWest.lat, bounds._southWest.lng);

                var url = 'http://reisapi.ruter.no/Place/GetStopsByArea?includeStopPoints=false' +
                    '&xmin=' +
                    utmBoundSW[0] +
                    '&xmax=' +
                    utmBoundNE[0] +
                    '&ymin=' +
                    utmBoundSW[1] +
                    '&ymax=' +
                    utmBoundNE[1];

                return url;
            });

        return result;
    };


    this.getStopsByLineUrl = function (id) {
        var deferred = $q.defer();
        var url = "http://reisapi.ruter.no/Line/GetStopsByLineId/" + id;
        deferred.resolve(url);
        return deferred.promise;
    };


    this.getTimeByStopUrl = function (id) {
        var deferred = $q.defer();
        var url = "http://reisapi.ruter.no/StopVisit/GetDepartures/" + id;
        deferred.resolve(url);
        return deferred.promise;
    };
});
