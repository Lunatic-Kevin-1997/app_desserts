import type { Product } from '../interfaces/product'
import { api } from './api'

export interface ProductsFilters {
  search?: string
  category?: string
}

const delay = (milliseconds: number) =>
  new Promise((resolve) => {
    window.setTimeout(resolve, milliseconds)
  })

export async function getProducts(filters: ProductsFilters = {}) {
  await delay(1200)

  const params: Record<string, string> = {}
  const search = filters.search?.trim()

  if (search) {
    params['name:contains'] = search
  }

  if (filters.category) {
    params.category = filters.category
  }

  const response = await api.get<Product[]>('/products', { params })

  return response.data
}

export async function getProductById(id: string) {
  await delay(1200)

  const response = await api.get<Product>(`/products/${id}`)

  return response.data
}

export async function getProductCategories() {
  const response = await api.get<Product[]>('/products')
  const categories = response.data.map((product) => product.category)

  return Array.from(new Set(categories))
}
