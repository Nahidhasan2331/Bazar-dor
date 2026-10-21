"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { Loader2, LogOut, UserRound } from "lucide-react";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  const user = session?.user;

  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user?.name]);

  useEffect(() => {
    if (!isPending && !user) {
      router.replace("/sign-in?callbackUrl=/profile");
    }
  }, [isPending, user, router]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("আপনার নাম লিখুন");
      return;
    }

    if (name.trim().length < 2) {
      toast.error("নাম কমপক্ষে ২ অক্ষরের হতে হবে");
      return;
    }

    setSaving(true);

    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
      });

      if (error) {
        toast.error(error.message || "আপডেট করা যায়নি");
        return;
      }

      toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে!");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("প্রোফাইল আপডেটে সমস্যা হয়েছে");
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    setLoggingOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "লগআউট করা যায়নি");
        return;
      }

      toast.success("সফলভাবে লগআউট হয়েছে!");
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("লগআউট করতে সমস্যা হয়েছে");
    } finally {
      setLoggingOut(false);
    }
  };

  if (isPending || !user) {
    return (
      <main className="min-h-[70vh] bg-[#F1F6F1] px-4 py-16">
        <div className="mx-auto max-w-[700px] animate-pulse">
          <div className="mb-6 h-7 w-40 rounded bg-gray-200" />
          <div className="mb-5 h-24 rounded-2xl bg-white" />
          <div className="h-56 rounded-2xl bg-white" />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[75vh] bg-[#F1F6F1] px-4 pb-32 pt-20">
      <div className="mx-auto w-full max-w-[700px]">
        <div className="mb-5">
          <h1 className="text-[24px] font-bold text-[#243329]">
            আমার প্রোফাইল
          </h1>

          <p className="mt-1 text-[12px] text-[#7A897D]">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        <section className="flex flex-col gap-4 rounded-[15px] border border-[#E1E9E2] bg-white px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#F1F6F1]">
              {user.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "Profile"}
                  width={64}
                  height={64}
                  unoptimized
                  className="h-full w-full object-cover"
                />
              ) : (
                <UserRound size={30} className="text-[#008D42]" />
              )}
            </div>

            <div>
              <h2 className="text-[17px] font-semibold text-[#243329]">
                {user.name}
              </h2>

              <p className="mt-1 break-all text-[12px] text-[#7A897D]">
                {user.email}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="inline-flex items-center justify-center gap-2 self-start rounded-lg border border-[#F1A5A5] bg-white px-4 py-2 text-[12px] font-medium text-[#E53935] transition hover:bg-red-50 disabled:opacity-60 sm:self-auto"
          >
            {loggingOut ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <LogOut size={15} />
            )}
            সাইন আউট
          </button>
        </section>

        <section className="mt-5 rounded-[15px] border border-[#E1E9E2] bg-white p-6">
          <h2 className="mb-7 text-[16px] font-bold text-[#243329]">তথ্য</h2>

          <Link
            href="/profile/edit"
            className="inline-flex items-center justify-center rounded-lg bg-[#008C45] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#007A3D]"
          >
            তথ্য আপডেট করুন
          </Link>
        </section>
      </div>
    </main>
  );
}
