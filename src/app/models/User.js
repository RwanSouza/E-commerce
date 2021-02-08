const Base = require('./Base');

Base.init({ table: 'users' });

module.exports = {
  ...Base,

}




// async create(data) {
  //   try {
      
  //     const query = `
  //     INSERT INTO users (
  //       name,
  //       email,
  //       password,
  //       cpf_cnpj,
  //       cep,
  //       addres
  //     ) VALUES ($1, $2, $3, $4, $5, $6)
  //     RETURNING id
  //   `
  //   // Hash of password
    
  //     const passwordHash = await hash(data.password, 8)

  //     const values = [
  //       data.name,
  //       data.email,
  //       passwordHash,
  //       data.cpf_cnpj.replace(/\D/g, ""),
  //       data.cep.replace(/\D/g, ""),
  //       data.addres,
  //     ]

  //     const results = await db.query(query, values);
  //     return results.rows[0].id 

  //   }catch(err) {
  //     console.error(err)
  //   }    
  // },

  // async update(id, fields) {
  //    try{
  //     let query = "UPDATE users SET"

  //     Object.keys(fields).map((key, index, array) => {
  //       if((index +1) < array.length) {
  //         query = `${query} ${key} = '${fields[key]}',`
  //       }else {
  //         query = `${query} ${key} = '${fields[key]}' WHERE id = ${id}`
  //       }
  //     })

  //     await db.query(query)
  //     return
  //   }catch(err) {
  //      console.log(err)
  //    }
  // },

  // async delete(id) {
  //   // catch all products
  //   let results = await Product.all()
  //   const products = results.rows

  //   // catch all images products
  //   const allFilesPromise = products.map(product => 
  //     Product.files(product.id))
    
  //   let promiseResults = await Promise.all(allFilesPromise)
    
  //   // remove user
  //     await db.query('DELETE FROM users WHERE id = $1', [id])

  //   // remove the images in folder public
  //   promiseResults.map(results => {
  //     results.rows.map(file => fs.unlinkSync(file.path))
  //   })
  // }