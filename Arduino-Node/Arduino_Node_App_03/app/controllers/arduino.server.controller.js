var mongoose = require('mongoose'),
Article = mongoose.model('Arduino');
var getErrorMessage = function(err) {
if (err.errors) {
for (var errName in err.errors) {
if (err.errors[errName].message) return err.errors[errName].
message;
}
} else {
return 'Unknown server error';
}
};

//creating a record 
exports.create = function(req, res) {
var arduino = new Arduino(req.body);
arduino.creator = req.arduino
arduino.save(function(err) {
if (err) {
return res.status(400).send({
message: getErrorMessage(err)
});
} else {
res.json(arduino);
}
});
};

//reading a record

exports.list = function(req, res) {
Arduino.find().sort('-created').populate('creator', 'firstName lastName fullName').exec(function(err, articles) {
if (err) {
    return res.status(400).send({
message: getErrorMessage(err)
});
} else {
res.json(articles);
}
});
};


//reading a record by ID

exports.arduinoByID = function(req, res, next, id) {
Article.findById(id).populate('creator', 'firstName lastName fullName').exec(function(err, article) {
                              if (err) return next(err);
if (!arduino) return next(new Error('Failed to load article '+ id));
req.arduino = article;
next();
});
};


exports.read = function(req, res) {
res.json(req.arduino);
};


//update a record
exports.update = function(req, res) {
var arduino = req.arduino;
arduino.title = req.body.title;
arduino.content = req.body.content;
arduino.save(function(err) {
if (err) {
return res.status(400).send({
message: getErrorMessage(err)
});
} else {
res.json(arduino);
}
});
};


//delete a record

exports.delete = function(req, res) {
var arduino = req.arduino;
arduino.remove(function(err) {
if (err) {
return res.status(400).send({
message: getErrorMessage(err)
});
} else {
res.json(arduino);
}
});
};