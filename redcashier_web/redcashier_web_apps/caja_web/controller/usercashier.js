app
.controller("UserCaCtrl", function($scope, $state, $stateParams, cajaService, $window, $mdDialog, $log, toastr){
	$scope.fields = 'nombre';
	var params = {};
	$scope.lista = [];
	$scope.usercashier = {};

	$scope.list = function (params){
		$scope.isLoading = true;
		cajaService.Usercashier.query(params, function(r){
			$scope.lista = r.results;
			$scope.options = r.options;
			$scope.isLoading = false;
		}, function(err){
			$log.log("Error in list:" + JSON.stringify(err));
            toastr.error(err.data.results.detail, err.status + ' ' + err.statusText);
		});
	};
	$scope.list(params);
	$scope.buscar =function(){
		params.page = 1;
		params.fields = $scope.fields;
		params.query = $scope.query;
		$scope.list(params);
	};
	$scope.onReorder = function(order){
		$log.log('order: ' + order);
	};
	$scope.delete = function(d){
		if($window.confirm("seguro?")){
			cajaService.Usercashier.delete({id:d.id}, function(r){
				$log.log("se eliminó usercashier: " + JSON.stringify(D));
				toastr.success('se elimino usercashier ' + d.nombre, 'Usercashier');
				$scope.list(params);
			}, function(err){
				$log.log("error in delete: " + JSON.stringify(err));
				toastr.error(err.data.detail, err.status+ '' + err.statusText);
			});

		}
	};
})

.controller("UserCaSaveCtrl", function($scope, $state, $stateParams, cajaService, $window, $mdDialog, $log, toastr) {
    //Valores iniciales
    $scope.usercashier = {};

    $scope.sel = function() {
        cajaService.Usercashier.get({ id: $stateParams.id }, function(r) {
            $scope.usercashier = r;
        }, function(err) {
            $log.log("Error in get:" + JSON.stringify(err));
            toastr.error(err.data.detail, err.status + ' ' + err.statusText);
        });
    };
    if ($stateParams.id) {
        $scope.sel();
    }

    $scope.save = function() {
        if ($scope.usercashier.id) {
            cajaService.Usercashier.update({ id: $scope.usercashier.id }, $scope.usercashier, function(r) {
                $log.log("r: " + JSON.stringify(r));
                toastr.success('Se editó usercashier ' + r.nombre, 'Usercashier');
                $state.go('caja.caja.usercashiers');
            }, function(err) {
                $log.log("Error in update:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        } else {
            cajaService.Usercashier.save($scope.usercashier, function(r) {
                $log.log("r: " + JSON.stringify(r));
                toastr.success('Se insertó usercashier ' + r.nombre, 'Usercashier');
                $state.go('caja.caja.usercashiers');
            }, function(err) {
                $log.log("Error in save:" + JSON.stringify(err));
                toastr.error(err.data.detail, err.status + ' ' + err.statusText);
            });
        }
    };

    $scope.cancel = function() {
        $state.go('caja.caja.usercashiers');


        
    };
});