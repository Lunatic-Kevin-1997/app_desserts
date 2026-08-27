import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { ProductSkeleton } from '../components/ProductSkeleton'
import { QuantityStepper } from '../components/QuantityStepper'
import {
  useCategoriesQuery,
  useProductQuery,
} from '../hooks/useProductsQueries'
import { useCartStore } from '../stores/cart.store'

export function ProductDetailPage() {
  const { id } = useParams()
  const productId = id ?? ''
  const productQuery = useProductQuery(productId)
  const categoriesQuery = useCategoriesQuery()
  const quantity = useCartStore(
    (state) =>
      state.items.find((item) => item.product.id === productId)?.quantity ?? 0,
  )
  const addItem = useCartStore((state) => state.addItem)
  const increaseQuantity = useCartStore((state) => state.increaseQuantity)
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)

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
  const categoryName =
    categoriesQuery.data?.find(
      (category) => category.id === product.categoryId,
    )?.name ?? 'Uncategorized'

  return (
    <main className="min-h-screen bg-[#fcf8f6] px-6 py-10 text-[#260f08] sm:px-10 lg:py-[88px]">
      <article className="mx-auto grid max-w-4xl gap-8 rounded-xl bg-white p-6 sm:grid-cols-[minmax(0,320px)_1fr] sm:p-8">
        <img
          src={product.image}
          alt={product.name}
          className="aspect-square w-full rounded-lg object-cover"
        />

        <div className="flex flex-col justify-center">
          <span className="w-fit rounded-full bg-[#f4e8e3] px-3 py-1 text-xs font-semibold text-[#87635a]">
            {categoryName}
          </span>
          <h1 className="mt-2 text-4xl font-bold leading-tight">
            {product.name}
          </h1>
          <p className="mt-4 text-2xl font-bold text-[#c73b0f]">
            ${product.price.toFixed(2)}
          </p>
          <p className="mt-5 text-base leading-7 text-[#87635a]">
            {product.description}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <QuantityStepper
              productName={product.name}
              quantity={quantity}
              onAdd={() => addItem(product)}
              onIncrease={() => increaseQuantity(product.id)}
              onDecrease={() => decreaseQuantity(product.id)}
            />
            <Link
              to={`/admin/productos/${product.id}/editar`}
              className="inline-flex h-11 items-center justify-center rounded-full border border-[#ad8a85] px-5 text-sm font-semibold transition hover:border-[#c73b0f] hover:text-[#c73b0f]"
            >
              Edit product
            </Link>
          </div>
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
