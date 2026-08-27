import type { Category } from '../interfaces/category'

interface SearchAndFilterProps {
  search: string
  categoryId: string
  categories: Category[]
  isFetching: boolean
  onSearchChange: (value: string) => void
  onCategoryChange: (value: string) => void
}

export function SearchAndFilter({
  search,
  categoryId,
  categories,
  isFetching,
  onSearchChange,
  onCategoryChange,
}: SearchAndFilterProps) {
  return (
    <div className="mb-8 grid gap-3 rounded-xl bg-white p-4 sm:grid-cols-[minmax(0,1fr)_220px]">
      <label className="sr-only" htmlFor="product-search">
        Search by name
      </label>
      <input
        id="product-search"
        type="search"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Search dessert"
        className="h-12 w-full rounded-lg border border-[#ead8d1] bg-[#fcf8f6] px-4 text-sm font-medium text-[#260f08] outline-none transition placeholder:text-[#ad8a85] hover:border-[#c73b0f] focus:border-[#c73b0f] focus:bg-white"
      />

      <label className="sr-only" htmlFor="category-filter">
        Filter by category
      </label>
      <select
        id="category-filter"
        value={categoryId}
        onChange={(event) => onCategoryChange(event.target.value)}
        className="h-12 w-full cursor-pointer rounded-lg border border-[#ead8d1] bg-[#fcf8f6] px-4 text-sm font-medium text-[#260f08] outline-none transition hover:border-[#c73b0f] focus:border-[#c73b0f] focus:bg-white"
      >
        <option value="">All categories</option>
        {categories.map((item) => (
          <option key={item.id} value={item.id}>
            {item.name}
          </option>
        ))}
      </select>

      {isFetching ? (
        <p className="text-sm font-medium text-[#87635a] sm:col-span-2">
          Loading results...
        </p>
      ) : null}
    </div>
  )
}
