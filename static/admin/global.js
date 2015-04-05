angular.module('adminApp', []).config(function($interpolateProvider){
    $interpolateProvider.startSymbol('{[').endSymbol(']}');
})

.controller("mainController",function($scope){
	$scope.socket = new io();
	$scope.activeProfil = null;
	$scope.selectedWidgetAvaliable = null;
	$scope.send = false;

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

	$scope.sendChanges = function()
	{
		$scope.socket.emit("refreshProfils",$scope.profils);
		$scope.send = true;
		$scope.activeProfil = null;
	}

	$scope.isBackAppDisabled = function(value,index)
	{		
		for(var i = 0; i<$scope.profils[$scope.activeProfil].backApps.length; i++)
		{
			if($scope.profils[$scope.activeProfil].backApps[i] == value.id)
			{
				return false;
			}
		}

		return true;
	}

	$scope.addBackApp = function(backAppId)
	{
		$scope.profils[$scope.activeProfil].backApps.push(backAppId);
	}


	$scope.removeBackApp = function(backAppId)
	{
		var index = $scope.profils[$scope.activeProfil].backApps.indexOf(backAppId);
		$scope.profils[$scope.activeProfil].backApps.splice(index,1);
	}

});
