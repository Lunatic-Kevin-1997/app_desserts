import type { Product } from '../interfaces/product'
import { QuantityStepper } from './QuantityStepper'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group">
      <div className="relative mb-[38px] overflow-visible rounded-lg">
        <picture>
          <source media="(min-width: 1024px)" srcSet={product.image.desktop} />
          <source media="(min-width: 640px)" srcSet={product.image.tablet} />
          <img
            src={product.image.mobile}
            alt={product.name}
            className="aspect-[251/240] w-full rounded-lg object-cover transition duration-300 group-hover:brightness-[0.98]"
          />
        </picture>

        <div className="absolute inset-x-0 -bottom-6 flex justify-center">
          <QuantityStepper productName={product.name} />
        </div>
      </div>

      <div>
        <p className="text-sm text-[#ad8a85]">{product.category}</p>
        <h2 className="mt-1 text-base font-semibold leading-tight text-[#260f08]">
          {product.name}
        </h2>
        <p className="mt-1 text-base font-semibold text-[#c73b0f]">
          ${product.price.toFixed(2)}
        </p>
      </div>
    </article>
  )
}
