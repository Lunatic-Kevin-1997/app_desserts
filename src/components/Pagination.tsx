interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null
  }

  return (
    <nav
      aria-label="Product pagination"
      className="mt-10 flex items-center justify-center gap-2 sm:gap-4"
    >
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="h-11 cursor-pointer rounded-full border border-[#ad8a85] bg-white px-4 text-sm font-semibold transition hover:border-[#c73b0f] hover:text-[#c73b0f] disabled:cursor-not-allowed disabled:opacity-40 sm:px-5"
      >
        <span className="sm:hidden">Prev</span>
        <span className="hidden sm:inline">Previous</span>
      </button>
      <p className="min-w-16 text-center text-sm font-semibold text-[#87635a] sm:min-w-28">
        <span className="sm:hidden">
          {currentPage} / {totalPages}
        </span>
        <span className="hidden sm:inline">
          Page {currentPage} of {totalPages}
        </span>
      </p>
      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="h-11 cursor-pointer rounded-full border border-[#ad8a85] bg-white px-4 text-sm font-semibold transition hover:border-[#c73b0f] hover:text-[#c73b0f] disabled:cursor-not-allowed disabled:opacity-40 sm:px-5"
      >
        Next
      </button>
    </nav>
  )
}
