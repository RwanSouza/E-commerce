const express = require('express');
const routes = express.Router();

const homeController = require('../app/Controllers/HomeController');

const products = require('./products');
const users = require('./users');


routes.get('/', homeController.index);
routes.use('/products', products);
routes.use('/users', users);

// Alias
routes.get('/ads/create', (req, res ) => {
  return res.redirect('products/create');
});


routes.get('/accounts', (req, res ) => {
  return res.redirect('users/login');
});

module.exports = routes;
