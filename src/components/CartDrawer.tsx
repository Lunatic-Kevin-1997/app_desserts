import carbonNeutralIcon from '../assets/images/icon-carbon-neutral.svg'
import decrementIcon from '../assets/images/icon-decrement-quantity.svg'
import emptyCartIllustration from '../assets/images/illustration-empty-cart.svg'
import incrementIcon from '../assets/images/icon-increment-quantity.svg'
import removeItemIcon from '../assets/images/icon-remove-item.svg'
import { useCartStore } from '../stores/cart.store'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  onConfirmOrder: () => void
}

export function CartDrawer({
  isOpen,
  onClose,
  onConfirmOrder,
}: CartDrawerProps) {
  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)
  const increaseQuantity = useCartStore((state) => state.increaseQuantity)
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)
  const totalItems = items.reduce((total, item) => total + item.quantity, 0)
  const orderTotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  )

  return (
    <>
      <button
        type="button"
        aria-label="Close cart drawer"
        onClick={onClose}
        className={`fixed inset-0 z-40 cursor-pointer bg-black/35 transition lg:hidden ${
          isOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
      />

      <aside
        aria-label="Shopping cart"
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm overflow-y-auto bg-white p-6 shadow-2xl transition duration-300 sm:max-w-md lg:sticky lg:top-[88px] lg:z-auto lg:h-fit lg:max-h-[calc(100vh-112px)] lg:max-w-none lg:translate-x-0 lg:rounded-lg lg:shadow-none ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold text-[#c73b0f]">
            Your Cart ({totalItems})
          </h2>
          <button
            type="button"
            aria-label="Close cart drawer"
            onClick={onClose}
            className="grid size-10 cursor-pointer place-items-center rounded-full border border-[#ead8d1] text-[#87635a] transition hover:border-[#c73b0f] hover:text-[#c73b0f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c73b0f] lg:hidden"
          >
            &times;
          </button>
        </div>

        {items.length === 0 ? (
          <div className="pb-4 pt-2 text-center">
            <img
              src={emptyCartIllustration}
              alt=""
              className="mx-auto mb-4 w-32"
            />
            <p className="text-sm font-semibold text-[#87635a]">
              Your added items will appear here
            </p>
          </div>
        ) : (
          <>
            <ul className="divide-y divide-[#ead8d1]">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="py-4 first:pt-0">
                  <div className="flex items-center gap-3">
                    <img
                      src={product.image}
                      alt=""
                      className="size-12 rounded-md object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-[#260f08]">
                        {product.name}
                      </p>
                      <p className="mt-1 text-sm">
                        <span className="font-semibold text-[#c73b0f]">
                          {quantity}x
                        </span>
                        <span className="ml-2 text-[#ad8a85]">
                          @ ${product.price.toFixed(2)}
                        </span>
                        <span className="ml-2 font-semibold text-[#87635a]">
                          ${(product.price * quantity).toFixed(2)}
                        </span>
                      </p>
                    </div>
                    <button
                      type="button"
                      aria-label={`Remove ${product.name} from cart`}
                      onClick={() => removeItem(product.id)}
                      className="grid size-6 cursor-pointer place-items-center rounded-full border border-[#ad8a85] transition hover:border-[#260f08] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c73b0f]"
                    >
                      <img src={removeItemIcon} alt="" className="size-3" />
                    </button>
                  </div>

                  <div className="mt-3 flex items-center gap-3 pl-[60px]">
                    <button
                      type="button"
                      aria-label={`Decrease ${product.name} quantity`}
                      onClick={() => decreaseQuantity(product.id)}
                      className="grid size-7 cursor-pointer place-items-center rounded-full bg-[#c73b0f]"
                    >
                      <img src={decrementIcon} alt="" className="size-2.5" />
                    </button>
                    <span className="min-w-5 text-center text-sm font-bold">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      aria-label={`Increase ${product.name} quantity`}
                      onClick={() => increaseQuantity(product.id)}
                      className="grid size-7 cursor-pointer place-items-center rounded-full bg-[#c73b0f]"
                    >
                      <img src={incrementIcon} alt="" className="size-2.5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-between border-t border-[#ead8d1] py-6">
              <p className="text-sm">Order Total</p>
              <p className="text-2xl font-black">${orderTotal.toFixed(2)}</p>
            </div>

            <div className="flex items-center justify-center gap-2 rounded-lg bg-[#fcf8f6] px-4 py-4 text-sm">
              <img src={carbonNeutralIcon} alt="" className="size-5" />
              <p>
                This is a <span className="font-semibold">carbon-neutral</span>{' '}
                delivery
              </p>
            </div>

            <button
              type="button"
              onClick={onConfirmOrder}
              className="mt-6 h-[53px] w-full cursor-pointer rounded-full bg-[#c73b0f] text-base font-semibold text-white transition hover:bg-[#952c0c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c73b0f]"
            >
              Confirm Order
            </button>
          </>
        )}
      </aside>
    </>
  )
}
