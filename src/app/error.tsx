"use client"; // Error boundaries must be Client Components

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex gap-5 items-center">
        <Image
          src="/somethingwhenwrong.png"
          alt="errorimage"
          width={250}
          height={250}
        />
        <div>
          <h1 className="text-6xl font-bold text-neutral-200">Oops!</h1>
          <h2 className="mt-4 text-2xl font-semibold">Something went wrong</h2>
        </div>
      </div>

      <p className="mt-2 text-neutral-300 text-center">
        {"We're sorry, but something went wrong on our end."}
      </p>
      <Link
        href="/"
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
      >
        Go to Homepage
      </Link>
    </div>
  );
}
