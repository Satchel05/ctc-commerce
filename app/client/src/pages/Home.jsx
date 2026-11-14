import { useEffect, useMemo, useState } from 'react'
import { Heading, Text } from '@chakra-ui/react'
import { backend } from '../lib/backend.js'
import SearchBar from '../components/SearchBar.jsx'
import FilterBar from '../components/FilterBar.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import Pagination from '../components/Pagination.jsx'
import BottomNav from '../components/BottomNav.jsx'

const PAGE_SIZE = 4

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('default')
  const [color, setColor] = useState('all')
  const [favoritesOnly, setFavoritesOnly] = useState(false)
  const [page, setPage] = useState(1)
  const [likedIds, setLikedIds] = useState(new Set())

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await backend.get('/api/products')
        setProducts(res.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  const toggleLike = (id) =>
    setLikedIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return products
      .filter((p) => p.name.toLowerCase().includes(q))
      .filter((p) => color === 'all' || String(p.color ?? '').toLowerCase() === color)
      .filter((p) => !favoritesOnly || likedIds.has(p.id))
      .sort((a, b) => (sort === 'default' ? 0 : sort === 'asc' ? a.price - b.price : b.price - a.price))
  }, [products, query, sort, color, favoritesOnly, likedIds])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  return (
    <main className="shopping-screen">
      <div className="shop-content">
        <Heading className="shop-title" as="h1">Shop</Heading>
        <SearchBar value={query} onChange={(v) => { setQuery(v); setPage(1) }} />
        <FilterBar sort={sort} onSort={(v) => { setSort(v); setPage(1) }}
          onColor={(v) => { setColor(v); setPage(1) }} />
        <section className="shop-results" aria-label="Products" aria-busy={loading}>
          {loading ? <Text role="status">Loading products…</Text>
            : error ? <Text role="alert">Unable to load products: {error}</Text>
            : visible.length ? <ProductGrid products={visible} likedIds={likedIds} onToggleLike={toggleLike} />
            : <Text role="status">No products found.</Text>}
        </section>
        <Pagination page={page} totalPages={totalPages} onChange={setPage} />
      </div>
      <BottomNav favoritesOnly={favoritesOnly} onFavorites={() => { setFavoritesOnly((v) => !v); setPage(1) }} />
    </main>
  )
}
