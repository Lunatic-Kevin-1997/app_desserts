import type {
  PaginatedProducts,
  Product,
  ProductInput,
} from '../interfaces/product'
import { api } from './api'

export interface ProductsFilters {
  search?: string
  categoryId?: string
  page?: number
  perPage?: number
}

const delay = (milliseconds: number) =>
  new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds)
  })

export async function getProducts(filters: ProductsFilters = {}) {
  await delay(1200)

  const params: Record<string, string | number> = {
    _page: filters.page ?? 1,
    _per_page: filters.perPage ?? 8,
  }
  const search = filters.search?.trim()

  if (search) {
    params['name:contains'] = search
  }

  if (filters.categoryId) {
    params.categoryId = filters.categoryId
  }

  const response = await api.get<PaginatedProducts>('/products', { params })

  return response.data
}

export async function getProductById(id: string) {
  await delay(1200)

  const response = await api.get<Product>(`/products/${id}`)

  return response.data
}

export async function createProduct(product: ProductInput) {
  const response = await api.post<Product>('/products', product)

  return response.data
}

export async function updateProduct(id: string, product: ProductInput) {
  const response = await api.put<Product>(`/products/${id}`, product)

  return response.data
}

export async function deleteProduct(id: string) {
  await api.delete(`/products/${id}`)

  return id
}
