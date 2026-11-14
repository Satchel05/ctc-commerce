import { Link } from 'react-router-dom'

export default function BottomNav({ onFavorites, favoritesOnly }) {
  return (
    <nav className="shop-nav" aria-label="Main navigation">
      <button type="button" aria-label="Favorites" aria-pressed={favoritesOnly} onClick={onFavorites}>
        <img src="/assets/shopping/heart.svg" alt="" />
      </button>
      <Link to="/" aria-label="Home" onClick={() => favoritesOnly && onFavorites()}><img src="/assets/shopping/house.svg" alt="" /></Link>
      <Link to="/shoppingcart" aria-label="Cart"><img src="/assets/shopping/cart.svg" alt="" /></Link>
      <span aria-label="Profile"><img src="/assets/shopping/user.svg" alt="" /></span>
    </nav>
  )
}
