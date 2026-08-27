import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type { Category } from '../interfaces/category'
import {
  productSchema,
  type ProductFormValues,
} from '../schemas/product.schema'

interface ProductFormProps {
  categories: Category[]
  defaultValues: ProductFormValues
  isSubmitting: boolean
  submitLabel: string
  onSubmit: (values: ProductFormValues) => Promise<void>
}

export function ProductForm({
  categories,
  defaultValues,
  isSubmitting,
  submitLabel,
  onSubmit,
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues,
  })

  const inputClassName =
    'mt-2 h-12 w-full rounded-lg border border-[#ead8d1] bg-[#fcf8f6] px-4 text-sm text-[#260f08] outline-none transition hover:border-[#c73b0f] focus:border-[#c73b0f] focus:bg-white'

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
      <div>
        <label htmlFor="name" className="text-sm font-semibold">
          Product name
        </label>
        <input
          id="name"
          type="text"
          autoComplete="off"
          {...register('name')}
          className={inputClassName}
        />
        <FieldError message={errors.name?.message} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="categoryId" className="text-sm font-semibold">
            Category
          </label>
          <select
            id="categoryId"
            {...register('categoryId')}
            className={`${inputClassName} cursor-pointer`}
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <FieldError message={errors.categoryId?.message} />
        </div>

        <div>
          <label htmlFor="price" className="text-sm font-semibold">
            Price
          </label>
          <input
            id="price"
            type="number"
            min="0.01"
            step="0.01"
            {...register('price', { valueAsNumber: true })}
            className={inputClassName}
          />
          <FieldError message={errors.price?.message} />
        </div>
      </div>

      <div>
        <label htmlFor="image" className="text-sm font-semibold">
          Image path
        </label>
        <input
          id="image"
          type="text"
          autoComplete="off"
          placeholder="/products/waffle.svg"
          {...register('image')}
          className={inputClassName}
        />
        <FieldError message={errors.image?.message} />
      </div>

      <div>
        <label htmlFor="description" className="text-sm font-semibold">
          Description
        </label>
        <textarea
          id="description"
          rows={5}
          {...register('description')}
          className="mt-2 w-full resize-y rounded-lg border border-[#ead8d1] bg-[#fcf8f6] px-4 py-3 text-sm leading-6 text-[#260f08] outline-none transition hover:border-[#c73b0f] focus:border-[#c73b0f] focus:bg-white"
        />
        <FieldError message={errors.description?.message} />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="h-12 w-full cursor-pointer rounded-full bg-[#c73b0f] px-6 text-sm font-bold text-white transition hover:bg-[#952c0c] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? 'Saving...' : submitLabel}
      </button>
    </form>
  )
}

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null
  }

  return <p className="mt-1.5 text-sm font-medium text-[#c73b0f]">{message}</p>
}
