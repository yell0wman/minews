/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /news              ->  showAll
 * GET     /news/:id          ->  showById
 * POST    /news              ->  create
 * PUT     /news/:id          ->  update
 * DELETE  /news/:id          ->  destroy
 * DELETE  /news              ->  destroyAll
 */

'use strict';

var _ = require('lodash');
var News = require('./news.model');

// Get list of news
exports.showAll = function(req, res) {
  News.find(function(err, news) {
    if (err) { return handleError(res, err); }
    return res.json(200, news);
  });
};

// Get single news by ID
exports.showById = function(req, res) {
  News.findById(req.params.id, function(err, news) {
    if (err) { return handleError(res, err); }
    if (!news) { return res.send(404); }
    return res.json(news);
  });
};

// Creates new news in the DB.
exports.create = function(req, res) {
  News.find({'link': req.body.link}, function(err, news) {
    console.log(news.length);
    if (err) { return handleError(res, err); }
    if (news.length > 0) { return res.json(201, news); }
    News.create(req.body, function(err, news) {
      if (err) { return handleError(res, err); }
      return res.json(201, news);
    });
  });
};

// Updates existing news in the DB.
exports.update = function(req, res) {
  if (req.body._id) { delete req.body._id; }
  News.findById(req.params.id, function(err, news) {
    if (err) { return handleError(res, err); }
    if (!news) { return res.send(404); }
    var updated = _.merge(news, req.body);
    updated.save(function(err) {
      if (err) { return handleError(res, err); }
      return res.json(200, news);
    });
  });
};

// Deletes news from the DB.
exports.destroy = function(req, res) {
  News.findById(req.params.id, function(err, news) {
    if (err) { return handleError(res, err); }
    if (!news) { return res.send(404); }
    news.remove(function(err) {
      if (err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

// Deletes news from the DB.
exports.destroyAll = function(req, res) {
  console.log(req);
  console.log(res);
  News.find(function(err, news) {
    if (err) { return handleError(res, err); }
    news.forEach(function(element) {
      element.remove(function(err) {
        if (err) { return handleError(res, err); }
        return res.send(204);
      });
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
