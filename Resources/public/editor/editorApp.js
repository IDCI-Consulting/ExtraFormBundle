var editorApp = angular.module('editorApp', []);

editorApp.controller('EditorController', [ '$scope', '$http', function($scope, $http) {
	$scope.json = {};
	$scope.fieldtypes = {};
	$scope.selectedFieldtype = undefined;
	$scope.previewElement = angular.element($('#extraform-editor-preview'));

    $scope.addField = function() {
    	//Get html for "selectedFieldtype"
    	$http.get("URI").
    		success(function(data, status, headers, config) {
    			$scope.previewElement.append(data);
    			$scope.appendToJson(data);
    		}).
    		error(function(data, status, headers, config) {
    			console.log(data);
    		});
    };

    $scope.appendToJson = function(html) {
    	$scope.json = {};
    }

    //Get field types from api
    $http.get("URI").
    	success(function(data, status, headers, config) {
    		$scope.fieldtypes = data;
    	}).
    	error(function(data, status, headers, config)) {
    		console.log(data);
    	});
}]);