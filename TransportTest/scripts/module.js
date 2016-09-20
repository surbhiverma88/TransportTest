/// <reference path="angular.min.js" />


var myApp = angular.module("myModule", ['leaflet-directive']);


var mainController = function ($scope, ruterService) {

    angular.extend($scope,
    {
        center: {
            lat: 59.9230764119935,
            lng: 10.759234650887111,
            zoom: 16
        },
        layers: {
            baselayers: {
                googleRoadmap: {
                    name: 'Google Streets',
                    layerType: 'ROADMAP',
                    type: 'google'
                },
                googleHybrid: {
                    name: 'Google Hybrid',
                    layerType: 'HYBRID',
                    type: 'google'
                }
            }
        },
        selectedStop: 0,
        defaults: {
            scrollWheelZoom: false
        },
        isAvailable: function (thing) {
            return (typeof thing === "undefined");
        }
    });




    $scope.$watch('[center.zoom,center.lat]', function () {
        ruterService.getStopsByArea()
            .then(function (markers) {
                $scope.markers = markers;
                $scope.markers[$scope.selectedStop.shortName].icon = {
                    iconUrl: 'styles/images/selected-bus.png',
                    iconSize: [45, 45]
                };
            });
    });

    $scope.$on('leafletDirectiveMarker.click', function (e, args) {
        $scope.center.lat = args.model.lat;
        $scope.center.lng = args.model.lng;
        $scope.selectedStop = args.model;
        delete $scope.selectedLine;

        ruterService.getLinesTimeByStop(args.model.stopId).then(function (lines) {
            $scope.selectedStop.linesData = lines;
        });

        
    });


    $scope.showLineData = function () {
        var id = this.line.ID;
        $scope.selectedLine = this.line;

        //line stops
        ruterService.getStopsByLine(id)
            .then(function (stops) {
                $scope.selectedLine.stops = stops;
            });
    }
}

myApp.controller("mainController", mainController);


function myCallbackFunction(data) {

}


