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
				var weather = response.data;
				$scope.temp = weather.main.temp;
				$scope.lowTemp = weather.main.temp_min;
				$scope.highTemp = weather.main.temp_max;
				$scope.result = true;
				$scope.city = weather.name + ", " + weather.sys.country;

				//sweater weather checker
				if ($scope.temp <= 40){
					$scope.sweater = "You'd be crazy not to.";
				} else if ($scope.temp <= 59){
					$scope.sweater = "Bring two.";
				} else if ($scope.temp <= 64){
					$scope.sweater = "It's officially sweater weather.";
				} else if ($scope.temp <= 68){
					$scope.sweater = "Pick the nice black one you love so much.";
				} else if ($scope.temp <= 73){
					$scope.sweater = "Do it for fashion.";
				} else if ($scope.temp <= 80){
					$scope.sweater = "If you do, promise you'll wear deodorant.";
				} else if ($scope.temp <= 90){
					$scope.sweater = "Please don't.";
				} else {
					$scope.sweater = "Only if you hate yourself";
				}

				//wind checker
				var windResult = weather.wind.speed;
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

				//daytime checker
				var time = new Date().getTime().toString();
				var currentTime = Number(time.slice(0,-3));
				var sunrise = weather.sys.sunrise;
				var sunset = weather.sys.sunset;
				//if false, then it's night time. if true, then it's daytime
				$scope.daytime = moment(currentTime).isBetween(sunrise, sunset);
				console.log($scope.daytime);
				

				//if windResult > someNumber, then $scope.wind will say breezy, windy, etc
				//if currentTime is before or after sunset, change background night or day
				//background changes if cloudy, rainy, or clear.
				//clouds all is percentage of clouds

			});
			
			
		};

var backGrounds = {
	dayfog: "./app/images/dayFog.jpg",
	nightFog: "./app/images/nightFog.jpg",
	dayCloudy: "./app/images/dayCloudy.jpg",
	nightCloudy: "./app/images/nightCloudy.jpg",
	dayClear: "./app/images/dayClear.jpg",
	nightClear: "./app/images/nightClear.jpg",
	dayRain: "./app/images/dayRain.jpg",
	nightRain: "./app/images/nightRain.jpg",
	daySnow: "./app/images/daySnow.jpg",
	nightSnow: "./app/images/nightSnow.jpg"
};


}]);