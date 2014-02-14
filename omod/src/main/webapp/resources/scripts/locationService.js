angular.module('locationService', ['locationResource'])
    .factory('LocationService', function(Location) {

        return {

            /**
             * Fetches Locations
             *
             * @param searchString a string to search against
             * @returns $promise of array of matching Location (REST ref representation by default)
             */
            getLocations: function(searchString) {
                return Location.query({'q':searchString}).$promise
                    .then(function(res) {
                        return res.results;
                    });

            }

        }

    });