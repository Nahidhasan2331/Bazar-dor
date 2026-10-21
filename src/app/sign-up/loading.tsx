export default function SignUpLoading() {
  return (
    <main className="min-h-[75vh] bg-[#f0f5f0] px-4 py-12 md:py-16">
      <div className="mx-auto w-full max-w-[420px] animate-pulse">
        <div className="mb-7 flex flex-col items-center gap-3">
          <div className="h-8 w-48 rounded-lg bg-gray-200" />
          <div className="h-4 w-64 rounded bg-gray-200" />
        </div>

        <div className="space-y-4 rounded-2xl border border-[#e3eae3] bg-white p-6 shadow-sm md:p-8">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="space-y-2">
              <div className="h-4 w-24 rounded bg-gray-200" />
              <div className="h-12 rounded-lg bg-gray-100" />
            </div>
          ))}

          <div className="h-12 rounded-lg bg-green-100" />

          <div className="h-4 rounded bg-gray-100" />

          <div className="grid grid-cols-2 gap-3">
            <div className="h-12 rounded-lg bg-gray-100" />
            <div className="h-12 rounded-lg bg-gray-100" />
          </div>
        </div>
      </div>
    </main>
  );
}
