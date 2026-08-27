import { Link } from 'react-router-dom'

interface HeaderProps {
  cartCount: number
  onOpenCart: () => void
}

export function Header({ cartCount, onOpenCart }: HeaderProps) {
  return (
    <header className="mb-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between lg:mb-8">
      <h1
        id="desserts-title"
        className="text-[2.5rem] font-bold leading-none text-[#260f08]"
      >
        Desserts
      </h1>

      <div className="flex w-full items-center gap-2 sm:w-auto">
        <Link
          to="/admin/productos"
          className="inline-flex h-11 min-w-0 flex-1 items-center justify-center rounded-full border border-[#ad8a85] bg-white px-3 text-center text-sm font-semibold text-[#260f08] transition hover:border-[#c73b0f] hover:text-[#c73b0f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c73b0f] sm:flex-none sm:px-4"
        >
          Manage products
        </Link>
        <button
          type="button"
          onClick={onOpenCart}
          className="h-11 shrink-0 cursor-pointer rounded-full bg-[#c73b0f] px-4 text-sm font-semibold text-white transition hover:bg-[#952c0c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c73b0f] lg:hidden"
        >
          Cart ({cartCount})
        </button>
      </div>
    </header>
  )
}
