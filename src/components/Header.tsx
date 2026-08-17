import { ReceiptText, ShoppingCart, Sparkles } from 'lucide-react'

interface HeaderProps {
  cartCount: number
  onOpenCart: () => void
  onOpenConfirmation: () => void
}

export function Header({
  cartCount,
  onOpenCart,
  onOpenConfirmation,
}: HeaderProps) {
  return (
    <header className="border-b border-[#f0e2dc] bg-white/85 backdrop-blur">
      <div className="mx-auto flex min-h-20 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
        <div className="flex items-center gap-3">
          <div className="grid size-11 place-items-center rounded-full bg-[#c73b0f] text-white shadow-[0_10px_26px_rgba(199,59,15,0.24)]">
            <Sparkles aria-hidden="true" size={22} strokeWidth={2.6} />
          </div>
          <div>
            <p className="text-xl font-black leading-tight text-[#260f08]">
              Desserts
            </p>
            <p className="text-sm font-medium text-[#87635a]">
              Small batch sweets
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            title="Open confirmation preview"
            aria-label="Open confirmation preview"
            onClick={onOpenConfirmation}
            className="grid size-11 place-items-center rounded-full border border-[#ead8d1] bg-white text-[#87635a] shadow-sm transition hover:border-[#c73b0f] hover:text-[#c73b0f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c73b0f]"
          >
            <ReceiptText aria-hidden="true" size={20} />
          </button>

          <button
            type="button"
            onClick={onOpenCart}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-[#c73b0f] bg-[#c73b0f] px-4 text-sm font-bold text-white shadow-[0_12px_30px_rgba(199,59,15,0.24)] transition hover:bg-[#952c0c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c73b0f]"
          >
            <ShoppingCart aria-hidden="true" size={18} />
            <span>Cart</span>
            <span className="grid min-w-6 place-items-center rounded-full bg-white/20 px-2 text-xs">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  )
}
