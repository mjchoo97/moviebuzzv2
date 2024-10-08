"use client";

import { Button } from "@/components/ui/button";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignedOutPage() {
  const router = useRouter();
  useEffect(() => {
    router.refresh();
  }, [router]);

  return (
    <div className="mx-auto max-w-[400px] space-y-6 py-24 h-screen">
      <h1 className="text-2xl">Successfully Signed Out</h1>
      <p className="text-lg md:text-xl lg:text-xl">
        You have been successfully signed out. You can now sign in to your
        account.
      </p>

      <Button asChild>
        <Link href="/login">Sign In</Link>
      </Button>
    </div>
  );
}
