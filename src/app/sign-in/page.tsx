"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";
import { FaGithub, FaGoogle } from "react-icons/fa";

export default function SignInPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState<
    "google" | "github" | null
  >(null);
  const [redirectTo, setRedirectTo] = useState("/");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const callbackUrl = params.get("callbackUrl");

    if (
      callbackUrl?.startsWith("/") &&
      !callbackUrl.startsWith("//") &&
      !callbackUrl.includes("\\")
    ) {
      setRedirectTo(callbackUrl);
    }
  }, []);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("ইমেইল এবং পাসওয়ার্ড লিখুন");
      return;
    }

    setLoading(true);

    try {
      const { error } = await authClient.signIn.email({
        email: email.trim(),
        password,
      });

      if (error) {
        toast.error(error.message || "লগইন ব্যর্থ হয়েছে");
        return;
      }

      toast.success("সফলভাবে সাইন ইন হয়েছে!");
      router.push(redirectTo);
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন");
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: "google" | "github") => {
    setSocialLoading(provider);

    try {
      const { error } = await authClient.signIn.social({
        provider,
        callbackURL: redirectTo,
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
            স্বাগতম!
          </h1>
          <p className="mt-2 text-sm text-[#78847a]">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        <div className="rounded-2xl border border-[#e3eae3] bg-white p-6 shadow-sm md:p-8">
          <form onSubmit={handleSignIn} className="space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="signin-email"
                className="mb-2 block text-sm font-medium text-[#26352a]"
              >
                ইমেইল
              </label>
              <input
                id="signin-email"
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
                htmlFor="signin-password"
                className="mb-2 block text-sm font-medium text-[#26352a]"
              >
                পাসওয়ার্ড
              </label>

              <div className="relative">
                <input
                  id="signin-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="আপনার পাসওয়ার্ড"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
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

            {/* Login Button */}
            <button
              type="submit"
              disabled={loading || socialLoading !== null}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#008d42] px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#007537] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  সাইন ইন হচ্ছে...
                </>
              ) : (
                "সাইন ইন করুন"
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

          {/* Signup Link */}
          <p className="mt-6 text-center text-sm text-gray-500">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/sign-up"
              className="font-semibold text-[#008d42] hover:underline"
            >
              সাইন আপ করুন
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
