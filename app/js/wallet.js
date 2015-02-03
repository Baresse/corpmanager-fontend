'use strict';

(function () {
    var app = angular.module('wallet', ['ngAnimate', 'cgBusy']);

    app.controller('WalletController', function ($scope, $http) {

        // Current month used to filter the tax contributions from the wallet division 1
        this.month = new Date(Date.now());

        // Wallet journal entries returned by the server after the Ajax request.
        this.walletJournal = null;


        // Used to retrieve the controller context in the callback of the promise after the Ajax call
        var ctx = this;

        $scope.promise = null;

        //------------------------------------------------------------
        // Fetch all the journal entries
        //------------------------------------------------------------
        this.fetchCorporationWallet = function (date) {
            ctx.walletJournal = null;
            $scope.promise = $http.jsonp(CorpManagerServer.rootURL + '/corp-manager/wallet/journal/' + moment(date).format("YYYY-MM") + '?callback=JSON_CALLBACK').success(function (data) {
                ctx.walletJournal = data;
            });
        };

        //------------------------------------------------------------
        // Sum all the contributions for a given character.
        // Will be display in the aggregation row.
        //------------------------------------------------------------
        $scope.aggFunc = function (row) {
            var total = 0;

            angular.forEach(row.children, function (entry) {
                total += entry.entity.amount;
            });
            return total.toString();
        };

        //------------------------------------------------------------
        // Pluralize the label in the aggregation row
        //------------------------------------------------------------
        $scope.contribMaybePlural = function (row) {
            if (row.children.length > 1) {
                return "contibutions";
            }
            else {
                return "contibution";
            }
        };

        $scope.filterOptions = {
            filterText: 'Type:BOUNTY|BOUNTY_PRIZE|AGENT_MISSION_REWARD|AGENT_MISSION_TIME_BONUS_REWARD|BOUNTY_PRIZES|CORPORATE_REWARD_PAYOUT|CORPORATE_REWARD_TAX',
            useExternalFilter: false
        };

        //------------------------------------------------------------
        // Columns definition for the ng-grid
        //------------------------------------------------------------
        var colDefs = [
            {
                field: 'dateEntry',
                displayName: 'Date',
                headerClass: "gridColHeader",
                cellTemplate: "<div>{{row.entity[col.field] | date :'dd/MM/yyyy HH:mm'}}</div>"
            },
            {field: 'refType', displayName: 'Type', headerClass: "gridColHeader"},
            {field: 'ownerName1', displayName: 'De', headerClass: "gridColHeader"},
            {field: 'ownerName2', displayName: 'A', headerClass: "gridColHeader"},
            {field: 'argName1', displayName: 'Lieu / Victime', headerClass: "gridColHeader"},
            {
                field: 'amount',
                displayName: 'Montant',
                headerClass: "gridColHeader",
                cellClass: "gridColNumber",
                cellTemplate: "<div>{{row.entity[col.field] | number:2 }}</div>"
            }
        ];

        //------------------------------------------------------------
        // Aggregation template customization
        //------------------------------------------------------------
        var aggrTempl = '<div ng-click="row.toggleExpand()" ng-style="rowStyle(row)" class="ngAggregate">' +
            '	<span class="ngAggregateText">{{row.label CUSTOM_FILTERS}} ({{row.totalChildren()}} {{contribMaybePlural(row)}} : {{aggFunc(row) | number:2}} ISK {{AggItemsLabel}})</span>' +
            '	<div class="{{row.aggClass()}}"></div>' +
            '</div>';

        //------------------------------------------------------------
        // Grid options for the ng-grid
        //------------------------------------------------------------
        $scope.gridOptions = {

            // Data being displayed in the grid. Each item in the array is mapped to a row being displayed.
            data: 'ctrl.walletJournal',

            // Definitions of columns as an array [], if not defined columns are auto-generated.
            // See github wiki for more details.
            columnDefs: colDefs,

            // Enable or disable resizing of columns.
            enableColumnResize: true,

            // Enable or disable sorting in grid.
            enableSorting: false,

            // Initial fields to group data by. Array of field names, not displayName.
            groups: ['ownerName2'],

            // Define a sortInfo object to specify a default sorting state.
            //  You can also observe this variable to utilize server-side sorting (see useExternalSorting).
            //  Syntax is sortInfo: { fields: ['fieldName1',' fieldName2'], directions: ['ASC'/'asc' || 'desc'/'DESC'}]*/
            sortInfo: {
                fields: ['ownerName2', 'dateEntry'],
                directions: ['asc', 'asc']
            },

            // Define an aggregate template to customize the rows when grouped. See github wiki for more details.
            aggregateTemplate: aggrTempl,

            // Array of plugin functions to register in ng-grid
            //			plugins: [new ngGridFlexibleHeightPlugin()],

            // filterOptions -
            //	  filterText: The text bound to the built-in search box.
            //	  useExternalFilter: Bypass internal filtering if you want to roll your own filtering mechanism but want to use builtin search box.
            filterOptions: $scope.filterOptions
        };

    });
})();