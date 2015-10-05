angular.module('arduino').factory('Arduino', ['$resource',
function($resource) {
return $resource('api/arduino/:arduinoId', {
arduinoId: '@_id'
}, {
update: {
method: 'PUT'
}
});
}]);