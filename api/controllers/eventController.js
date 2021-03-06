// Require packages
var Event = require('../models/event');

function allEvents(req, res) {
  Event.find(function (err, events) {
     if (err) return res.status(404).json({message: 'Something went wrong.'});
     res.status(200).json({ events: events });
   });
};

function newEvent(req, res) {
  var event = new Event(req.body);

  event.save(function (err) {
    if (err) return res.status(500).json({message: "Error saving new event."})
    res.status(201).json({event: event});
  });
};

function editEvent(req, res) {
  var id          = req.params.id;
  var eventParams = req.body.event;

  Event.findByIdAndUpdate({ _id: id}, eventParams, function(err, event){
    if (err) return res.status(404).json({ message: 'Something went wrong'});
    res.status(200).json({ event: event});
  });
};

function deleteEvent(req, res) {
  var id = req.params.id;

  Event.remove({ _id: id}, function(err){
    if (err) return res.status(404).json({ message: 'Something went wrong'});
    res.status(200).json({ event: event});
  });
};

module.exports = {
  allEvents:    allEvents,
  newEvent:     newEvent,
  editEvent:    editEvent,
  deleteEvent:  deleteEvent
};
