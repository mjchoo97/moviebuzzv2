import Image from "next/image";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div>
        <Image
          src="/pagenotfound.png"
          alt="notfoundimage"
          width={300}
          height={300}
        />
        <div className="flex gap-5">
          <h1 className="text-6xl font-bold text-neutral-200">404</h1>

          <h2 className="mt-4 text-2xl font-semibold">Page Not Found</h2>
        </div>
      </div>

      <p className="mt-2 text-neutral-300 text-center text-xl">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-200"
      >
        Go to Homepage
      </Link>
    </div>
  );
};

export default NotFound;
