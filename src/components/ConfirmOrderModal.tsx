import orderConfirmedIcon from '../assets/images/icon-order-confirmed.svg'
import type { Product } from '../interfaces/product'

interface ConfirmOrderModalProps {
  isOpen: boolean
  items: Product[]
  onClose: () => void
}

export function ConfirmOrderModal({
  isOpen,
  items,
  onClose,
}: ConfirmOrderModalProps) {
  if (!isOpen) {
    return null
  }

  const orderTotal = items.reduce((total, item) => total + item.price, 0)

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-[60] grid place-items-end bg-black/35 p-0 sm:place-items-center sm:p-6"
      role="dialog"
    >
      <section className="w-full max-w-md rounded-t-3xl bg-white p-6 shadow-2xl sm:rounded-lg sm:p-8">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <img src={orderConfirmedIcon} alt="" className="mb-6 size-12" />
            <h2 className="text-[2.5rem] font-bold leading-[1.05] text-[#260f08]">
              Order Confirmed
            </h2>
            <p className="mt-3 text-sm font-medium text-[#87635a]">
              We hope you enjoy your food!
            </p>
          </div>

          <button
            type="button"
            aria-label="Close order confirmation"
            onClick={onClose}
            className="grid size-10 shrink-0 place-items-center rounded-full border border-[#ead8d1] text-[#87635a] transition hover:border-[#c73b0f] hover:text-[#c73b0f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c73b0f]"
          >
            x
          </button>
        </div>

        <div className="rounded-lg bg-[#fcf8f6] p-4">
          <ul className="divide-y divide-[#ead8d1]">
            {items.map((item) => (
              <li key={item.id} className="flex items-center gap-4 py-4 first:pt-0">
                <img
                  src={item.image}
                  alt=""
                  className="size-14 rounded-md object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-[#260f08]">
                    {item.name}
                  </p>
                  <p className="mt-1 text-sm">
                    <span className="font-bold text-[#c73b0f]">1x</span>
                    <span className="ml-3 font-medium text-[#87635a]">
                      @ ${item.price.toFixed(2)}
                    </span>
                  </p>
                </div>
                <p className="text-sm font-bold text-[#260f08]">
                  ${item.price.toFixed(2)}
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
          onClick={onClose}
          className="mt-7 h-12 w-full rounded-full bg-[#c73b0f] px-6 text-sm font-bold text-white transition hover:bg-[#952c0c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c73b0f]"
        >
          Start New Order
        </button>
      </section>
    </div>
  )
}
