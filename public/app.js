var app = angular.module('NICApp', [ ]);

app.controller("MainController", [ '$http', '$scope', function($http,$scope){
    $scope.nicNumInput = "";


    $scope.getInfo = function() {
		$http.get('/info?id='+$scope.nicNumInput)
			.success(function(data) {
				$scope.nicData=data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

}]);