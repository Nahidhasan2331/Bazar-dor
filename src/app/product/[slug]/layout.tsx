import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function ProductSlugLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    const { slug } = await params;
    redirect(
      `/sign-in?callbackUrl=${encodeURIComponent(`/product/${slug}`)}&reason=auth-required`,
    );
  }

  return <>{children}</>;
}
