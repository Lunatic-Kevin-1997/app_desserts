interface HeaderProps {
  cartCount: number
  onOpenCart: () => void
}

export function Header({ cartCount, onOpenCart }: HeaderProps) {
  return (
    <header className="mb-8 flex items-center justify-between gap-4 lg:mb-8">
      <h1
        id="desserts-title"
        className="text-[2.5rem] font-bold leading-none text-[#260f08]"
      >
        Desserts
      </h1>

      <button
        type="button"
        onClick={onOpenCart}
        className="rounded-full bg-[#c73b0f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#952c0c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c73b0f] lg:hidden"
      >
        Your Cart ({cartCount})
      </button>
    </header>
  )
}
