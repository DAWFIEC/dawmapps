var express = require('express');
const axios = require('axios')
var router = express.Router();

const multer  = require('multer')
const FormData = require('form-data');
const upload = multer()


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/photos', async function(req, res, next) {
  
  const URL = 'http://localhost:4444/fotos/findAll/json'
  const config = {
    proxy: {
      host: 'localhost',
      port: 4444
    }
  }
  const response = await axios.get(URL, config)

  response.data.map( item => { item.url = 'http://localhost:4444/'+item.ruta.replace('public/','') } )

  
  res.render('fotos', { title: 'Fotos', fotos: response.data });
})

router.get('/photos/add', function(req, res, next) {
  res.render('fotos_formulario', { title: 'Express' });
});

router.post('/photos/save', upload.single('route'), async function(req, res, next) {  

  let { title, description, rate } = req.body
  let { buffer, originalname } = req.file

  let form = new FormData()
  form.append("titulo", title)
  form.append("descripcion", description)
  form.append("calificacion", rate)
  form.append("ruta", originalname)
  form.append("archivo", buffer, originalname)

  const URL = 'http://localhost:4444/rest/fotos/save'
  const config = {
    headers: form.getHeaders(),
    proxy: {
      host: 'localhost',
      port: 4444
    }
  }
  const response = await axios.post(URL, form, config);


  if(response.status == '200' && response.statusText == 'OK') {
    res.redirect('/photos')
  } else {
    res.redirect('/') 
  }

    
});

module.exports = router;
