const { rawListeners } = require('../../config/db')
const { create } = require('../models/User')
const User = require('../models/User')

module.exports = {
  registerForm(req, res) {
    return res.render('user/register')
  },

  async show(req, res){
    return res.send('OK REGISTER')
  },
  async post(req, res) {
  
    const userId = await User.create(req.body)

    req.session.userId = userId

    return res.redirect('/users')
  }
}