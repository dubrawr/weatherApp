angular.module('myApp', ['ngRoute'])
.config(function($httpProvider){
	$httpProvider.defaults.useXDomain = true;
	delete $httpProvider.defaults.headers.common['X-Requested-With'];
})
.controller('mainCtrl', ['$routeParams', '$scope', '$http',
	function($routeParams, $scope, $http){
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
				$scope.test = response.data.sys.sunrise;
			});	
		};


}]);