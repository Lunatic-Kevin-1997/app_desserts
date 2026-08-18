import carbonNeutralIcon from '../assets/images/icon-carbon-neutral.svg'
import emptyCartIllustration from '../assets/images/illustration-empty-cart.svg'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  onOpenConfirmation: () => void
}

export function CartDrawer({
  isOpen,
  onClose,
  onOpenConfirmation,
}: CartDrawerProps) {
  return (
    <>
      <button
        type="button"
        aria-label="Close cart drawer"
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-black/35 transition lg:hidden ${
          isOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
      />

      <aside
        aria-label="Shopping cart"
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm overflow-y-auto bg-white p-6 shadow-2xl transition duration-300 sm:max-w-md lg:sticky lg:top-[88px] lg:z-auto lg:h-fit lg:max-h-none lg:max-w-none lg:translate-x-0 lg:rounded-xl lg:shadow-none ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="mb-8 flex items-center justify-between gap-4 lg:mb-9">
          <h2 className="text-2xl font-bold text-[#c73b0f]">Your Cart (0)</h2>
          <button
            type="button"
            aria-label="Close cart drawer"
            onClick={onClose}
            className="grid size-10 place-items-center rounded-full border border-[#ead8d1] text-[#87635a] transition hover:border-[#c73b0f] hover:text-[#c73b0f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c73b0f] lg:hidden"
          >
            x
          </button>
        </div>

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

        <button
          type="button"
          onClick={onOpenConfirmation}
          className="mt-8 hidden h-[53px] w-full rounded-full bg-[#c73b0f] text-base font-semibold text-white transition hover:bg-[#952c0c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c73b0f]"
        >
          Confirm Order
        </button>

        <div className="mt-6 hidden items-center justify-center gap-2 rounded-lg bg-[#fcf8f6] px-4 py-4 text-sm">
          <img src={carbonNeutralIcon} alt="" className="size-5" />
          <p>
            This is a <span className="font-semibold">carbon-neutral</span>{' '}
            delivery
          </p>
        </div>
      </aside>
    </>
  )
}
