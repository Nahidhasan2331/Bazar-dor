"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save, UserRound } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function EditProfilePage() {
  const router = useRouter();

  const { data: session, isPending } = authClient.useSession();

  const [name, setName] = useState("");
  const [updating, setUpdating] = useState(false);

  const user = session?.user;

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user?.name]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const updatedName = name.trim();

    if (!updatedName) {
      toast.error("আপনার নাম লিখুন");
      return;
    }

    if (updatedName === user?.name) {
      toast.error("নাম পরিবর্তন করা হয়নি");
      return;
    }

    setUpdating(true);

    try {
      const { error } = await authClient.updateUser({
        name: updatedName,
      });

      if (error) {
        toast.error(error.message || "তথ্য আপডেট করা যায়নি");
        return;
      }

      toast.success("আপনার তথ্য সফলভাবে আপডেট হয়েছে!");

      router.push("/profile");
      router.refresh();
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setUpdating(false);
    }
  };

  if (isPending) {
    return (
      <main className="min-h-screen bg-[#F6FAF6] px-4 py-12">
        <div className="mx-auto max-w-[700px] space-y-5">
          <div className="h-8 w-48 animate-pulse rounded bg-gray-200" />
          <div className="h-64 animate-pulse rounded-xl bg-white" />
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#F6FAF6] px-4">
        <p className="text-sm text-gray-500">
          সাইন ইন পেজে নিয়ে যাওয়া হচ্ছে...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F6FAF6] px-4 py-10">
      <div className="mx-auto max-w-[700px]">
        {/* Back to Profile */}
        <Link
          href="/profile"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[#008C45] hover:underline"
        >
          <ArrowLeft size={17} />
          প্রোফাইলে ফিরে যান
        </Link>

        {/* Page Heading */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#243329]">
            প্রোফাইল আপডেট করুন
          </h1>
          <p className="mt-2 text-sm text-[#7A897D]">
            আপনার ব্যক্তিগত তথ্য পরিবর্তন করুন
          </p>
        </div>

        {/* Edit Form */}
        <div className="rounded-xl border border-[#E1E9E2] bg-white p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex items-center gap-3 border-b border-[#EDF1ED] pb-5">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EAF5EC]">
              <UserRound size={24} className="text-[#008C45]" />
            </div>

            <div>
              <h2 className="text-base font-semibold text-[#243329]">
                তথ্য পরিবর্তন
              </h2>
              <p className="text-xs text-[#7A897D]">আপনার নাম আপডেট করুন</p>
            </div>
          </div>

          <form onSubmit={handleUpdate} className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="mb-2 block text-sm font-medium text-[#344238]"
              >
                আপনার নাম
              </label>

              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="আপনার নাম লিখুন"
                required
                maxLength={100}
                className="w-full rounded-lg border border-[#DDE6DD] bg-white px-4 py-3 text-sm text-[#243329] outline-none transition focus:border-[#008C45] focus:ring-2 focus:ring-green-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-[#344238]">
                ইমেইল
              </label>

              <input
                type="email"
                value={user.email}
                disabled
                className="w-full cursor-not-allowed rounded-lg border border-[#DDE6DD] bg-gray-50 px-4 py-3 text-sm text-gray-500"
              />
            </div>

            <button
              type="submit"
              disabled={updating}
              className="flex items-center justify-center gap-2 rounded-lg bg-[#008C45] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#007A3D] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save size={17} />
              {updating ? "আপডেট হচ্ছে..." : "তথ্য আপডেট করুন"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
