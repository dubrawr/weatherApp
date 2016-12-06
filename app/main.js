angular.module('myApp', ['ngRoute'])
.config(function($httpProvider){
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
})
.controller('mainCtrl', ['$routeParams', '$scope', '$http',
	function($routeParams, $scope, $http){
		$scope.result = false;
		console.log('hello world');

		$scope.getWeather = function(){
			var url = "http://api.openweathermap.org/data/2.5/weather";
			var params = {
				q: $scope.cityName,
				APPID: "c11d624d498c7bc902eff125d571c3b8",
				units: "imperial"
			};
			$http({
				method: 'GET',
				url: url,
				params: params
			}).then(function(response){
				console.log(response.data);
				$scope.currentTemp = response.data.main.temp;
				$scope.lowTemp = response.data.main.temp_min;
				$scope.highTemp = response.data.main.temp_max;
				$scope.result = true;
				$scope.city = response.data.name + ", " + response.data.sys.country;
				
				var windResult = response.data.wind.speed;
				if (windResult <= 3){
					$scope.wind = "Calm";
				} else if (windResult <=10){
					$scope.wind = "Easy Breezy";
				} else if (windResult<=21){
					$scope.wind = "Windy";
				} else if (windResult <= 27){
					$scope.wind = "You Should Hold on to Something";
				} else {
					$scope.wind = "Don't go outside.";
				}


				//if windResult > someNumber, then $scope.wind will say breezy, windy, etc
				//if currentTime is before or after sunset, change background night or day
				//background changes if cloudy, rainy, or clear.
				//clouds all is percentage of clouds

			});	
		};


}]);

// use this to understand wind speed later on
// https://www.windfinder.com/wind/windspeed.htm