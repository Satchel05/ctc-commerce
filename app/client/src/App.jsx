import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import ItemDetails from './pages/ItemDetails.jsx'
import ShoppingCart from './pages/ShoppingCart.jsx'

import { Provider } from './components/ui/provider.jsx'
import { useState } from 'react'


export default function App() {

  const [inspectedItem, setInspectedItem] = useState(null)
  const [cartItems, setCartItems] = useState([])

  return (
    <BrowserRouter>
      <Provider>
      <Routes>
        <Route path="/" element={<Home setInspectedItem={setInspectedItem} />} />
        <Route path="/item/:id" element={<ItemDetails item={inspectedItem} setCartItems={setCartItems}/>} />
        <Route path="/shoppingcart" element={<ShoppingCart cartItems={cartItems} setCartItems={setCartItems} />} />
      </Routes>
      </Provider>
    </BrowserRouter>
  )
}
