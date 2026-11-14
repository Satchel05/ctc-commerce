import { Badge, IconButton, Image } from '@chakra-ui/react'
import { LuHeart, LuStar } from 'react-icons/lu'

export default function ProductCard({ product, liked, onToggleLike }) {
  return (
    <div className="rounded-xl bg-white p-3">
      <div className="relative">
        <Image
          src={product.thumbnail_url}
          alt={product.name}
          className="aspect-square w-full rounded-lg object-cover"
        />
        <IconButton
          aria-label="Favorite"
          variant="ghost"
          size="sm"
          className="absolute right-1 top-1"
          onClick={() => onToggleLike(product.id)}
        >
          <LuHeart fill={liked ? 'currentColor' : 'none'} />
        </IconButton>
      </div>

      <div className="mt-2 flex justify-between text-sm">
        <span>{product.name}</span>
        <span>${Number(product.price).toFixed(2)}</span>
      </div>

      <Badge variant="outline" className="mt-1">
        <LuStar className="text-yellow-400" fill="currentColor" />
        {product.rating ?? '-'}
      </Badge>
    </div>
  )
}