import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ProductForm } from '../components/ProductForm'
import { ProductSkeleton } from '../components/ProductSkeleton'
import { useUpdateProductMutation } from '../hooks/useProductsMutations'
import {
  useCategoriesQuery,
  useProductQuery,
} from '../hooks/useProductsQueries'
import type { ProductFormValues } from '../schemas/product.schema'

export function EditProductPage() {
  const { id = '' } = useParams()
  const navigate = useNavigate()
  const productQuery = useProductQuery(id)
  const categoriesQuery = useCategoriesQuery()
  const updateMutation = useUpdateProductMutation()

  const handleSubmit = async (values: ProductFormValues) => {
    try {
      await updateMutation.mutateAsync({ id, product: values })
      navigate('/admin/productos')
    } catch {
      // The mutation displays the API error toast.
    }
  }

  const isNotFound =
    productQuery.isError &&
    axios.isAxiosError(productQuery.error) &&
    productQuery.error.response?.status === 404

  return (
    <main className="min-h-screen bg-[#fcf8f6] px-6 py-10 text-[#260f08] sm:px-10 lg:py-16">
      <div className="mx-auto max-w-2xl">
        <Link
          to="/admin/productos"
          className="text-sm font-semibold text-[#87635a] transition hover:text-[#c73b0f]"
        >
          Back to product management
        </Link>
        <h1 className="mt-4 text-4xl font-bold">Edit product</h1>
        <p className="mt-2 text-sm text-[#87635a]">
          Update the dessert data stored in json-server.
        </p>

        <section className="mt-8 rounded-lg bg-white p-6 sm:p-8">
          {productQuery.isPending || categoriesQuery.isPending ? (
            <ProductSkeleton />
          ) : null}

          {isNotFound ? (
            <div className="text-center">
              <p className="text-sm font-bold uppercase text-[#c73b0f]">404</p>
              <h2 className="mt-2 text-xl font-bold">Product not found</h2>
            </div>
          ) : null}

          {(productQuery.isError && !isNotFound) || categoriesQuery.isError ? (
            <div className="text-center">
              <h2 className="text-xl font-bold">We could not load this form</h2>
              <p className="mt-2 text-sm text-[#87635a]">
                Check that the local API is running and try again.
              </p>
            </div>
          ) : null}

          {productQuery.isSuccess && categoriesQuery.isSuccess ? (
            <ProductForm
              key={productQuery.data.id}
              categories={categoriesQuery.data}
              defaultValues={{
                name: productQuery.data.name,
                categoryId: productQuery.data.categoryId,
                price: productQuery.data.price,
                image: productQuery.data.image,
                description: productQuery.data.description,
              }}
              isSubmitting={updateMutation.isPending}
              submitLabel="Save changes"
              onSubmit={handleSubmit}
            />
          ) : null}
        </section>
      </div>
    </main>
  )
}
