angular.module('adminApp', []).config(function($interpolateProvider){
    $interpolateProvider.startSymbol('{[').endSymbol(']}');
})

.controller("mainController",function($scope){
	$scope.activeProfil = null;
	$scope.selectedWidgetAvaliable = null;

	$scope.profilSelect = function(id)
	{
		$scope.activeProfil = id;
	}

	$scope.selectWidgetAvaliable = function(id)
	{
		if($scope.selectedWidgetAvaliable != id)
		{
			$scope.selectedWidgetAvaliable = id;
		}
		else
		{
			$scope.selectedWidgetAvaliable = null;
		}
	}

	$scope.setWidget = function(row,cel)
	{
		if($scope.selectedWidgetAvaliable != null)
		{
			$scope.profils[$scope.activeProfil].widgets[row][cel].widget = $scope.widgetsAvaliable[$scope.selectedWidgetAvaliable].id;
			$scope.selectedWidgetAvaliable = null;
		}
	}

	$scope.deleteWidget = function(row,cel)
	{
		$scope.profils[$scope.activeProfil].widgets[row][cel].widget = null;
	}

	$scope.addProfil = function()
	{
		var index = $scope.profils.length;
		$scope.profils.push($scope.protoProfil);
		$scope.activeProfil = index;
	}

	$scope.setDefault = function(id)
	{
		for(var i = 0; i<$scope.profils.length; i++)
		{
			$scope.profils[i].default = false;
		}

		$scope.profils[id].default = true;
	}
});
