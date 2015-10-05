angular.module('arduino').config(['$routeProvider',
function($routeProvider) {
$routeProvider.
when('/arduino', {
templateUrl: 'arduino/views/list-arduino.client.view.html'
}).
when('/arduino/create', {
templateUrl: 'arduino/views/create-arduino.client.view.html'
}).
when('/arduino/:arduinoId', {
    templateUrl: 'arduino/views/view-arduino.client.view.html'
}).
when('/arduino/:arduinoId/edit', {
templateUrl: 'arduino/views/edit-arduino.client.view.html'
});
}
]);