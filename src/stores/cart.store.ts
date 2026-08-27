import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem } from '../interfaces/cart'
import type { Product } from '../interfaces/product'

interface CartStore {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  increaseQuantity: (productId: string) => void
  decreaseQuantity: (productId: string) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotal: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) =>
        set((state) => {
          const existingItem = state.items.find(
            (item) => item.product.id === product.id,
          )

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              ),
            }
          }

          return { items: [...state.items, { product, quantity: 1 }] }
        }),
      removeItem: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.product.id !== productId),
        })),
      increaseQuantity: (productId) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        })),
      decreaseQuantity: (productId) =>
        set((state) => ({
          items: state.items.flatMap((item) => {
            if (item.product.id !== productId) {
              return item
            }

            return item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : []
          }),
        })),
      clearCart: () => set({ items: [] }),
      getTotalItems: () =>
        get().items.reduce((total, item) => total + item.quantity, 0),
      getTotal: () =>
        get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0,
        ),
    }),
    {
      name: 'desserts-cart',
      partialize: (state) => ({ items: state.items }),
    },
  ),
)
