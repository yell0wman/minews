/**
 * Broadcast updates to client when the model changes
 */

'use strict';

var news = require('./news.model');

exports.register = function(socket) {
  console.log('socket');
  console.log(socket);
  news.schema.post('save', function (doc) {
    console.log('doc save');
    console.log(doc);
    onSave(socket, doc);
  });
  news.schema.post('remove', function (doc) {
    console.log('doc remove');
    console.log(doc);
    onRemove(socket, doc);
  });
};

function onSave(socket, doc, cb) {
  socket.emit('news:save', doc);
}

function onRemove(socket, doc, cb) {
  socket.emit('news:remove', doc);
}
