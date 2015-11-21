(function(){
  var app = angular.module('runningEventsApp', ['infinite-scroll']);

  // app.config(['$httpProvider', function($httpProvider) {
  //   $httpProvider.defaults.useXDomain = true;
  //   delete $httpProvider.defaults.headers.common['X-Requested-With'];
  // }]);

  app.controller('EventsController', ['$scope', '$http', '$timeout', '$q', function ($scope, $http, $timeout, $q) {

    $scope.eventsList = [];
    $scope.eventsList['eventLocation'] = "";
    $scope.totalDist = 0;
    $scope.numEvents = 0;
    $scope.geocoder = new google.maps.Geocoder();
    $scope.eventsDisplayed = []

    // make http request to api
    // $http.jsonp("https://api-test.mynextrun.com/site/v1/event-stats").then(function(response){
    //   console.log('Success!');
    //   console.log(response);
    // }, function(response){
    //   console.log('Failed!');
    //   console.log(response);
    // });

    // get json data about running events
    var fetchCount = 0;

    // works as expected
    getEventsData('js/api-test.json');
    // getEventsData("http://jsonplaceholder.typicode.com/posts");
    
    // doesn't work presumably because server does not allow cross-origin resource sharing
    // or returns not formated JSON
    // getEventsData("https://api-test.mynextrun.com/site/v1/event-stats");


    $scope.loadMore = function(){
      console.log("loading more");
      var lastIndex = $scope.eventsDisplayed.length - 1;
      if (lastIndex <= $scope.eventsList.length - 1){
        for(var i = 0; i < 1; i++) {
          $scope.eventsDisplayed.push($scope.eventsList[lastIndex + i]);
        }  
      }
    }

    function getEventsData(url){
      $http.get(url).then(function(response){
        // console.log(response);
        $scope.eventsList = response.data.events;
        $scope.totalDist = response.data.distanceCount;
        $scope.numEvents = response.data.eventCount;
        $scope.eventsDisplayed = $scope.eventsList.slice(0, 4);
      }, function(response){
        console.log('Failed to fetch events');
        console.log(response);
        if (fetchCount < 10){
          $timeout(getEventsData(url), 200);
          fetchCount++;
        }
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
        if (eventsLoaded()){
          resolve(true);
        } else {
          reject(false);
        }
      });
    }

  }]);

})();