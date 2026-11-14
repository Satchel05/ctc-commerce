import { Router } from 'express'
import { pool } from '../../db/db.js'
import { PRODUCT_SELECT } from '../lib/queries.js'

const router = Router()

// GET /api/products
// GET /api/products?category=electronics
router.get('/', async (req, res) => {
  const { category } = req.query
  const { rows } = category
    ? await pool.query(`${PRODUCT_SELECT} WHERE c.slug = $1 ORDER BY p.name`, [category])
    : await pool.query(`${PRODUCT_SELECT} ORDER BY p.name`)
  res.json(rows)
})

// GET /api/products/:id
router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  if (!Number.isInteger(id)) return res.status(400).json({ error: 'Product id must be a number' })

  const { rows } = await pool.query(`${PRODUCT_SELECT} WHERE p.id = $1`, [id])
  if (!rows.length) return res.status(404).json({ error: 'Product not found' })
  res.json(rows[0])
})

export default router
