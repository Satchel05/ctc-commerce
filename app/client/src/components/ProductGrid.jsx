import ProductCard from './ProductCard.jsx'

export default function ProductGrid({ products, likedIds, onToggleLike }) {
  return (
    <div className="grid grid-cols-2 gap-3">
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