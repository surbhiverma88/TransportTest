/// <reference path="module.js" />


myApp.service("dataService", function ($http) {

    this.getData = function (url) {

        var promise = $http(
            {
                method: 'jsonp',
                url: url,
                params: {
                    format: 'jsonp',
                    callback: 'JSON_CALLBACK'
                }
            }).then(function (response) {
                return response.data;
            });

        return promise;
    }

});
