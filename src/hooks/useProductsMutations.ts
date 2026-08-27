import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { ProductInput } from '../interfaces/product'
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from '../services/products.service'
import { PRODUCTS_QUERY_KEY } from './useProductsQueries'

export function useCreateProductMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createProduct,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY })
      toast.success('Producto creado correctamente')
    },
    onError: () => toast.error('No se pudo crear el producto'),
  })
}

export function useUpdateProductMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, product }: { id: string; product: ProductInput }) =>
      updateProduct(id, product),
    onSuccess: async (product) => {
      await queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY })
      await queryClient.invalidateQueries({
        queryKey: [...PRODUCTS_QUERY_KEY, product.id],
      })
      toast.success('Producto editado correctamente')
    },
    onError: () => toast.error('No se pudo editar el producto'),
  })
}

export function useDeleteProductMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: deleteProduct,
    onSuccess: async (productId) => {
      queryClient.removeQueries({
        queryKey: [...PRODUCTS_QUERY_KEY, productId],
      })
      await queryClient.invalidateQueries({ queryKey: PRODUCTS_QUERY_KEY })
      toast.success('Producto eliminado correctamente')
    },
    onError: () => toast.error('No se pudo eliminar el producto'),
  })
}
