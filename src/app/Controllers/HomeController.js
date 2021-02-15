const LoadProductServices = require('../services/LoadProductServices')

module.exports = {
  async index(req, res) {
  
    try { 
      
      const Allproducts = await LoadProductServices.load('products')

      const products = Allproducts.filter((product, index) => index > 2 ? false : true)

      return res.render("home/index", { products })

    }catch(err) {
      console.error(err)
    }
  }
}