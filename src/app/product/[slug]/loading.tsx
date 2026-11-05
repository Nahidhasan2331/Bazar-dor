export default function ProductDetailsLoading() {
  return (
    <main className="min-h-screen bg-[#f7faf7] px-4 py-8 md:py-12">
      <div className="mx-auto max-w-6xl animate-pulse">
        <div className="mb-8 flex items-center gap-3">
          <div className="h-4 w-16 rounded bg-gray-200" />
          <div className="h-4 w-4 rounded bg-gray-200" />
          <div className="h-4 w-24 rounded bg-gray-200" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-gray-100 bg-white p-8">
            <div className="h-48 w-48 rounded-2xl bg-green-50 md:h-64 md:w-64" />
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-6 md:p-8">
            <div className="mb-4 h-5 w-24 rounded bg-green-100" />
            <div className="mb-4 h-9 w-52 rounded bg-gray-200" />
            <div className="mb-8 h-4 w-36 rounded bg-gray-100" />

            <div className="mb-3 h-4 w-28 rounded bg-gray-200" />
            <div className="mb-5 h-12 w-40 rounded bg-green-100" />

            <div className="mb-3 h-4 w-full rounded bg-gray-100" />
            <div className="mb-6 h-4 w-3/4 rounded bg-gray-100" />

            <div className="h-12 w-full rounded-xl bg-green-100" />
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-gray-100 bg-white p-6 md:p-8">
          <div className="mb-6 h-7 w-52 rounded bg-gray-200" />

          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-4 rounded-xl border border-gray-100 p-4"
              >
                <div className="space-y-2">
                  <div className="h-4 w-28 rounded bg-gray-200" />
                  <div className="h-3 w-20 rounded bg-gray-100" />
                </div>

                <div className="h-6 w-20 rounded bg-green-100" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
