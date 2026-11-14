import { Link } from 'react-router-dom'

export default function ProductCard({ product, liked, onToggleLike }) {
  return (
    <article className="shop-card">
      <div className="shop-card-image">
        <Link to={`/item/${product.id}`} aria-label={`View ${product.name}`}>
          <img src={product.thumbnail_url || product.image_url} alt={product.name} />
        </Link>
        <button type="button" className="shop-favorite" aria-label={`${liked ? 'Unlike' : 'Like'} ${product.name}`}
          aria-pressed={liked} onClick={() => onToggleLike(product.id)}>
          <img src={liked ? '/assets/shopping/favorite-filled.svg' : '/assets/shopping/favorite.svg'} alt="" width="16" height="16" />
        </button>
      </div>
      <div className="shop-card-info">
        <Link to={`/item/${product.id}`}>{product.name}</Link>
        <span>${Number(product.price).toFixed(2)}</span>
      </div>
      <span className="shop-rating"><img src="/assets/shopping/star.svg" alt="Rating" />
        {product.rating == null ? '–' : Number(product.rating).toFixed(1)}
      </span>
    </article>
  )
}
