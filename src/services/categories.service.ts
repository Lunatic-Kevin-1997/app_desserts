import type { Category } from '../interfaces/category'
import { api } from './api'

export async function getCategories() {
  const response = await api.get<Category[]>('/categories', {
    params: { _sort: 'name' },
  })

  return response.data
}
