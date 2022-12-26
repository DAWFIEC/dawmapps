var express = require('express');
var router = express.Router();

const models = require('../models').default;


router.get('/findAll/json', function(req, res, next) {

  models.log_visitas.find( (err, response) => {
      if (err) {
          return res.status(500).json({
              message: 'Error when getting log_visitas.',
              error: err
          });
      }

      return res.json(response);
  });

});


router.get('/findById/:_id/json', function(req, res, next) {

  var _id = req.params._id;

  models.log_visitas.findOne({_id: _id}, function (err, response) {
      if (err) {
          return res.status(500).json({
              message: 'Error when getting log_visitas.',
              error: err
          });
      }

      if (!response) {
          return res.status(404).json({
              message: 'No such log_visitas'
          });
      }

      return res.json(response);
  });

});

module.exports = router;
