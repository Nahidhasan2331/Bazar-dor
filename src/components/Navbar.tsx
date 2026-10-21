"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, LogOut, UserRound, ChevronDown, Loader2 } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

const categories = [
  { name: "চাল", icon: "/rice.png", href: "/category/chal" },
  { name: "ডাল", icon: "/dal.svg", href: "/category/dal" },
  { name: "তেল", icon: "/cooking-oil.png", href: "/category/tel" },
  { name: "সবজি", icon: "/vegetables.png", href: "/category/shobji" },
  { name: "মাছ", icon: "/fish.png", href: "/category/mach" },
  { name: "মাংস", icon: "/meat.png", href: "/category/mangsho" },
  {
    name: "ডিম-দুধ",
    icon: "/drink.png",
    href: "/category/dim-dudh",
  },
  { name: "মসলা", icon: "/spices.png", href: "/category/moshla" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const banglaDate = new Intl.DateTimeFormat("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(new Date());

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setUserMenuOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setUserMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  useEffect(() => {
    setUserMenuOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    if (loggingOut) return;

    setLoggingOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "লগআউট করা যায়নি।");
        return;
      }

      setUserMenuOpen(false);
      setMenuOpen(false);

      toast.success("সফলভাবে লগআউট হয়েছে!");

      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("লগআউট করতে সমস্যা হয়েছে।");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <header className="relative z-40 w-full border-b border-gray-200 bg-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#008C45] p-2">
              <Image
                src="/logo-icon.png"
                alt="Bazar Dor Logo"
                width={45}
                height={45}
                className="object-contain"
                priority
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-black">বাজার দর</h1>

              <p className="text-xs text-gray-500">{banglaDate}</p>
            </div>
          </Link>

          {/* Desktop Authentication */}
          <div className="hidden items-center gap-3 md:flex">
            {isPending ? (
              <Loader2 size={20} className="animate-spin text-[#008C45]" />
            ) : user ? (
              <div ref={userMenuRef} className="relative">
                <button
                  type="button"
                  onClick={() => setUserMenuOpen((previous) => !previous)}
                  aria-expanded={userMenuOpen}
                  aria-haspopup="menu"
                  aria-controls="navbar-user-menu"
                  className="flex items-center gap-2 rounded-lg px-2 py-2 transition-colors hover:bg-[#F1F6F1]"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#EAF5EC]">
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt={user.name || "User"}
                        width={36}
                        height={36}
                        unoptimized
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <UserRound size={20} className="text-[#008C45]" />
                    )}
                  </div>

                  <span className="max-w-[120px] truncate text-[13px] font-medium text-[#243329]">
                    {user.name}
                  </span>

                  <ChevronDown
                    size={13}
                    className={`text-[#6B786D] transition-transform duration-200 ${
                      userMenuOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Floating User Menu */}
                {userMenuOpen && (
                  <div
                    id="navbar-user-menu"
                    role="menu"
                    aria-label="User account menu"
                    className="absolute right-0 top-[calc(100%+8px)] z-[100] w-[245px] rounded-[15px] border border-[#E1E9E2] bg-white p-4 shadow-[0_8px_24px_rgba(0,0,0,0.14)]"
                  >
                    {/* User Information */}
                    <div className="mb-2 border-b border-[#EDF1ED] pb-3">
                      <p className="truncate text-[13px] font-semibold text-[#243329]">
                        {user.name}
                      </p>

                      <p className="mt-1 truncate text-[11px] text-[#7A897D]">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      href="/profile"
                      role="menuitem"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 rounded-lg px-2 py-2.5 text-[12px] font-medium text-[#344238] transition-colors hover:bg-[#F1F6F1]"
                    >
                      <UserRound size={15} className="text-[#54749B]" />
                      আমার প্রোফাইল
                    </Link>

                    <button
                      type="button"
                      role="menuitem"
                      onClick={handleLogout}
                      disabled={loggingOut}
                      className="flex w-full items-center gap-2 rounded-lg px-2 py-2.5 text-left text-[12px] font-medium text-[#E53935] transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {loggingOut ? (
                        <Loader2 size={15} className="animate-spin" />
                      ) : (
                        <LogOut size={15} />
                      )}

                      {loggingOut ? "লগআউট হচ্ছে..." : "সাইন আউট"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              /* Logged Out Buttons */
              <>
                <Link
                  href="/sign-in"
                  className="rounded-md bg-transparent px-4 py-2 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100"
                >
                  সাইন ইন
                </Link>

                <Link
                  href="/sign-up"
                  className="rounded-md bg-[#008C45] px-5 py-2.5 text-sm font-medium text-white shadow-[0_4px_8px_rgba(0,140,69,0.30)] transition-all duration-200 hover:bg-[#007A3D]"
                >
                  সাইন আপ
                </Link>
              </>
            )}
          </div>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((previous) => !previous)}
            className="rounded-md p-2 text-gray-700 hover:bg-gray-100 md:hidden"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Desktop Category Navigation */}
        <nav className="hidden border-t border-gray-100 bg-white md:block">
          <div className="flex items-center justify-start gap-5 overflow-x-auto py-4">
            {categories.map((category) => {
              const active = pathname === category.href;

              return (
                <Link
                  key={category.href}
                  href={category.href}
                  className={`flex shrink-0 items-center gap-1 text-sm font-semibold transition-colors ${
                    active
                      ? "text-[#008C45]"
                      : "text-gray-800 hover:text-[#008C45]"
                  }`}
                >
                  <Image
                    src={category.icon}
                    alt={category.name}
                    width={20}
                    height={20}
                    className="h-5 w-5 object-contain"
                  />

                  <span>{category.name}</span>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Mobile Navigation */}
        {menuOpen && (
          <nav className="border-t border-gray-100 pb-4 md:hidden">
            <div className="flex flex-col gap-2 pt-4">
              {categories.map((category) => (
                <Link
                  key={category.href}
                  href={category.href}
                  onClick={() => setMenuOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                    pathname === category.href
                      ? "bg-green-100 text-[#008C45]"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <Image
                    src={category.icon}
                    alt={category.name}
                    width={22}
                    height={22}
                    className="h-[22px] w-[22px] object-contain"
                  />

                  <span>{category.name}</span>
                </Link>
              ))}

              <div className="mt-4 border-t border-gray-100 pt-4">
                {isPending ? (
                  <div className="flex justify-center">
                    <Loader2
                      size={20}
                      className="animate-spin text-[#008C45]"
                    />
                  </div>
                ) : user ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 rounded-lg bg-[#F1F6F1] px-3 py-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-green-100">
                        {user.image ? (
                          <Image
                            src={user.image}
                            alt={user.name || "Profile"}
                            width={44}
                            height={44}
                            unoptimized
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <UserRound size={22} className="text-[#008C45]" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-[#243329]">
                          {user.name}
                        </p>

                        <p className="truncate text-xs text-[#7A897D]">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setMenuOpen(false)}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-[#344238] hover:bg-[#F1F6F1]"
                    >
                      <UserRound size={17} className="text-[#54749B]" />
                      আমার প্রোফাইল
                    </Link>

                    <button
                      type="button"
                      onClick={handleLogout}
                      disabled={loggingOut}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-[#E53935] hover:bg-red-50 disabled:opacity-50"
                    >
                      {loggingOut ? (
                        <Loader2 size={17} className="animate-spin" />
                      ) : (
                        <LogOut size={17} />
                      )}

                      {loggingOut ? "লগআউট হচ্ছে..." : "সাইন আউট"}
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-3">
                    <Link
                      href="/sign-in"
                      onClick={() => setMenuOpen(false)}
                      className="flex-1 rounded-md border border-gray-200 bg-white px-4 py-2.5 text-center text-sm font-medium text-gray-900 hover:bg-gray-100"
                    >
                      সাইন ইন
                    </Link>

                    <Link
                      href="/sign-up"
                      onClick={() => setMenuOpen(false)}
                      className="flex-1 rounded-md bg-[#008C45] px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-[#007A3D]"
                    >
                      সাইন আপ
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
