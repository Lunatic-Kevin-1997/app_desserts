import orderConfirmedIcon from '../assets/images/icon-order-confirmed.svg'
import type { CartItem } from '../interfaces/cart'

interface ConfirmOrderModalProps {
  isOpen: boolean
  items: CartItem[]
  onStartNewOrder: () => void
}

export function ConfirmOrderModal({
  isOpen,
  items,
  onStartNewOrder,
}: ConfirmOrderModalProps) {
  if (!isOpen) {
    return null
  }

  const orderTotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  )

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-[60] grid place-items-end bg-black/45 p-0 sm:place-items-center sm:p-6"
      role="dialog"
    >
      <section className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-lg sm:p-10">
        <img src={orderConfirmedIcon} alt="" className="mb-6 size-12" />
        <h2 className="text-[2.5rem] font-bold leading-[1.05] text-[#260f08]">
          Order Confirmed
        </h2>
        <p className="mt-3 text-sm font-medium text-[#87635a]">
          We hope you enjoy your food!
        </p>

        <div className="mt-8 rounded-lg bg-[#fcf8f6] p-4">
          <ul className="divide-y divide-[#ead8d1]">
            {items.map(({ product, quantity }) => (
              <li key={product.id} className="flex items-center gap-4 py-4 first:pt-0">
                <img
                  src={product.image}
                  alt=""
                  className="size-14 rounded-md object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-[#260f08]">
                    {product.name}
                  </p>
                  <p className="mt-1 text-sm">
                    <span className="font-bold text-[#c73b0f]">
                      {quantity}x
                    </span>
                    <span className="ml-3 font-medium text-[#87635a]">
                      @ ${product.price.toFixed(2)}
                    </span>
                  </p>
                </div>
                <p className="text-sm font-bold text-[#260f08]">
                  ${(product.price * quantity).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-between pt-4">
            <p className="text-sm text-[#87635a]">Order Total</p>
            <p className="text-2xl font-black text-[#260f08]">
              ${orderTotal.toFixed(2)}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onStartNewOrder}
          className="mt-7 h-12 w-full cursor-pointer rounded-full bg-[#c73b0f] px-6 text-sm font-bold text-white transition hover:bg-[#952c0c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c73b0f]"
        >
          Start New Order
        </button>
      </section>
    </div>
  )
}
