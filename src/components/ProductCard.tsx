import { Link } from 'react-router-dom'
import type { Product } from '../interfaces/product'
import { QuantityStepper } from './QuantityStepper'

interface ProductCardProps {
  product: Product
  onAddPreview: () => void
}

export function ProductCard({ product, onAddPreview }: ProductCardProps) {
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
            onAddPreview={onAddPreview}
          />
        </div>
      </div>

      <div>
        <p className="text-sm text-[#ad8a85]">{product.category}</p>
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
