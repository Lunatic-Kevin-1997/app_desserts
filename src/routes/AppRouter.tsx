import { Route, Routes } from 'react-router-dom'
import { NotFoundPage } from '../pages/NotFoundPage'
import { CreateProductPage } from '../pages/CreateProductPage'
import { EditProductPage } from '../pages/EditProductPage'
import { ProductDetailPage } from '../pages/ProductDetailPage'
import { ProductsAdminPage } from '../pages/ProductsAdminPage'
import { ProductsPage } from '../pages/ProductsPage'

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<ProductsPage />} />
      <Route path="/producto/:id" element={<ProductDetailPage />} />
      <Route path="/admin/productos" element={<ProductsAdminPage />} />
      <Route path="/admin/productos/nuevo" element={<CreateProductPage />} />
      <Route
        path="/admin/productos/:id/editar"
        element={<EditProductPage />}
      />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
