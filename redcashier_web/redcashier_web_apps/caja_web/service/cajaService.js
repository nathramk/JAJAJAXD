app

    .factory("cajaService", function($resource, configCaja) {
    var url = configCaja.cajaUrl;
    return {

        Usercashier: $resource(url + "usercashiers/:id/", { 'id': '@id' }, {
            "update": { method: 'PUT' },

            "query": {
                method: 'GET',
                isArray: false,
                transformResponse: function(r) {
                    var results = [];
                    var options = {};
                    results = angular.fromJson(r).results ? angular.fromJson(r).results : angular.fromJson(r);
                    options = angular.fromJson(r).options ? angular.fromJson(r).options : {
                        "count": 1,
                        "pages": 1,
                        "page": 1,
                        "range": "all",
                        "previous": null,
                        "page_size": 1,
                        "next": null
                    };
                    return { results: results, options: options };
                }
            }

        }),


    };
});
