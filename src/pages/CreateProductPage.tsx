import { Link, useNavigate } from 'react-router-dom'
import { ProductForm } from '../components/ProductForm'
import { useCreateProductMutation } from '../hooks/useProductsMutations'
import { useCategoriesQuery } from '../hooks/useProductsQueries'
import type { ProductFormValues } from '../schemas/product.schema'

const DEFAULT_VALUES: ProductFormValues = {
  name: '',
  categoryId: '',
  price: 0,
  image: '',
  description: '',
}

export function CreateProductPage() {
  const navigate = useNavigate()
  const categoriesQuery = useCategoriesQuery()
  const createMutation = useCreateProductMutation()

  const handleSubmit = async (values: ProductFormValues) => {
    try {
      await createMutation.mutateAsync(values)
      navigate('/admin/productos')
    } catch {
      // The mutation displays the API error toast.
    }
  }

  return (
    <main className="min-h-screen bg-[#fcf8f6] px-6 py-10 text-[#260f08] sm:px-10 lg:py-16">
      <div className="mx-auto max-w-2xl">
        <Link
          to="/admin/productos"
          className="text-sm font-semibold text-[#87635a] transition hover:text-[#c73b0f]"
        >
          Back to product management
        </Link>
        <h1 className="mt-4 text-4xl font-bold">Create product</h1>
        <p className="mt-2 text-sm text-[#87635a]">
          Add a new dessert to the json-server catalog.
        </p>

        <section className="mt-8 rounded-lg bg-white p-6 sm:p-8">
          {categoriesQuery.isPending ? (
            <p className="text-sm font-semibold text-[#87635a]">
              Loading categories...
            </p>
          ) : null}

          {categoriesQuery.isError ? (
            <div className="text-center">
              <p className="text-sm font-semibold text-[#c73b0f]">
                We could not load the categories.
              </p>
              <button
                type="button"
                onClick={() => categoriesQuery.refetch()}
                className="mt-4 h-10 cursor-pointer rounded-full border border-[#c73b0f] px-5 text-sm font-semibold text-[#c73b0f]"
              >
                Try again
              </button>
            </div>
          ) : null}

          {categoriesQuery.isSuccess ? (
            <ProductForm
              categories={categoriesQuery.data}
              defaultValues={DEFAULT_VALUES}
              isSubmitting={createMutation.isPending}
              submitLabel="Create product"
              onSubmit={handleSubmit}
            />
          ) : null}
        </section>
      </div>
    </main>
  )
}
