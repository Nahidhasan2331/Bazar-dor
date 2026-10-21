export default function HomeLoading() {
  return (
    <main className="min-h-screen bg-[#F6FAF6]">
      <div className="mx-auto max-w-6xl space-y-10 px-4 py-8">
        <section className="grid animate-pulse gap-8 rounded-2xl border border-[#E1E9E2] bg-white p-6 md:grid-cols-2 md:items-center md:p-10">
          <div className="space-y-5">
            <div className="h-7 w-36 rounded-full bg-[#E8F0E8]" />

            <div className="space-y-3">
              <div className="h-9 w-full max-w-[420px] rounded-lg bg-[#E8F0E8]" />
              <div className="h-9 w-3/4 rounded-lg bg-[#E8F0E8]" />
            </div>

            <div className="space-y-2">
              <div className="h-4 w-full max-w-[400px] rounded bg-[#EDF2ED]" />
              <div className="h-4 w-4/5 rounded bg-[#EDF2ED]" />
            </div>

            <div className="h-11 w-40 rounded-lg bg-[#D8E9DA]" />
          </div>

          <div className="flex justify-center">
            <div className="h-48 w-48 rounded-2xl bg-[#E8F0E8] sm:h-60 sm:w-60" />
          </div>
        </section>

        <section className="space-y-5">
          <div className="flex animate-pulse items-center justify-between">
            <div className="h-7 w-48 rounded-lg bg-[#DCE9DC]" />
            <div className="h-4 w-20 rounded bg-[#E8F0E8]" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <div className="flex animate-pulse items-center justify-between">
            <div className="h-7 w-48 rounded-lg bg-[#DCE9DC]" />
            <div className="h-4 w-20 rounded bg-[#E8F0E8]" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </section>

        <section className="space-y-5">
          <div className="animate-pulse space-y-2">
            <div className="h-7 w-40 rounded-lg bg-[#DCE9DC]" />
            <div className="h-4 w-64 max-w-full rounded bg-[#E8F0E8]" />
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function ProductCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-[#E1E9E2] bg-white p-5">
      <div className="flex items-start gap-4">
        <div className="h-14 w-14 shrink-0 rounded-xl bg-[#E8F0E8]" />

        <div className="flex-1 space-y-3">
          <div className="h-5 w-3/4 rounded bg-[#E8F0E8]" />
          <div className="h-3 w-1/2 rounded bg-[#EDF2ED]" />
        </div>
      </div>

      <div className="mt-5 border-t border-[#EDF1ED] pt-4">
        <div className="mb-3 h-3 w-24 rounded bg-[#EDF2ED]" />

        <div className="flex items-center justify-between gap-3">
          <div className="h-6 w-28 rounded bg-[#DCE9DC]" />
          <div className="h-6 w-16 rounded-full bg-[#E8F0E8]" />
        </div>
      </div>
    </div>
  );
}
