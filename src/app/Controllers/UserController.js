const User = require('../models/User')
const Product = require('../models/Product')

const { formatCpfCnpj, formatCep } = require('../lib/utils')

const { hash } = require('bcryptjs')
const { unlinkSync } = require('fs')

module.exports = {
  registerForm(req, res) {
    return res.render('user/register')
  },

  async show(req, res){
    try {
      const { user } = req

      user.cpf_cnpj = formatCpfCnpj(user.cpf_cnpj)
      user.cep = formatCep(user.cep)
  
      return res.render('user/index', { user })
    }catch(err) {
      console.error(err)
    }
  },

  async post(req, res) {
    try {
      let { name, email, password, cpf_cnpj, cep, addres } = req.body

      password = await hash(password, 8)
      cpf_cnpj = cpf_cnpj.replace(/\D/g, '')
      cep = cep.replace(/\D/g, '')

      const userId = await User.create({ name, email, password, cpf_cnpj, cep, addres })

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
  },
  async delete(req, res) {
    try {

      // catch all products
      const products = await Product.findAll({ where: { user_id: req.body.id } })

      // catch all images products
      const allFilesPromise = products.map(product => 
        Product.files(product.id))
      
      let promiseResults = await Promise.all(allFilesPromise)
      
      // remove user
        await User.delete(req.body.id)
        req.session.destroy()

      // remove the images in folder public
      promiseResults.map(results => {
        results.rows.map(file => unlinkSync(file.path))
      })

      return res.render('session/login', {
        success: 'Account delete with success'
      })

    }catch(err) {
      console.error(err)
      return res.render('user/index', {
        error: 'Error when trying to delete your account'
      })
    }
  }
}