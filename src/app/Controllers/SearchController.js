const { formatPrice } = require('../lib/utils');

const Product = require('../models/Product');
const File = require('../models/File');

module.exports = {
  async index(req, res) {
    try { 

      let results, params  = {}
      
      const {filter, category } = req.query

      if(!filter) return res.redirect('/')

      params.filter = filter

      if(category) {
        params.category = category
      }

      results = await Product.search(params)

      async function getImage(productId) {
        let results = await Product.files(productId)
        const files = results.rows.map(file => `${req.protocol}://${req.headers.host}${file.path.replace('public', '')}`)
  
        return files[0]
      }

      const  prouctsPromise = results.rows.map(async product => {
        product.img = await getImage(product.id)
        product.oldPrice = formatPrice(product.old_price)
        product.price = formatPrice(product.price)
  
        return  product
      })

      const products = await Promise.all(prouctsPromise)

      return res.render('search/index', { products })

    }
    catch(err) {
      console.error(err)
    }
  }
}