'use strict';

(function () {
    var app = angular.module('whosthat', []);

    app.controller('WhosThatController', ['$http', function ($http, $scope) {
        var ctx = this;

        this.pilotNameToSearch = null;
        this.pilot = null;

        this.searchPilot = function () {
            ctx.pilot = null;
            $http.jsonp(CorpManagerServer.rootURL  + '/corp-manager/whosthat/' + ctx.pilotNameToSearch + '?callback=JSON_CALLBACK').success(function (data) {
                ctx.pilot = data;
            });
        };
    }]);
})();