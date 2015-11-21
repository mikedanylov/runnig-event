(function(){
  var app = angular.module('runningEventsApp', []);

  app.controller('EventsController', ['$scope', '$http', '$timeout', '$q', function ($scope, $http, $timeout, $q) {

    $scope.eventsList = [];
    $scope.eventsList['eventLocation'] = "";
    $scope.totalDist = 0;
    $scope.numEvents = 0;
    $scope.geocoder = new google.maps.Geocoder();

    // get json data about running events
    getEventsData('js/api-test.json');
    
    // wait until response with events list is received
    asyncWaitEvents().then(function(response){
      console.log('Success: ' + response);
      console.log($scope.eventsList);
      $scope.eventsList.forEach(function(each){
        // $timeout(getEventLocation(each), 110);
        getEventLocation(each);
      });

      // get one location response from google and render it
      // angular.forEach($scope.eventsList, function(each){
      //   console.log(each);  
      // });
      getEventLocation($scope.eventsList[0]);

    }, function(response){
      console.log('Failed: ' + response);
    });

    function getEventsData(url){
      $http.get(url).then(function(response){
      $scope.eventsList = response.data.events;
      $scope.totalDist = response.data.distanceCount;
      $scope.numEvents = response.data.eventCount;
      }, function(response){
        console.log('Failed to fetch events: ' + response);
      });
    }

    function getEventLocation(event){
      var latlng = new google.maps.LatLng(event.latitude, event.longitude);
      $scope.geocoder.geocode({'location': latlng}, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          event['eventLocation'] = results[0]['formatted_address'];
          // console.log(event['eventLocation']);
          // console.log(event);
          $scope.$apply();
        } else {
          console.log('Geocoder failed due to: ' + status);
        }
      });
    }

    function eventsLoaded(){
      return $scope.eventsList.length > 0;
    }

    function asyncWaitEvents() {
      return $q(function(resolve, reject) {
        $timeout(function() {
          if (eventsLoaded()){
            resolve(true);
          } else {
            reject(false);
          }
        }, 100);
      });
    }

  }]);

})();