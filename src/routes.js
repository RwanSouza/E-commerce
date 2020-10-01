const express = require('express');
const productController = require('./app/Controllers/ProductController');

const routes = express.Router();

routes.get('/', (req, res ) => {
  return res.render('layout.njk');
});

routes.get('/products/create', productController.create);
routes.post('/products', productController.post);


routes.get('/', (req, res ) => {
  return res.redirect('products/create');
});


module.exports = routes;
