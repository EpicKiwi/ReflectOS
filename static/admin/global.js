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
	}

	$scope.isWidgetDisabled = function(value,index)
	{		
		if($scope.activeProfil != null)
		{
			for(var i = 0; i<$scope.profils[$scope.activeProfil].widgets.length; i++)
			{
				for(var j = 0; j<$scope.profils[$scope.activeProfil].widgets[i].length; j++)
				{
					if($scope.profils[$scope.activeProfil].widgets[i][j].widget != null && $scope.profils[$scope.activeProfil].widgets[i][j].widget == value.id)
					{
						return false;
					}
				}
			}

			return true;
		}
	}

	$scope.isBackAppDisabled = function(value,index)
	{		
		if($scope.activeProfil != null)
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

	$scope.getBackAppInfos = function(backAppId)
	{
		for(var i = 0; i<$scope.backAppsAvaliable.length; i++)
		{
			if($scope.backAppsAvaliable[i].id == backAppId)
			{
				return $scope.backAppsAvaliable[i];
			}
		}
	}

	$scope.getWidgetInfos = function(widgetId)
	{
		for(var i = 0; i<$scope.widgetsAvaliable.length; i++)
		{
			if($scope.widgetsAvaliable[i].id == widgetId)
			{
				return $scope.widgetsAvaliable[i];
			}
		}
	}

	$scope.resizeLeft = function(row,cel)
	{
		if($scope.activeProfil != null)
		{
			$scope.profils[$scope.activeProfil].widgets[row][cel].width += 1;
			if($scope.profils[$scope.activeProfil].widgets[row][cel-1].width > 1)
			{
				$scope.profils[$scope.activeProfil].widgets[row][cel-1].width -= 1;
			}
			else
			{
				$scope.profils[$scope.activeProfil].widgets[row].splice(cel-1,1);
			}
		}
	}

	$scope.resizeRight = function(row,cel)
	{
		if($scope.activeProfil != null)
		{
			$scope.profils[$scope.activeProfil].widgets[row][cel].width += 1;
			if($scope.profils[$scope.activeProfil].widgets[row][cel+1].width > 1)
			{
				$scope.profils[$scope.activeProfil].widgets[row][cel+1].width -= 1;
			}
			else
			{
				$scope.profils[$scope.activeProfil].widgets[row].splice(cel+1,1);
			}
		}
	}

	$scope.addRight = function(row,cel)
	{
		if($scope.activeProfil != null)
		{
			$scope.profils[$scope.activeProfil].widgets[row].push({width: 1, widget: null});
			$scope.profils[$scope.activeProfil].widgets[row][cel].width -= 1;
		}
	}

	$scope.addLeft = function(row,cel)
	{
		if($scope.activeProfil != null)
		{
			$scope.profils[$scope.activeProfil].widgets[row].unshift({width: 1, widget: null});
			$scope.profils[$scope.activeProfil].widgets[row][cel+1].width -= 1;
		}
	}


})
.controller("BackAppController",function($scope){
	$scope.configureTabOpen = false;

	$scope.configure = function()
	{
		console.log($scope.backApp);
		$scope.socket.emit("configureBackApp",{id: $scope.backApp.id,parameters: $scope.backApp.parameters});
		$scope.configureTabOpen = false;
	}

})
.controller("widgetController",function($scope){
	$scope.configureTabOpen = false;

	$scope.configure = function()
	{
		console.log($scope.widget);
		$scope.socket.emit("configureWidget",{id: $scope.widget.id,parameters: $scope.widget.parameters});
		$scope.configureTabOpen = false;
	}
});
