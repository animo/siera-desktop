import { multiply } from '@animo/template-multiply'
import express from 'express'
const app = express()

const ADD_TO_SUM = process.env.ADD_TO_SUM ? Number(process.env.ADD_TO_SUM) : 0

app.get('/multiply', (req, res) => {
  if (!req.query.a || !req.query.b) {
    res.status(400).send('Missing a and/or b query parameters')
  }

  const multiplied = multiply(Number(req.query.a), Number(req.query.b))

  res.send(String(multiplied + ADD_TO_SUM))
})

app.listen(8181, () => {
  // eslint-disable-next-line no-console
  console.log('successfully running')
})
