import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { getCategories } from '../services/categories.service'
import {
  getProductById,
  getProducts,
  type ProductsFilters,
} from '../services/products.service'

export const PRODUCTS_QUERY_KEY = ['products'] as const
export const CATEGORIES_QUERY_KEY = ['categories'] as const

export function useProductsQuery(filters: ProductsFilters) {
  return useQuery({
    queryKey: [...PRODUCTS_QUERY_KEY, filters],
    queryFn: () => getProducts(filters),
    placeholderData: keepPreviousData,
  })
}

export function useProductQuery(id: string) {
  return useQuery({
    queryKey: [...PRODUCTS_QUERY_KEY, id],
    queryFn: () => getProductById(id),
    retry: false,
    enabled: Boolean(id),
  })
}

export function useCategoriesQuery() {
  return useQuery({
    queryKey: CATEGORIES_QUERY_KEY,
    queryFn: getCategories,
  })
}
