import Link from "next/link";
import { House, SearchX } from "lucide-react";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-[65vh] items-center justify-center bg-[#F6FAF6] px-4 py-16">
      <div className="mx-auto w-full max-w-[520px] text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#E8F5EA]">
          <SearchX size={38} strokeWidth={1.7} className="text-[#008C45]" />
        </div>

        <h1 className="text-7xl font-extrabold tracking-tight text-[#008C45] sm:text-8xl">
          404
        </h1>

        <h2 className="mt-5 text-2xl font-bold text-[#243329] sm:text-3xl">
          পেজটি খুঁজে পাওয়া যায়নি!
        </h2>

        <p className="mx-auto mt-4 max-w-[420px] text-sm leading-7 text-[#7A897D] sm:text-base">
          আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি। অনুগ্রহ করে সঠিক লিংক
          ব্যবহার করুন অথবা হোম পেজে ফিরে যান।
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-[#008C45] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-[#007A3D]"
        >
          <House size={18} />
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
