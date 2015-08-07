var editorApp = angular.module('editorApp', []);

editorApp.controller('editorController', function($scope, $http) {
        $scope.formFetcherURI = function(type, format) {
            return "/app_dev.php/_testsapi/extra-form-types/" + type + "/options." + format;
        };
        $scope.typesFetcherURI = "/app_dev.php/_testsapi/extra-form-types.html";

        $scope.json = {};
        $scope.selectedFieldtype = undefined;
        $scope.previewElement = angular.element(document.querySelector('#extraform-editor-preview'));

        $scope.appendToJson = function(html) {
            //TO DO
        }
    }
);

editorApp.directive('typechoice', [
    '$http',
    '$compile',
    function($http, $compile) {
        return {
            restrict : "E",
            link : function(scope, element, attributes) {
                scope.addField = function() {
                    var field = angular.element('<field fieldtype="' + scope.selectedFieldtype + '"></field>');

                    $compile(field)(scope);
                    scope.previewElement.append(field);
                };

                //Get field types from api
                $http.get(scope.typesFetcherURI).
                    success(function(data, status, headers, config) {
                        var select = angular.element(data);
                        select.attr("data-ng-model", "selectedFieldtype");

                        var addButton = angular.element('<span data-ng-click="addField()" style="cursor:pointer;">Add Field</span>');

                        $compile(select)(scope);
                        $compile(addButton)(scope);

                        element.after(addButton);
                        element.replaceWith(select);
                    }).
                    error(function(data, status, headers, config) {
                        console.log(data);
                        element.replaceWith('<span style="color:red;">Unable to get form types list !</span>');
                    })
                ;
            }
        }
    }
]);

editorApp.directive('field', [
    '$http',
    '$compile',
    function($http, $compile) {
        return {
            restrict : "E",
            scope : {
                fieldtype : "@"
            },
            link : function (scope, element, attributes) {
                scope.save = function() {
                    var fieldsets = element.find("fieldset");
                    for(fieldset in fieldsets) {
                        var label = fieldset.find("label");

                        /*
                        *
                        *  TO DO get form and label value and save it in JSON
                        *
                        */
                    }
                };

                $http.get(scope.$parent.formFetcherURI(scope.fieldtype, "html")).
                    success(function(data, status, headers, config) {
                        var block = angular.element('<div ><span ng-init="isVisible = false" ng-click="isVisible = !isVisible" style="cursor:pointer;">' + scope.fieldtype + ' </span><input name="name" data-ng-model="name" value="" placeholder="name"/><span data-ng-click="save()">SAVE</span></div>');
                        var field = angular.element(data);

                        field.attr('data-ng-show','isVisible');

                        block.append(field);
                        $compile(block)(scope);

                        element.replaceWith(block);

                        scope.$parent.appendToJson(data);
                    }).
                    error(function(data, status, headers, config) {
                        console.log(data);
                    })
                ;
            }
        }
    }
]);