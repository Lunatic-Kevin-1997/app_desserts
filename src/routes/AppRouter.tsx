import { Route, Routes } from 'react-router-dom'
import { NotFoundPage } from '../pages/NotFoundPage'
import { ProductDetailPage } from '../pages/ProductDetailPage'
import { ProductsPage } from '../pages/ProductsPage'

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<ProductsPage />} />
      <Route path="/producto/:id" element={<ProductDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
