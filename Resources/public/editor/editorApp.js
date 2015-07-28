var editorApp = angular.module('editorApp', []);

editorApp.controller('EditorController', function($scope) {
    $scope.addField = function() {
        console.log('test add field');
    };
});
