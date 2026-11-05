export default function Footer() {
  return (
    <footer className="w-full border-t border-[#E1E9E2] bg-white">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col items-center justify-between gap-3 px-4 py-5 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
        <p className="text-[12px] font-normal text-[#344238]">
          বাজার দর — প্রত্যাশিত পণ্যের দাম এক নজরে।
        </p>

        <p className="text-[12px] font-normal text-[#344238]">
          সকল দাম সম্ভাব্য; বাজারের অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
}
