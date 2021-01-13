const { rawListeners } = require('../../config/db')
const User = require('../models/User')
const { formatCpfCnpj, formatCep } = require('../lib/utils')

module.exports = {
  registerForm(req, res) {
    return res.render('user/register')
  },

  async show(req, res){
   const { user } = req

    user.cpf_cnpj = formatCpfCnpj(user.cpf_cnpj)
    user.cep = formatCep(user.cep)

    return res.render('user/index', { user })
  },

  async post(req, res) {
    try {
    const userId = await User.create(req.body)

    req.session.userId = userId

    return res.redirect('/users')
    }catch(err) {
      console.log(err)
    }
  },

  async update(req, res) {
     try {
      const {user} = req

      let { name, email, cpf_cnpj, cep, addres } = req.body

      cpf_cnpj = cpf_cnpj.replace(/\D/g, "")
      cep = cep.replace(/\D/g, "")

      await User.update(user.id, {
        name,
        email,
        cpf_cnpj,
        cep,
        addres
      })

      return res.render('user/index', {
        success: "Account updated successfully"
      })

     }catch(err) {
        console.log(err)
        return res.render('user/index', {
          error: 'Error Detected'
        })
     }
  }
}