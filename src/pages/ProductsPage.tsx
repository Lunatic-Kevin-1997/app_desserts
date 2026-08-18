import { useState } from 'react'
import { CartDrawer } from '../components/CartDrawer'
import { ConfirmOrderModal } from '../components/ConfirmOrderModal'
import { Header } from '../components/Header'
import { ProductCard } from '../components/ProductCard'
import { ProductSkeleton } from '../components/ProductSkeleton'
import { SearchAndFilter } from '../components/SearchAndFilter'
import {
  useProductCategoriesQuery,
  useProductsQuery,
} from '../hooks/useProductsQuery'

export function ProductsPage() {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')

  const productsQuery = useProductsQuery({ search, category })
  const categoriesQuery = useProductCategoriesQuery()
  const products = productsQuery.data ?? []
  const categories = categoriesQuery.data ?? []

  return (
    <div className="min-h-screen bg-[#fcf8f6] text-[#260f08]">
      <main className="mx-auto grid w-full max-w-[1216px] grid-cols-1 gap-8 px-6 pb-12 pt-10 sm:px-10 lg:grid-cols-[minmax(0,800px)_384px] lg:items-start lg:gap-8 lg:px-0 lg:pb-20 lg:pt-[88px]">
        <section aria-labelledby="desserts-title">
          <Header cartCount={0} onOpenCart={() => setIsCartOpen(true)} />

          <SearchAndFilter
            search={search}
            category={category}
            categories={categories}
            isFetching={productsQuery.isFetching && !productsQuery.isPending}
            onSearchChange={setSearch}
            onCategoryChange={setCategory}
          />

          {productsQuery.isPending ? (
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }, (_, index) => (
                <ProductSkeleton key={index} />
              ))}
            </div>
          ) : null}

          {productsQuery.isError ? (
            <div className="rounded-xl bg-white p-8 text-center">
              <h2 className="text-xl font-bold text-[#260f08]">
                We could not load desserts
              </h2>
              <p className="mt-2 text-sm font-medium text-[#87635a]">
                Start the local API with npm run api and try again.
              </p>
            </div>
          ) : null}

          {!productsQuery.isPending &&
          !productsQuery.isError &&
          products.length === 0 ? (
            <div className="rounded-xl bg-white p-8 text-center">
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
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddPreview={() => setIsCartOpen(true)}
                />
              ))}
            </div>
          ) : null}
        </section>

        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          onOpenConfirmation={() => setIsConfirmModalOpen(true)}
        />
      </main>

      <ConfirmOrderModal
        isOpen={isConfirmModalOpen}
        items={products.slice(0, 1)}
        onClose={() => setIsConfirmModalOpen(false)}
      />
    </div>
  )
}
