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


router.get('/findById/:id/json', function(req, res, next) {

  var id = req.params.id;

  models.log_visitas.findOne({_id: id}, function (err, log_visitas) {
      if (err) {
          return res.status(500).json({
              message: 'Error when getting log_visitas.',
              error: err
          });
      }

      if (!log_visitas) {
          return res.status(404).json({
              message: 'No such log_visitas'
          });
      }

      return res.json(log_visitas);
  });

});

module.exports = router;
