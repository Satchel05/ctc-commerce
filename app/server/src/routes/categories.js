import { Router } from 'express'
import { pool } from '../../db/db.js'

const router = Router()

// GET /api/categories
router.get('/', async (req, res) => {
  const { rows } = await pool.query('SELECT id, name, slug FROM product_categories ORDER BY name')
  res.json(rows)
})

// GET /api/categories/:slug
router.get('/:slug', async (req, res) => {
  const { rows } = await pool.query('SELECT id, name, slug FROM product_categories WHERE slug = $1', [req.params.slug])
  if (!rows.length) return res.status(404).json({ error: 'Category not found' })
  res.json(rows[0])
})

export default router
