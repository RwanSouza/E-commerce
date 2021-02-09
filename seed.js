const faker = require('faker')
const { hash } = require('bcryptjs')

const User = require('./src/app/models/User')

let usersIds = []
 
async function createUsers() {
  const users = []
  const password = await hash('222', 8)

  while(users.length < 5) {
    users.push({
      name:faker.name.firstName(),
      email:faker.internet.email(),
      password,
      cpf_cnpj:faker.random.number(78919312700),
      cep:faker.random.number(09720381),
      addres:faker.address.streetName(), 
    })
  }

  const usersPromise = users.map(user => User.create(user))

  usersIds = await Promise.all(usersPromise)
}

createUsers()