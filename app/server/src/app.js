import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import productsRouter from './routes/products.js'
import brandsRouter from './routes/brands.js'
import categoriesRouter from './routes/categories.js'

dotenv.config({ path: new URL('../.env', import.meta.url) })

const app = express()
app.use(cors())
app.use(express.json())

// This API is read-only: reject anything other than GET/HEAD/OPTIONS.
app.use((req, res, next) => {
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next()
  res.set('Allow', 'GET').status(405).json({ error: 'This API is read-only' })
})

app.get('/api/health', (req, res) => res.json({ ok: true }))

app.use('/api/products', productsRouter)
app.use('/api/brands', brandsRouter)
app.use('/api/categories', categoriesRouter)

app.use((req, res) => res.status(404).json({ error: 'Not found' }))

// Express 5 forwards rejected promises from async handlers here.
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
})

if (process.env.NODE_ENV !== 'test') {
  const port = process.env.PORT || 3001
  app.listen(port, () => console.log(`Server listening on ${port}`))
}

export default app
