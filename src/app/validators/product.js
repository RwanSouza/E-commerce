async function post(req, res, next) {
  const keys = Object.keys(req.body)

  for(key of keys ) {
    if(req.body[key] == "") {
      return res.send('Please, fill all fields')
    }
  }

  if(!req.files || req.files.length == 0) 
    return res.send('Please, send at least one image')

  next()  
}

module.exports = {
  post,
}