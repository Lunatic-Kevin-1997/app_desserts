import type { Product } from '../interfaces/product'

interface DeleteProductModalProps {
  product: Product | null
  isDeleting: boolean
  onCancel: () => void
  onConfirm: () => void
}

export function DeleteProductModal({
  product,
  isDeleting,
  onCancel,
  onConfirm,
}: DeleteProductModalProps) {
  if (!product) {
    return null
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-product-title"
      className="fixed inset-0 z-[70] grid place-items-center bg-black/45 p-6"
    >
      <section className="w-full max-w-md rounded-lg bg-white p-6 shadow-2xl sm:p-8">
        <h2 id="delete-product-title" className="text-2xl font-bold">
          Delete product?
        </h2>
        <p className="mt-3 text-sm leading-6 text-[#87635a]">
          <span className="font-semibold text-[#260f08]">{product.name}</span>{' '}
          will be permanently removed from the local API.
        </p>
        <div className="mt-7 grid grid-cols-2 gap-3">
          <button
            type="button"
            disabled={isDeleting}
            onClick={onCancel}
            className="h-11 cursor-pointer rounded-full border border-[#ad8a85] text-sm font-semibold transition hover:border-[#260f08] disabled:cursor-not-allowed disabled:opacity-60"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={isDeleting}
            onClick={onConfirm}
            className="h-11 cursor-pointer rounded-full bg-[#c73b0f] text-sm font-semibold text-white transition hover:bg-[#952c0c] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </section>
    </div>
  )
}
