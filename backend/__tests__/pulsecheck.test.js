const { describe, it, expect } = require('@jest/globals')
const supertest = require('supertest')

const app = require('../app')

describe('The pulse check endpoint', () => {
  it('should return status code 200 when backend is running', async () => {
    const response = await supertest(app).get('/pulsecheck')

    expect(response.status).toEqual(200)
  })
})
