export interface Product {
  id: string
  name: string
  categoryId: string
  price: number
  image: string
  description: string
}

export type ProductInput = Omit<Product, 'id'>

export interface PaginatedProducts {
  first: number
  prev: number | null
  next: number | null
  last: number
  pages: number
  items: number
  data: Product[]
}
