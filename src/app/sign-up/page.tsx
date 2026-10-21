"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";
import { FaGithub, FaGoogle } from "react-icons/fa";

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<
    "google" | "github" | null
  >(null);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      toast.error("সবগুলো তথ্য পূরণ করুন");
      return;
    }

    if (name.trim().length < 2) {
      toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে");
      return;
    }

    if (password.length < 8) {
      toast.error("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("পাসওয়ার্ড দুটি মিলছে না");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signUp.email({
        name: name.trim(),
        email: email.trim(),
        password,
      });

      if (error) {
        toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
        return;
      }

      await authClient.signOut();

      toast.success("অ্যাকাউন্ট তৈরি হয়েছে! এখন সাইন ইন করুন");

      router.push("/sign-in");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("রেজিস্ট্রেশনে সমস্যা হয়েছে");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    setSocialLoading(provider);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || "সোশ্যাল লগইন ব্যর্থ হয়েছে");
        setSocialLoading(null);
      }
    } catch (error) {
      console.error(error);
      toast.error("সোশ্যাল লগইনে সমস্যা হয়েছে");
      setSocialLoading(null);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-[#dfe8df] bg-white px-4 py-3 text-sm text-[#26352a] outline-none transition focus:border-[#008d42] focus:ring-2 focus:ring-[#008d42]/10 placeholder:text-gray-400";

  return (
    <main className="min-h-[75vh] bg-[#f0f5f0] px-4 py-12 md:py-16">
      <div className="mx-auto w-full max-w-[420px]">
        <div className="mb-7 text-center">
          <h1 className="text-2xl font-bold text-[#243329] md:text-3xl">
            অ্যাকাউন্ট তৈরি করুন
          </h1>
          <p className="mt-2 text-sm text-[#78847a]">
            বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
          </p>
        </div>

        <div className="rounded-2xl border border-[#e3eae3] bg-white p-6 shadow-sm md:p-8">
          <form onSubmit={handleSignUp} className="space-y-4">
            <div>
              <label
                htmlFor="signup-name"
                className="mb-2 block text-sm font-medium text-[#26352a]"
              >
                নাম
              </label>
              <input
                id="signup-name"
                type="text"
                placeholder="যেমন: রহিম উদ্দিন"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                required
                minLength={2}
                className={inputClass}
              />
            </div>

            <div>
              <label
                htmlFor="signup-email"
                className="mb-2 block text-sm font-medium text-[#26352a]"
              >
                ইমেইল
              </label>
              <input
                id="signup-email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className={inputClass}
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="signup-password"
                className="mb-2 block text-sm font-medium text-[#26352a]"
              >
                পাসওয়ার্ড
              </label>

              <div className="relative">
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="কমপক্ষে ৮ অক্ষর"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                  minLength={8}
                  className={`${inputClass} pr-12`}
                />

                <button
                  type="button"
                  aria-label={
                    showPassword ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"
                  }
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#008d42]"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="signup-confirm"
                className="mb-2 block text-sm font-medium text-[#26352a]"
              >
                পাসওয়ার্ড নিশ্চিত করুন
              </label>
              <input
                id="signup-confirm"
                type={showPassword ? "text" : "password"}
                placeholder="আবার লিখুন"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                autoComplete="new-password"
                required
                className={inputClass}
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              disabled={loading || socialLoading !== null}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#008d42] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#007537] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  অ্যাকাউন্ট তৈরি হচ্ছে...
                </>
              ) : (
                "অ্যাকাউন্ট তৈরি করুন"
              )}
            </button>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-400">অথবা</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button
              type="button"
              disabled={loading || socialLoading !== null}
              onClick={() => handleSocialLogin("google")}
              className="flex items-center justify-center gap-2 rounded-lg border border-[#e1e8e1] bg-white px-3 py-3 text-xs font-medium text-[#26352a] transition hover:bg-gray-50 disabled:opacity-60"
            >
              {socialLoading === "google" ? (
                <Loader2 size={17} className="animate-spin" />
              ) : (
                <FaGoogle size={17} className="text-[#4285F4]" />
              )}
              Google দিয়ে চালিয়ে যান
            </button>

            <button
              type="button"
              disabled={loading || socialLoading !== null}
              onClick={() => handleSocialLogin("github")}
              className="flex items-center justify-center gap-2 rounded-lg border border-[#e1e8e1] bg-white px-3 py-3 text-xs font-medium text-[#26352a] transition hover:bg-gray-50 disabled:opacity-60"
            >
              {socialLoading === "github" ? (
                <Loader2 size={17} className="animate-spin" />
              ) : (
                <FaGithub size={17} />
              )}
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          {/* Sign In Link */}
          <p className="mt-6 text-center text-sm text-gray-500">
            অ্যাকাউন্ট আছে?{" "}
            <Link
              href="/sign-in"
              className="font-semibold text-[#008d42] hover:underline"
            >
              সাইন ইন করুন
            </Link>
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs text-gray-400 transition hover:text-[#008d42]"
          >
            <ArrowLeft size={14} />
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
}
