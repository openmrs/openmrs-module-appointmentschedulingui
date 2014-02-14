angular.module('providerService', ['providerResource'])
    .factory('ProviderService', function(Provider) {

        return {

            /**
             * Fetches Providers
             *
             * @param searchString a string to search against
             * @returns $promise of array of matching providers (REST default representation by default)
             */
            getProviders: function(searchString) {
                return Provider.query({'q':searchString,
                                       'v': 'default'}).$promise
                    .then(function(res) {
                        return res.results;
                    });

            }

        }

    });