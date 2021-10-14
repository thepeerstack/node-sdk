const { expect } = require('chai')
const Thepeer = require('../../index')
const { user } = require('../fixtures/index')

describe('The Peer', () => {
  let indexedUser
  const thepeer = new Thepeer(process.env.THEPEER_SECRET_KEY)
  it('Should Index a User', async () => {
    const data = await thepeer.indexUser({ ...user })
    indexedUser = data.indexed_user
    expect(data).to.be.an('object')
    expect(data.indexed_user.email).to.be.equals(user.email)
  })

  it('Should Get a User', async () => {
    const data = await thepeer.getUser(indexedUser.reference)
    expect(data).to.be.an('object')
    expect(data.indexed_user.email).to.be.equals(user.email)
  })

  it('Should Update a User', async () => {
    const data = await thepeer.updateUser(indexedUser.reference, indexedUser.identifier)
    expect(data).to.be.an('object')
  })

  it('Should Delete a User', async () => {
    const data = await thepeer.deleteUser(indexedUser.reference)
    expect(data).to.be.an('object')
    expect(data.message).to.be.a('string').equal('user deleted')
  })
})
