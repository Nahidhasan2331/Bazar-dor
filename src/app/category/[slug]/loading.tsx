export default function CategoryLoading() {
  return (
    <main className="min-h-[75vh] bg-[#F1F6F1] px-4 pb-20 pt-6">
      <div className="mx-auto max-w-[1120px] animate-pulse">
        <div className="flex items-center gap-4 rounded-2xl border border-[#E1E9E2] bg-white p-5">
          <div className="h-14 w-14 rounded-xl bg-gray-100" />
          <div className="space-y-3">
            <div className="h-6 w-28 rounded bg-gray-200" />
            <div className="h-3 w-48 rounded bg-gray-100" />
          </div>
        </div>

        <div className="mt-5 h-16 rounded-2xl border border-[#E1E9E2] bg-white" />

        <div className="mt-5 h-4 w-36 rounded bg-gray-200" />

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-40 rounded-2xl border border-[#E1E9E2] bg-white p-4"
            >
              <div className="flex gap-3">
                <div className="h-12 w-12 rounded-xl bg-gray-100" />
                <div className="space-y-2">
                  <div className="h-4 w-28 rounded bg-gray-200" />
                  <div className="h-3 w-16 rounded bg-gray-100" />
                </div>
              </div>

              <div className="mt-6 h-3 w-20 rounded bg-gray-100" />
              <div className="mt-2 h-6 w-24 rounded bg-gray-200" />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
