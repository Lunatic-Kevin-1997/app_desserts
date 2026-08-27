import addToCartIcon from '../assets/images/icon-add-to-cart.svg'
import decrementIcon from '../assets/images/icon-decrement-quantity.svg'
import incrementIcon from '../assets/images/icon-increment-quantity.svg'

interface QuantityStepperProps {
  productName: string
  quantity: number
  onAdd: () => void
  onIncrease: () => void
  onDecrease: () => void
}

export function QuantityStepper({
  productName,
  quantity,
  onAdd,
  onIncrease,
  onDecrease,
}: QuantityStepperProps) {
  if (quantity > 0) {
    return (
      <div className="flex h-11 w-40 items-center justify-between rounded-full bg-[#c73b0f] px-3 text-white">
        <button
          type="button"
          aria-label={`Decrease ${productName} quantity`}
          onClick={onDecrease}
          className="grid size-5 cursor-pointer place-items-center rounded-full border border-white transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <img src={decrementIcon} alt="" className="w-[10px]" />
        </button>
        <span className="min-w-6 text-center text-sm font-bold">
          {quantity}
        </span>
        <button
          type="button"
          aria-label={`Increase ${productName} quantity`}
          onClick={onIncrease}
          className="grid size-5 cursor-pointer place-items-center rounded-full border border-white transition hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <img src={incrementIcon} alt="" className="size-[10px]" />
        </button>
      </div>
    )
  }

  return (
    <button
      type="button"
      aria-label={`Add ${productName} to cart`}
      onClick={onAdd}
      className="inline-flex h-11 w-40 cursor-pointer items-center justify-center gap-2 rounded-full border border-[#ad8a85] bg-white text-sm font-semibold text-[#260f08] transition duration-200 hover:border-[#c73b0f] hover:bg-[#fff7f4] hover:text-[#c73b0f] hover:shadow-[0_10px_22px_rgba(199,59,15,0.14)] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c73b0f]"
    >
      <img src={addToCartIcon} alt="" className="size-5" />
      Add to Cart
    </button>
  )
}
