import ProductCard from './ProductCard.jsx'

export default function ProductGrid({ products, likedIds, onToggleLike }) {
  return (
    <div className="shop-grid">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          liked={likedIds.has(p.id)}
          onToggleLike={onToggleLike}
        />
      ))}
    </div>
  )
}