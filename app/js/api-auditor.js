'use strict';

(function () {
    var app = angular.module('api-auditor', []);

    app.controller('ApiAuditorController', ['$http', function ($http, $scope) {
        var ctx = this;

        this.apiKey = [];
        this.audit = null;

        this.auditAPI = function () {
            ctx.audit = null;
            $http.jsonp(CorpManagerServer.rootURL  + '/corp-manager/audit/' + ctx.apiKey.keyId + '/' + ctx.apiKey.vCode + '?callback=JSON_CALLBACK').success(function (data) {
                ctx.audit = data;
            });
        };

        this.getOriginTitle = function (origin) {
            if (origin === "WALLET") {
                return 'Transfert ISK (Wallet)';
            }
            if (origin === "MAIL") {
                return 'Echange mails';
            }
            if (origin === "ACCOUNT") {
                return 'Personnage API';
            }
            if (origin === "BLUE_CONTACT") {
                return 'Contact Bleu';
            }
            if (origin === "CONTRACT") {
                return 'Transactions (Contract ou Trade)';
            }
        };

        this.getOriginImg = function (origin) {
            if (origin === "WALLET") {
                return 'img/wallet.png';
            }
            if (origin === "MAIL") {
                return 'img/mail.png';
            }
            if (origin === "ACCOUNT") {
                return 'img/account.png';
            }
            if (origin === "BLUE_CONTACT") {
                return 'img/contact.png';
            }
            if (origin === "CONTRACT") {
                return 'img/contract.png';
            }
        };

    }]);
})();