/// <reference path="module.js" />


myApp.service("ruterService", function (urlService, dataService) {

    this.getStopsByArea = function () {
        var markersData = urlService.getStopsByAreaUrl()
            .then(function (url) {
                var data = dataService.getData(url)
                    .then(function (d) {
                        var markers = {};
                        angular.forEach(d,
                            function (value) {
                                var coord = Utm2Wgs(value.X, value.Y, 32, 'N');
                                markers[value.ShortName] = {
                                    lat: coord[0],
                                    lng: coord[1],
                                    draggable: false,
                                    icon: {
                                        iconUrl: 'styles/images/icon-bus.png',
                                        iconSize: [25, 25]
                                    },
                                    lines: value.Lines,
                                    name: value.Name,
                                    title: value.Name,
                                    stopId: value.ID,
                                    shortName: value.ShortName
                                };
                            });
                        return markers;
                    });
                return data;
            });
        // Return the promise to the controller
        return markersData;
    };


    this.getStopsByLine = function (id) {
        var stopsData = urlService.getStopsByLineUrl(id)
            .then(function (url) {
                var data = dataService.getData(url)
                    .then(function (d) {
                        var stops = {};
                        angular.forEach(d,
                            function (value) {
                                var coord = Utm2Wgs(value.X, value.Y, 32, 'N');
                                stops[value.ShortName] = {
                                    lat: coord[0],
                                    lng: coord[1],
                                    name: value.Name
                                };
                            });
                        return stops;
                    });
                return data;
            });
        // Return the promise to the controller
        return stopsData;
    };


    this.getLinesTimeByStop = function (id) {
        var stopsData = urlService.getTimeByStopUrl(id)
           .then(function (url) {
               var data = dataService.getData(url)
                   .then(function (d) {
                       var linesTime = {};
                       var linesDest = {};
                       angular.forEach(d,
                           function (value) {

                               if (linesTime[value.MonitoredVehicleJourney.LineRef] == undefined) {
                                   linesTime[value.MonitoredVehicleJourney
                                       .LineRef] = [value.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime];
                               } else {
                                   linesTime[value.MonitoredVehicleJourney.LineRef].push(value.MonitoredVehicleJourney.MonitoredCall.AimedArrivalTime);
                               }

                               if (linesDest[value.MonitoredVehicleJourney.LineRef] == undefined) {
                                   linesDest[value.MonitoredVehicleJourney
                                       .LineRef] = value.MonitoredVehicleJourney.DestinationName;
                               }
                           });
                       var result = {
                           linesTime: linesTime,
                           linesDest: linesDest
                       }

                       return result;
                       
                   });
               return data;
           });
        // Return the promise to the controller
        return stopsData;
    }

});
