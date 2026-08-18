import { useQuery } from '@tanstack/react-query'
import {
  getProductById,
  getProductCategories,
  getProducts,
  type ProductsFilters,
} from '../services/products.service'

const PRODUCTS_QUERY_KEY = ['products'] as const

export function useProductsQuery(filters: ProductsFilters) {
  return useQuery({
    queryKey: [...PRODUCTS_QUERY_KEY, filters],
    queryFn: () => getProducts(filters),
  })
}

export function useProductQuery(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProductById(id),
    retry: false,
    enabled: Boolean(id),
  })
}

export function useProductCategoriesQuery() {
  return useQuery({
    queryKey: [...PRODUCTS_QUERY_KEY, 'categories'],
    queryFn: getProductCategories,
  })
}
