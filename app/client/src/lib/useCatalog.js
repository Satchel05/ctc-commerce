import { useEffect, useState } from 'react'
import { backend } from './backend.js'

const LIKED_STORAGE_KEY = 'ctc-commerce:liked-products'

function readLikedIds() {
  try {
    const saved = JSON.parse(localStorage.getItem(LIKED_STORAGE_KEY) ?? '[]')
    return new Set(Array.isArray(saved) ? saved : [])
  } catch {
    return new Set()
  }
}

// Owned by App so both catalog routes see the same products and favorites.
export default function useCatalog() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [likedIds, setLikedIds] = useState(readLikedIds)

  useEffect(() => {
    const controller = new AbortController()
    backend.get('/api/products', { signal: controller.signal })
      .then(({ data }) => setProducts(data))
      .catch((err) => {
        if (!controller.signal.aborted) setError(err.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })
    return () => controller.abort()
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem(LIKED_STORAGE_KEY, JSON.stringify([...likedIds]))
    } catch {
      // Favorites still work for this session when storage is unavailable.
    }
  }, [likedIds])

  const toggleLike = (id) => setLikedIds((previous) => {
    const next = new Set(previous)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    return next
  })

  return { products, loading, error, likedIds, toggleLike }
}
