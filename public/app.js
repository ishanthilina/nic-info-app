var app = angular.module('NICApp', [ ]);

app.controller("MainController", [ '$http', '$scope', function($http,$scope){
    $scope.nicNumInput = '';
    $scope.nicData={};


    $scope.getInfo = function() {
		$http.get('/info?id='+$scope.nicNumInput)
			.success(function(data) {
				$scope.nicData=data;
				//format the dates
				$scope.nicData.age=Date.parse($scope.nicData.age);
				//add string values for days
				if($scope.nicData.birthDay ===0) $scope.nicData.birthDay="Sunday";
				if($scope.nicData.birthDay ===1) $scope.nicData.birthDay="Monday";
				if($scope.nicData.birthDay ===2) $scope.nicData.birthDay="Tuesday";
				if($scope.nicData.birthDay ===3) $scope.nicData.birthDay="Wednesday";
				if($scope.nicData.birthDay ===4) $scope.nicData.birthDay="Thursday";
				if($scope.nicData.birthDay ===5) $scope.nicData.birthDay="Friday";
				if($scope.nicData.birthDay ===6) $scope.nicData.birthDay="Saturday";

				//set voting power
				if($scope.nicData.votingPower) {
					$scope.nicData.votingPower="Yes";
				}
				else{
					$scope.nicData.votingPower="No";
				}


				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
				$scope.nicData.error=data;
			});
	};

}]);