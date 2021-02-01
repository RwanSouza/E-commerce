const crypto = require('crypto')
const User = require('../models/User')
const mailer = require('../lib/mailer')

module.exports = {
  logout(req, res) {
    req.session.destroy()
    return res.redirect('/')
  },

  loginForm(req, res) {
    return res.render('session/login')
  },

  login(req, res) {
    req.session.userId = req.user.id

    return res.redirect('/users')
  },

  forgotForm(req, res){
    return res.render('session/forgot-password')
  },

  async forgot(req, res) {
    const user = req.user

    try {
      // User token
    const token = crypto.randomBytes(20).toString('hex') 

    // token expiration 
    let now = new Date()
    now = now.setHours(now.getHours() + 1)
  
    await User.update(user.id, { 
      reset_token: token,
      reset_token_expires: now
    })

    // send email to user with link the recover password
    await mailer.sendMail({
      to: user.email,
      from: 'no-reply@store.com.br',
      subject: 'Recover password',
      html: `<h2> Lost Key?</h2>
      <p>Click on the link below for  recover your password</p>

      <p>
        <a href="http://localhost:3000/users/ password-reset?token=$=${token}" target="_blank">
          Recover Password
        </a> 
      </p>
      `,
    })
    
    // notify user
    return res.render('session/forgot-password', {
      success: 'Verify email to reset your password'
    })
    }catch(err) {
      console.log(err)
      return res.render('session/forgot-password', {
        error:'Error unexpected'
      })
    }
  }
}