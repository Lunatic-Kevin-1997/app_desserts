import { Link } from 'react-router-dom'
import type { Product } from '../interfaces/product'
import { useCartStore } from '../stores/cart.store'
import { QuantityStepper } from './QuantityStepper'

interface ProductCardProps {
  product: Product
  categoryName: string
}

export function ProductCard({ product, categoryName }: ProductCardProps) {
  const quantity = useCartStore(
    (state) =>
      state.items.find((item) => item.product.id === product.id)?.quantity ?? 0,
  )
  const addItem = useCartStore((state) => state.addItem)
  const increaseQuantity = useCartStore((state) => state.increaseQuantity)
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)

  return (
    <article className="group">
      <div className="relative mb-[38px] overflow-visible rounded-lg">
        <Link to={`/producto/${product.id}`} aria-label={`View ${product.name}`}>
          <img
            src={product.image}
            alt={product.name}
            className="aspect-[251/240] w-full rounded-lg border-2 border-transparent object-cover transition duration-300 group-hover:scale-[1.01] group-hover:border-[#c73b0f] group-hover:shadow-[0_14px_32px_rgba(199,59,15,0.18)]"
          />
        </Link>

        <div className="absolute inset-x-0 -bottom-6 flex justify-center">
          <QuantityStepper
            productName={product.name}
            quantity={quantity}
            onAdd={() => addItem(product)}
            onIncrease={() => increaseQuantity(product.id)}
            onDecrease={() => decreaseQuantity(product.id)}
          />
        </div>
      </div>

      <div>
        <span className="inline-flex rounded-full bg-[#f4e8e3] px-2.5 py-1 text-xs font-semibold text-[#87635a]">
          {categoryName}
        </span>
        <h2 className="mt-1 text-base font-semibold leading-tight text-[#260f08]">
          <Link
            to={`/producto/${product.id}`}
            className="transition hover:text-[#c73b0f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c73b0f]"
          >
            {product.name}
          </Link>
        </h2>
        <p className="mt-1 text-base font-semibold text-[#c73b0f]">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </article>
  )
}
