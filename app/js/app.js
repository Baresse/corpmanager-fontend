'use strict';

(function () {

    var app = angular.module('apiKeyAuditor', ['ngGrid', 'whosthat', 'api-auditor', 'wallet']);

    app.controller('ViewController', function () {
        this.tab = {};

        this.setTab = function (newTab) {
            this.tab = newTab;
        };

        this.isSelectedTab = function (checkTab) {
            return this.tab === checkTab;
        };
    });

    app.directive('auditPanel', function () {
        return {
            restrict: 'E',
            templateUrl: 'partials/audit-panel.html'
        };
    });

    app.directive('whosthatPanel', function () {
        return {
            restrict: 'E',
            templateUrl: 'partials/whosthat-panel.html'
        };
    });

    app.directive('walletPanel', function () {
        return {
            restrict: 'E',
            templateUrl: 'partials/wallet-panel.html'
        };
    });

})();
