const faker = require('faker')

const email = faker.internet.email().toLowerCase()

const user = {
  name: faker.name.firstName() + ' ' + faker.name.lastName(),
  identifier: email,
  email: email
}

module.exports = {
  email,
  user
}
