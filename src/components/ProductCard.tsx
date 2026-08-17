import type { Product } from '../interfaces/product'
import { QuantityStepper } from './QuantityStepper'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group">
      <div className="relative mb-9 overflow-visible rounded-lg">
        <div className="aspect-[4/3] overflow-hidden rounded-lg bg-[#f5eee9] shadow-sm">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.04]"
          />
        </div>

        <div className="absolute inset-x-0 -bottom-6 flex justify-center">
          <QuantityStepper productName={product.name} />
        </div>
      </div>

      <div className="space-y-1">
        <p className="text-sm font-medium text-[#87635a]">{product.category}</p>
        <h2 className="text-base font-bold leading-snug text-[#260f08]">
          {product.name}
        </h2>
        <p className="text-base font-bold text-[#c73b0f]">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </article>
  )
}
