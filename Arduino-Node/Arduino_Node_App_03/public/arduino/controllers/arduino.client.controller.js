angular.module('arduino').controller('ArticlesController', ['$scope','$routeParams', '$location', 'Authentication', 'Arduino',
function($scope, $routeParams, $location, Authentication, Arduino)
{
$scope.authentication = Authentication;
    
    
    $scope.create = function() {
var arduino = new Arduino({
title: this.title,
content: this.content
});
article.$save(function(response) {
$location.path('arduino/' + response._id);
}, function(errorResponse) {
$scope.error = errorResponse.data.message;
});
};
    
    
    $scope.find = function() {
$scope.arduino = Arduino.query();
};
$scope.findOne = function() {
$scope.arduino = Arduino.get({
arduinoId: $routeParams.arduinoId
});
};
    
    
    $scope.update = function() {
$scope.arduino.$update(function() {
$location.path('arduino/' + $scope.arduino._id);
}, function(errorResponse) {
$scope.error = errorResponse.data.message;
});
};
    
    
    $scope.delete = function(arduino) {
if (arduino) {
arduino.$remove(function() {
for (var i in $scope.arduino) {
if ($scope.arduino[i] === arduino) {
    $scope.arduino.splice(i, 1);
}
}
});
} else {
$scope.arduino.$remove(function() {
$location.path('arduino');
});
}
};
    
    
}
]);