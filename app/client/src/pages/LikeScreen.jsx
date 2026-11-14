import { useMemo, useState } from 'react'
import { Heading, Text } from '@chakra-ui/react'
import SearchBar from '../components/SearchBar.jsx'
import FilterBar from '../components/FilterBar.jsx'
import ProductGrid from '../components/ProductGrid.jsx'
import BottomNav from '../components/BottomNav.jsx'

export default function LikeScreen({ products, loading, error, likedIds, toggleLike }) {
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('default')
  const [color, setColor] = useState('all')

  const filtered = useMemo(() => products
    .filter((product) => likedIds.has(product.id))
    .filter((product) => product.name.toLowerCase().includes(query.toLowerCase()))
    .filter((product) => color === 'all' || String(product.color ?? '').toLowerCase() === color)
    .sort((a, b) => sort === 'default' ? 0 : sort === 'asc' ? a.price - b.price : b.price - a.price),
  [products, likedIds, query, sort, color])

  return (
    <main className="shopping-screen liked-screen">
      <div className="shop-content">
        <Heading className="shop-title" as="h1">Liked</Heading>
        <SearchBar value={query} onChange={setQuery} />
        <FilterBar sort={sort} onSort={setSort} onColor={setColor} />
        <section className="shop-results" aria-label="Liked products" aria-busy={loading} tabIndex={0}>
          {loading ? <Text role="status">Loading liked products…</Text>
            : error ? <Text role="alert">Unable to load products: {error}</Text>
            : filtered.length ? <ProductGrid products={filtered} likedIds={likedIds} onToggleLike={toggleLike} />
            : <Text role="status">{likedIds.size === 0
              ? 'No liked items yet. Tap a heart on Shop to save an item here.'
              : 'No liked items match your search or filters.'}</Text>}
        </section>
      </div>
      <BottomNav />
    </main>
  )
}
