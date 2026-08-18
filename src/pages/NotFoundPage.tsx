import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#fcf8f6] px-6 text-center text-[#260f08]">
      <div className="max-w-md rounded-xl bg-white p-8">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#c73b0f]">
          404
        </p>
        <h1 className="mt-3 text-3xl font-bold">Page not found</h1>
        <p className="mt-3 text-sm font-medium text-[#87635a]">
          This route does not exist in Desserts.
        </p>
        <Link
          to="/"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-full bg-[#c73b0f] px-6 text-sm font-semibold text-white transition hover:bg-[#952c0c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c73b0f]"
        >
          Back to desserts
        </Link>
      </div>
    </main>
  )
}
