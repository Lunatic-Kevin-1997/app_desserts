import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { DeleteProductModal } from '../components/DeleteProductModal'
import { Pagination } from '../components/Pagination'
import { ProductSkeleton } from '../components/ProductSkeleton'
import { useDeleteProductMutation } from '../hooks/useProductsMutations'
import {
  useCategoriesQuery,
  useProductsQuery,
} from '../hooks/useProductsQueries'
import type { Product } from '../interfaces/product'

const PRODUCTS_PER_PAGE = 8

export function ProductsAdminPage() {
  const [page, setPage] = useState(1)
  const [productToDelete, setProductToDelete] = useState<Product | null>(null)
  const productsQuery = useProductsQuery({ page, perPage: PRODUCTS_PER_PAGE })
  const categoriesQuery = useCategoriesQuery()
  const deleteMutation = useDeleteProductMutation()
  const products = productsQuery.data?.data ?? []
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

  const handleDelete = async () => {
    if (!productToDelete) {
      return
    }

    try {
      await deleteMutation.mutateAsync(productToDelete.id)
      setProductToDelete(null)

      if (products.length === 1 && page > 1) {
        setPage((currentPage) => currentPage - 1)
      }
    } catch {
      // The mutation displays the API error toast.
    }
  }

  return (
    <main className="min-h-screen bg-[#fcf8f6] px-6 py-10 text-[#260f08] sm:px-10 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-col gap-5 border-b border-[#ead8d1] pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Link
              to="/"
              className="text-sm font-semibold text-[#87635a] transition hover:text-[#c73b0f]"
            >
              Back to store
            </Link>
            <h1 className="mt-3 text-4xl font-bold">Product management</h1>
            <p className="mt-2 text-sm text-[#87635a]">
              Create, review, edit and delete desserts from the local API.
            </p>
          </div>
          <Link
            to="/admin/productos/nuevo"
            className="inline-flex h-12 items-center justify-center rounded-full bg-[#c73b0f] px-6 text-sm font-bold text-white transition hover:bg-[#952c0c]"
          >
            Create product
          </Link>
        </header>

        {productsQuery.isPending || categoriesQuery.isPending ? (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 8 }, (_, index) => (
              <ProductSkeleton key={index} />
            ))}
          </div>
        ) : null}

        {productsQuery.isError || categoriesQuery.isError ? (
          <section className="mt-8 rounded-lg bg-white p-8 text-center">
            <h2 className="text-xl font-bold">We could not load the catalog</h2>
            <p className="mt-2 text-sm text-[#87635a]">
              Check that json-server is running and try again.
            </p>
            <button
              type="button"
              onClick={() => {
                productsQuery.refetch()
                categoriesQuery.refetch()
              }}
              className="mt-5 h-11 cursor-pointer rounded-full bg-[#c73b0f] px-5 text-sm font-semibold text-white hover:bg-[#952c0c]"
            >
              Try again
            </button>
          </section>
        ) : null}

        {!productsQuery.isPending &&
        !categoriesQuery.isPending &&
        !productsQuery.isError &&
        !categoriesQuery.isError ? (
          products.length > 0 ? (
            <>
              <div className="mt-8 overflow-x-auto rounded-lg bg-white">
                <table className="w-full min-w-[760px] border-collapse text-left">
                  <thead>
                    <tr className="border-b border-[#ead8d1] text-xs uppercase text-[#87635a]">
                      <th className="px-5 py-4 font-bold">Product</th>
                      <th className="px-5 py-4 font-bold">Category</th>
                      <th className="px-5 py-4 font-bold">Price</th>
                      <th className="px-5 py-4 text-right font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#ead8d1]">
                    {products.map((product) => (
                      <tr key={product.id} className="transition hover:bg-[#fffaf8]">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={product.image}
                              alt=""
                              className="size-12 rounded-md object-cover"
                            />
                            <span className="font-semibold">{product.name}</span>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <span className="inline-flex rounded-full bg-[#f4e8e3] px-2.5 py-1 text-xs font-semibold text-[#87635a]">
                            {categoryNames.get(product.categoryId) ??
                              'Uncategorized'}
                          </span>
                        </td>
                        <td className="px-5 py-4 font-semibold text-[#c73b0f]">
                          ${product.price.toFixed(2)}
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-2">
                            <Link
                              to={`/producto/${product.id}`}
                              className="inline-flex h-9 items-center rounded-full border border-[#ead8d1] px-4 text-xs font-semibold transition hover:border-[#c73b0f] hover:text-[#c73b0f]"
                            >
                              View
                            </Link>
                            <Link
                              to={`/admin/productos/${product.id}/editar`}
                              className="inline-flex h-9 items-center rounded-full border border-[#ead8d1] px-4 text-xs font-semibold transition hover:border-[#c73b0f] hover:text-[#c73b0f]"
                            >
                              Edit
                            </Link>
                            <button
                              type="button"
                              onClick={() => setProductToDelete(product)}
                              className="h-9 cursor-pointer rounded-full border border-[#c73b0f] px-4 text-xs font-semibold text-[#c73b0f] transition hover:bg-[#c73b0f] hover:text-white"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <Pagination
                currentPage={page}
                totalPages={productsQuery.data?.pages ?? 1}
                onPageChange={setPage}
              />
            </>
          ) : (
            <section className="mt-8 rounded-lg bg-white p-8 text-center">
              <h2 className="text-xl font-bold">There are no products yet</h2>
              <p className="mt-2 text-sm text-[#87635a]">
                Create the first dessert to add it to the catalog.
              </p>
            </section>
          )
        ) : null}
      </div>

      <DeleteProductModal
        product={productToDelete}
        isDeleting={deleteMutation.isPending}
        onCancel={() => setProductToDelete(null)}
        onConfirm={handleDelete}
      />
    </main>
  )
}
