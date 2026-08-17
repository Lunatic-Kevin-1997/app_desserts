import { ShoppingBag, X } from 'lucide-react'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
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
        className={`fixed inset-y-0 right-0 z-50 w-full max-w-sm overflow-y-auto bg-white p-6 shadow-2xl transition duration-300 lg:sticky lg:top-8 lg:z-0 lg:max-h-[calc(100vh-4rem)] lg:w-full lg:max-w-none lg:translate-x-0 lg:rounded-lg lg:shadow-sm ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="mb-8 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-black text-[#c73b0f]">Your Cart (0)</h2>
          <button
            type="button"
            aria-label="Close cart drawer"
            onClick={onClose}
            className="grid size-10 place-items-center rounded-full border border-[#ead8d1] text-[#87635a] transition hover:border-[#c73b0f] hover:text-[#c73b0f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c73b0f] lg:hidden"
          >
            <X aria-hidden="true" size={20} />
          </button>
        </div>

        <div className="grid min-h-72 place-items-center rounded-lg bg-[#fcf8f6] px-6 py-10 text-center">
          <div>
            <div className="mx-auto mb-6 grid size-32 place-items-center rounded-full bg-[#f4e4dc] text-[#c73b0f]">
              <ShoppingBag aria-hidden="true" size={58} strokeWidth={1.7} />
            </div>
            <p className="text-sm font-bold text-[#87635a]">
              Your added items will appear here
            </p>
          </div>
        </div>
      </aside>
    </>
  )
}
