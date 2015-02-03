'use strict';

(function () {
    var app = angular.module('whosthat', ['ngAnimate', 'cgBusy']);

    app.controller('WhosThatController', function($scope, $http) {
        var ctx = this;

        this.pilotNameToSearch = null;
        this.pilot = null;

        $scope.promise = null;

        this.searchPilot = function () {
            ctx.pilot = null;
            $scope.promise = $http.jsonp(CorpManagerServer.rootURL  + '/corp-manager/whosthat/' + ctx.pilotNameToSearch + '?callback=JSON_CALLBACK').success(function (data) {
                ctx.pilot = data;
            });
        };
    });
})();