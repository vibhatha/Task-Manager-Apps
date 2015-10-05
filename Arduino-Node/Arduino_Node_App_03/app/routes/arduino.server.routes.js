var users = require('../../app/controllers/users.server.controller'),
arduino = require('../../app/controllers/arduino.server.
controller');
module.exports = function(app) {
app.route('/api/arduino')
.get(arduino.list)
.post(users.requiresLogin, arduino.create);
app.route('/api/arduino/:arduinoId')
.get(arduino.read)
.put(users.requiresLogin, arduino.hasAuthorization, arduino.
update)
.delete(users.requiresLogin, arduino.hasAuthorization, arduino.
delete);
app.param('arduinoId', arduino.arduinoByID);
};