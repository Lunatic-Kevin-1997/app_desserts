import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { ProductSkeleton } from '../components/ProductSkeleton'
import { useProductQuery } from '../hooks/useProductsQuery'

export function ProductDetailPage() {
  const { id } = useParams()
  const productId = id ?? ''
  const productQuery = useProductQuery(productId)

  if (!productId) {
    return <ProductNotFound />
  }

  if (productQuery.isPending) {
    return (
      <main className="min-h-screen bg-[#fcf8f6] px-6 py-10 text-[#260f08] sm:px-10 lg:py-[88px]">
        <div className="mx-auto max-w-3xl rounded-xl bg-white p-6">
          <ProductSkeleton />
        </div>
      </main>
    )
  }

  if (productQuery.isError) {
    if (
      axios.isAxiosError(productQuery.error) &&
      productQuery.error.response?.status === 404
    ) {
      return <ProductNotFound />
    }

    return (
      <main className="min-h-screen bg-[#fcf8f6] px-6 py-10 text-[#260f08] sm:px-10 lg:py-[88px]">
        <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 text-center">
          <h1 className="text-3xl font-bold">We could not load this product</h1>
          <p className="mt-3 text-sm font-medium text-[#87635a]">
            Check that the local API is running on http://localhost:3000.
          </p>
          <BackToProductsLink />
        </div>
      </main>
    )
  }

  const product = productQuery.data

  return (
    <main className="min-h-screen bg-[#fcf8f6] px-6 py-10 text-[#260f08] sm:px-10 lg:py-[88px]">
      <article className="mx-auto grid max-w-4xl gap-8 rounded-xl bg-white p-6 sm:grid-cols-[minmax(0,320px)_1fr] sm:p-8">
        <img
          src={product.image}
          alt={product.name}
          className="aspect-square w-full rounded-lg object-cover"
        />

        <div className="flex flex-col justify-center">
          <p className="text-sm font-medium text-[#ad8a85]">
            {product.category}
          </p>
          <h1 className="mt-2 text-4xl font-bold leading-tight">
            {product.name}
          </h1>
          <p className="mt-4 text-2xl font-bold text-[#c73b0f]">
            ${product.price.toFixed(2)}
          </p>
          <p className="mt-5 text-base leading-7 text-[#87635a]">
            {product.description}
          </p>
          <BackToProductsLink />
        </div>
      </article>
    </main>
  )
}

function ProductNotFound() {
  return (
    <main className="min-h-screen bg-[#fcf8f6] px-6 py-10 text-[#260f08] sm:px-10 lg:py-[88px]">
      <div className="mx-auto max-w-3xl rounded-xl bg-white p-8 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#c73b0f]">
          404
        </p>
        <h1 className="mt-3 text-3xl font-bold">Product not found</h1>
        <p className="mt-3 text-sm font-medium text-[#87635a]">
          The dessert you are looking for does not exist.
        </p>
        <BackToProductsLink />
      </div>
    </main>
  )
}

function BackToProductsLink() {
  return (
    <Link
      to="/"
      className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-[#c73b0f] px-6 text-sm font-semibold text-white transition hover:bg-[#952c0c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c73b0f]"
    >
      Back to desserts
    </Link>
  )
}
