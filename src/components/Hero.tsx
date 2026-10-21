import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  const date = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());

  return (
    <section className="mx-auto w-full max-w-7xl px-4 pt-5 md:px-6">
      <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-[#E1E9E2] bg-white px-5 py-7 md:flex-row md:px-10 md:py-9">
        {/* Left side */}
        <div className="w-full flex-1">
          <span className="inline-block rounded-full bg-[#EAF7ED] px-3 py-1 text-xs font-medium text-[#008C45]">
            {date}
          </span>

          <h1 className="mt-3 text-2xl font-extrabold leading-tight text-[#202B23] md:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-gray-500 md:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বোচ্চ এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <Link
            href="#সব-পণ্য"
            className="mt-6 inline-flex rounded-lg bg-[#008C45] px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_8px_#006B35] transition hover:bg-[#007A3C]"
          >
            সব পণ্য দেখুন
          </Link>
        </div>

        {/* Right side */}
        <div className="flex w-full justify-center md:w-[32%] md:justify-end">
          <Image
            src="/bazar-hero.png"
            alt="তাজা শাকসবজির ঝুড়ি"
            width={270}
            height={230}
            className="h-auto w-[190px] object-contain md:w-[250px]"
            priority
          />
        </div>
      </div>
    </section>
  );
}
