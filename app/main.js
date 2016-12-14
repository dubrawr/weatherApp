angular.module('myApp', ['ngRoute', 'ngAnimate'])
.config(function($httpProvider){
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
})
.controller('mainCtrl', ['$routeParams', '$scope', '$http',
	function($routeParams, $scope, $http){

		var url = "https://shrouded-sea-10419.herokuapp.com/weather";
		var x = confirm("Share your location?");
		if (x){
	navigator.geolocation.getCurrentPosition(function(position) {
		
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;
		console.log(latitude+' '+ longitude);
		$scope.getLocation = function(){
			var params = {
				lon: longitude,
				lat: latitude,
				APPID: "c11d624d498c7bc902eff125d571c3b8",
				units: "imperial"
			};
			$http({
				method: 'GET',
				url: url,
				params: params
			}).then(function(response){
				console.log(response.data);
				$scope.workIt(response);
			});
		};
		$scope.getLocation();
	});
}

		$scope.getWeather = function(){
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
				$scope.workIt(response);
			});
			
			
		};


	$scope.workIt = function(response){
				var weather = response.data;
				var weatherConditions = weather.weather;
				$scope.temp = weather.main.temp;
				$scope.lowTemp = weather.main.temp_min;
				$scope.highTemp = weather.main.temp_max;
				$scope.result = true;
				$scope.city = weather.name + ", " + weather.sys.country;
				$scope.cityName = '';
				$scope.degree = 'F';

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
				} else if ($scope.temp <= 75){
					$scope.sweater = "You won't need it...but you can still wear it.";
				} else if ($scope.temp <= 80){
					$scope.sweater = "It's not recommended, but bring it because you love it.";
				} else if ($scope.temp <= 90){
					$scope.sweater = "If you do, promise me you'll wear deodorant.";
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
				var daytime = moment(currentTime).isBetween(sunrise, sunset);
				console.log(daytime);
				
				// var clouds = weatherConditions.filter(function(object){
				// 	return object.main == 'Clouds';
				// });
				// console.log(clouds[0]);

				var conditions = [];
				for (i=0; i<weatherConditions.length; i++){
					conditions.push(weatherConditions[i].main);
				}
				console.log (conditions);

				$scope.details = conditions.join(', ');
				console.log($scope.details);
				
				//background changes if cloudy, rainy, or clear.
				//clouds all is percentage of clouds
				if(daytime){
					$scope.color = 'black';
					$scope.shadow = '1px 1px 5px white';
					if(conditions.indexOf('Snow') > -1){
						$scope.backgroundUrl = backgrounds.daySnow;
					} else if (conditions.indexOf('Rain') > -1){
						$scope.backgroundUrl = backgrounds.dayRain;
					} else if (conditions.indexOf('Fog') > -1){
						$scope.backgroundUrl = backgrounds.dayFog;
					} else if (conditions.indexOf('Clouds') > -1){
						$scope.backgroundUrl = backgrounds.dayCloudy;
					} else {
						$scope.backgroundUrl = backgrounds.dayClear;
					}
				} else if (!daytime){
					$scope.color = 'white';
					$scope.shadow = '2px 2px black';
					if(conditions.indexOf('Snow') > -1){
						$scope.backgroundUrl = backgrounds.nightSnow;
					} else if (conditions.indexOf('Rain') > -1){
						$scope.backgroundUrl = backgrounds.nightRain;
					} else if (conditions.indexOf('Fog') > -1){
						$scope.backgroundUrl = backgrounds.nightFog;
					} else if (conditions.indexOf('Clouds') > -1){
						$scope.backgroundUrl = backgrounds.nightCloudy;
					} else {
						$scope.backgroundUrl = backgrounds.nightClear;
					}
				}
				$scope.style = {
					'color': $scope.color,
					'background-image': 'url('+$scope.backgroundUrl+')',
					'text-shadow': $scope.shadow
				};

	};

var backgrounds = {
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

$(".toggle").on("click", function(){
    if($(this).text()=="Show me the weather.")
    {
        $(this).text("Okay, I believe you.");
    } else {
        $(this).text("Show me the weather.");
    }        
    return false;
});


$scope.convertC = function(){
	if ($scope.degree === 'C'){
		console.log('already C');
	} else {
	$scope.temp = toCelsius($scope.temp);
	$scope.degree = 'C';
	}
};

$scope.convertF = function(){
	if ($scope.degree === 'F'){
		console.log('already F');
	} else {
	$scope.temp = toFahrenheit($scope.temp);
	$scope.degree = 'F';
	}
};

var toCelsius = function(x){
	return (5/9)*(x - 32);
};

var toFahrenheit = function(x){
	return x * 9 / 5 + 32;
};

}]);

