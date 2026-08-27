import { useMemo, useState } from 'react'
import { CartDrawer } from '../components/CartDrawer'
import { ConfirmOrderModal } from '../components/ConfirmOrderModal'
import { Header } from '../components/Header'
import { Pagination } from '../components/Pagination'
import { ProductCard } from '../components/ProductCard'
import { ProductSkeleton } from '../components/ProductSkeleton'
import { SearchAndFilter } from '../components/SearchAndFilter'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import {
  useCategoriesQuery,
  useProductsQuery,
} from '../hooks/useProductsQueries'
import type { CartItem } from '../interfaces/cart'
import { useCartStore } from '../stores/cart.store'

const PRODUCTS_PER_PAGE = 8

export function ProductsPage() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [confirmedItems, setConfirmedItems] = useState<CartItem[]>([])
  const [search, setSearch] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [page, setPage] = useState(1)
  const debouncedSearch = useDebouncedValue(search, 350)

  const cartItems = useCartStore((state) => state.items)
  const clearCart = useCartStore((state) => state.clearCart)
  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  )

  const productsQuery = useProductsQuery({
    search: debouncedSearch,
    categoryId,
    page,
    perPage: PRODUCTS_PER_PAGE,
  })
  const categoriesQuery = useCategoriesQuery()
  const products = productsQuery.data?.data ?? []
  const totalPages = productsQuery.data?.pages ?? 1
  const categories = categoriesQuery.data ?? []
  const categoryNames = useMemo(
    () =>
      new Map(
        (categoriesQuery.data ?? []).map((category) => [
          category.id,
          category.name,
        ]),
      ),
    [categoriesQuery.data],
  )

  const handleSearchChange = (value: string) => {
    setSearch(value)
    setPage(1)
  }

  const handleCategoryChange = (value: string) => {
    setCategoryId(value)
    setPage(1)
  }

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleConfirmOrder = () => {
    if (cartItems.length === 0) {
      return
    }

    setConfirmedItems(
      cartItems.map((item) => ({
        product: { ...item.product },
        quantity: item.quantity,
      })),
    )
    clearCart()
    setIsCartOpen(false)
    setIsConfirmModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-[#fcf8f6] text-[#260f08]">
      <main className="mx-auto grid w-full max-w-[1216px] grid-cols-1 gap-8 px-6 pb-12 pt-10 sm:px-10 lg:grid-cols-[minmax(0,800px)_384px] lg:items-start lg:gap-8 lg:px-0 lg:pb-20 lg:pt-[88px]">
        <section aria-labelledby="desserts-title">
          <Header cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />

          <SearchAndFilter
            search={search}
            categoryId={categoryId}
            categories={categories}
            isFetching={productsQuery.isFetching && !productsQuery.isPending}
            onSearchChange={handleSearchChange}
            onCategoryChange={handleCategoryChange}
          />

          {productsQuery.isPending ? (
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 8 }, (_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          ) : null}

          {productsQuery.isError ? (
            <div className="rounded-lg bg-white p-8 text-center">
              <h2 className="text-xl font-bold text-[#260f08]">
                We could not load desserts
              </h2>
              <p className="mt-2 text-sm font-medium text-[#87635a]">
                Start the local API with npm run api and try again.
              </p>
              <button
                type="button"
                onClick={() => productsQuery.refetch()}
                className="mt-5 h-11 cursor-pointer rounded-full bg-[#c73b0f] px-5 text-sm font-semibold text-white hover:bg-[#952c0c]"
              >
                Try again
              </button>
            </div>
          ) : null}

          {!productsQuery.isPending &&
          !productsQuery.isError &&
          products.length === 0 ? (
            <div className="rounded-lg bg-white p-8 text-center">
              <h2 className="text-xl font-bold text-[#260f08]">
                No desserts found
              </h2>
              <p className="mt-2 text-sm font-medium text-[#87635a]">
                Try another name or category.
              </p>
            </div>
          ) : null}

          {!productsQuery.isPending &&
          !productsQuery.isError &&
          products.length > 0 ? (
            <>
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    categoryName={
                      categoryNames.get(product.categoryId) ?? 'Uncategorized'
                    }
                  />
                ))}
              </div>
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </>
          ) : null}
        </section>

        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          onConfirmOrder={handleConfirmOrder}
        />
      </main>

      <ConfirmOrderModal
        isOpen={isConfirmModalOpen}
        items={confirmedItems}
        onStartNewOrder={() => {
          setIsConfirmModalOpen(false)
          setConfirmedItems([])
        }}
      />
    </div>
  )
}
