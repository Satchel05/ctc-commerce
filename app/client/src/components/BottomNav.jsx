import { NavLink } from 'react-router-dom'

export default function BottomNav() {
  return (
    <nav className="shop-nav" aria-label="Main navigation">
      <NavLink to="/liked" aria-label="Favorites">
        <img src="/assets/shopping/heart.svg" alt="" />
      </NavLink>
      <NavLink to="/" end aria-label="Home"><img src="/assets/shopping/house.svg" alt="" /></NavLink>
      <NavLink to="/shoppingcart" aria-label="Cart"><img src="/assets/shopping/cart.svg" alt="" /></NavLink>
      <span aria-label="Profile"><img src="/assets/shopping/user.svg" alt="" /></span>
    </nav>
  )
}
