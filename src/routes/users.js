const express = require('express');
const routes = express.Router();

const validator = require('../app/validators/user')

const sessionController = require('../app/Controllers/SessionController');
const userController = require('../app/Controllers/UserController');


// // login/logout
// routes.get('/login', sessionController.loginForm);
// routes.post('/login', sessionController.login);
// routes.post('/logout', sessionController.logout);

// // reset password / forgot
// routes.get('/forgot-password', sessionController.forgotForm);
// routes.get('/password-reset', sessionController.resetForm);
// routes.post('/forgot-password',sessionController.forgot);
// routes.post('/password-reset', sessionController.reset);

// // user register UserController 
routes.get('/register', userController.registerForm);
routes.post('/register', validator.post, userController.post);

// routes.get('/', userController.show);
// routes.put('/', userController.update);
// routes.delete('/', userController.delete);


module.exports = routes;
