import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import ItemDetails from './pages/ItemDetails.jsx'
import { Provider } from './components/ui/provider.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <Provider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/item/:id" element={<ItemDetails />} />
      </Routes>
      </Provider>
    </BrowserRouter>
  )
}
