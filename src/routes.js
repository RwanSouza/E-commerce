const express = require('express');
const routes = express.Router();
const multer = require('./app/middlewares/multer');
const productController = require('./app/Controllers/ProductController');
const homeController = require('./app/Controllers/HomeController');
const searchController = require('./app/Controllers/SearchController');


// Home
routes.get('/', homeController.index);

// Search
routes.get('/products/search', searchController.index)

// Products
routes.get('/products/create', productController.create);
routes.get('/products/:id', productController.show)
routes.get('/products/:id/edit', productController.edit);

routes.post('/products', multer.array("photos", 6), productController.post);
routes.put('/products', multer.array("photos", 6), productController.put);
routes.delete('/products', productController.delete);


// Alias
routes.get('/', (req, res ) => {
  return res.redirect('products/create');
});


module.exports = routes;
