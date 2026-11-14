import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import LikeScreen from './pages/LikeScreen.jsx'
import ItemDetails from './pages/ItemDetails.jsx'
import ShoppingCart from './pages/ShoppingCart.jsx'
import { Provider } from './components/ui/provider.jsx'
import { useState } from 'react'
import useCatalog from './lib/useCatalog.js'


export default function App() {
  const catalog = useCatalog()
  const [inspectedItem, setInspectedItem] = useState(null)
  const [cartItems, setCartItems] = useState([])

  return (
    <BrowserRouter>
      <Provider>
      <Routes>
        <Route path="/" element={<Home {...catalog} setInspectedItem={setInspectedItem} />} />
        <Route path="/liked" element={<LikeScreen {...catalog} />} />
        <Route path="/item/:id" element={<ItemDetails item={inspectedItem} setCartItems={setCartItems}/>} />
        <Route path="/shoppingcart" element={<ShoppingCart cartItems={cartItems} setCartItems={setCartItems} />} />
      </Routes>
      </Provider>
    </BrowserRouter>
  )
}
