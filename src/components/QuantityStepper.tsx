import { Minus, Plus, ShoppingCart } from 'lucide-react'

interface QuantityStepperProps {
  productName: string
  quantity?: number
}

export function QuantityStepper({
  productName,
  quantity = 0,
}: QuantityStepperProps) {
  if (quantity > 0) {
    return (
      <div className="flex h-11 min-w-40 items-center justify-between rounded-full bg-[#c73b0f] px-3 text-white shadow-[0_12px_28px_rgba(199,59,15,0.24)]">
        <button
          type="button"
          aria-label={`Decrease ${productName} quantity`}
          className="grid size-5 place-items-center rounded-full border border-white transition hover:bg-white hover:text-[#c73b0f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <Minus aria-hidden="true" size={13} strokeWidth={3} />
        </button>
        <span className="min-w-6 text-center text-sm font-bold">
          {quantity}
        </span>
        <button
          type="button"
          aria-label={`Increase ${productName} quantity`}
          className="grid size-5 place-items-center rounded-full border border-white transition hover:bg-white hover:text-[#c73b0f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <Plus aria-hidden="true" size={13} strokeWidth={3} />
        </button>
      </div>
    )
  }

  return (
    <button
      type="button"
      aria-label={`Add ${productName} to cart`}
      className="inline-flex h-11 min-w-40 items-center justify-center gap-2 rounded-full border border-[#ad8a85] bg-white px-5 text-sm font-bold text-[#260f08] shadow-sm transition hover:border-[#c73b0f] hover:text-[#c73b0f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c73b0f]"
    >
      <ShoppingCart aria-hidden="true" size={18} className="text-[#c73b0f]" />
      Add to Cart
    </button>
  )
}
