var editorApp = angular.module('editorApp', []);

editorApp.controller('editorController', function($scope, $http, $compile) {
    $scope.editor = angular.element(document.querySelector('#extraform-editor'));
    $scope.extraformTypes = {};
    $scope.extraformConstraints = {};
    $scope.fields = [];
    $scope.newExtraformField = 'text';
    $scope.newExtraformConstraint = {
        'default' : 'not_blank',
        'fields' : []
    };

    $scope.uniqueId = function () {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    $http.get('/app_dev.php/_testsapi/extra-form-types.json')
        .success(function(data, status, headers, config) {
            $scope.extraformTypes = data;
        })
        .error(function(data, status, headers, config) {
            console.log(data, status, headers);
        })
    ;

    $http.get('/app_dev.php/_testsapi/extra-form-constraints.json')
        .success(function(data, status, headers, config) {
            $scope.extraformConstraints = data;
        })
        .error(function(data, status, headers, config) {
            console.log(data, status, headers);
        })
    ;

    $scope.addField = function(event) {
        event.preventDefault();
        $scope.fields.push({
            'name': 'field'+$scope.uniqueId(),
            'extra_form_type':  $scope.newExtraformField,
            'options': {},
            'constraints': []
        });

        $scope.newExtraformField = 'text';
    };

    $scope.removeField = function(event, index) {
        event.preventDefault();
        $scope.fields.splice(index, 1);
    };

    $scope.addConstraint = function(event, index) {
        event.preventDefault();

        $scope.fields[index].constraints.push({
            'extra_form_constraint': $scope.newExtraformConstraint.fields[index],
            'options': {}
        });
    };

    $scope.removeConstraint = function(event, fieldIndex, constraintIndex) {
        event.preventDefault();
        $scope.fields[fieldIndex].constraints.splice(constraintIndex, 1);
    };

    $scope.$watch(
        'fields',
        function(newVal, oldVal) {
            var extraform = {};
            angular.forEach($scope.fields, function(field, key) {
                extraform[field.name] = {
                    "extra_form_type": field.extra_form_type,
                    "options": field.options,
                    "constraints": field.constraints
                };
            });

            $scope.output = angular.toJson(extraform, true);

            var typeChanged = false;
            angular.forEach(newVal, function(field, key) {
                if (undefined == oldVal[key]) {
                    typeChanged = {
                        "key": key,
                        "from": undefined,
                        "to": field['extra_form_type']
                    };
                } else if (oldVal[key]['extra_form_type'] !== field['extra_form_type']) {
                    typeChanged = {
                        "key": key,
                        "from": oldVal[key]['extra_form_type'],
                        "to": field['extra_form_type']
                    };
                }
            });

            if (typeChanged) {
                // TODO: Keep same data or clean
                //$scope.fields[typeChanged.key].options = {};
                $http.get('/app_dev.php/_testsapi/extra-form-types/'+typeChanged.to+'/options.html')
                    .success(function(data, status, headers, config) {
                        var fieldOptions = angular.element(document.querySelector('#extraform-field-'+typeChanged.key+' .extraform-field-options'));
                        var options = data.replace(/name\=\"/g, 'data-ng-model="fields['+typeChanged.key+'].options.');
                        fieldOptions.html(options);
                        $compile(fieldOptions)($scope);
                    })
                    .error(function(data, status, headers, config) {
                        console.log(data, status, headers);
                    })
                ;
            }
        },
        true
    );
});