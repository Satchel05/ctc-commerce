import { useMemo, useState } from 'react'
import { Heading, Text } from '@chakra-ui/react'
import SearchBar from '../components/SearchBar.jsx'
import FilterBar from '../components/FilterBar.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import Pagination from '../components/Pagination.jsx'
import BottomNav from '../components/BottomNav.jsx'

const PAGE_SIZE = 4

export default function Home({ products, loading, error, likedIds, toggleLike }) {
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('default')
  const [color, setColor] = useState('all')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return products
      .filter((p) => p.name.toLowerCase().includes(q))
      .filter((p) => color === 'all' || String(p.color ?? '').toLowerCase() === color)
      .sort((a, b) => (sort === 'default' ? 0 : sort === 'asc' ? a.price - b.price : b.price - a.price))
  }, [products, query, sort, color])

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
      <BottomNav />
    </main>
  )
}
