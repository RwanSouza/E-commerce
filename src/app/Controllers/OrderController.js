const LoadProductServices = require('../services/LoadProductServices')
const User = require('../models/User')

const mailer = require('../lib/mailer')

module.exports = {
  async post(req, res) {
  
    try { 
      
    // get data in products
      const product = await LoadProductServices.load('product', { where: {
        id: req.body.id
      }})

    // data the seller
      const seller =  await User.findOne({ where: {id: product.user_id }})

    // data the buyer
      const buyer = await User.findOne({ where: {id: req.session.userId }})

    // send email with purchase details  
      await mailer.sendMail({
        to: seller.email,
        from:'no-replay@launchstore.com.br',
        subject: 'New order the buy',
        html: 'Nova compra'
      })

    // notify user with message
      return res.render('orders/success')

    }catch(err) {
      console.error(err)
      return res.render('orders/error')
    }
  }
}