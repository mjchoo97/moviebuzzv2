import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-between py-4 items-center bg-[#191C20] lg:bg-[var(--background)]">
      <div>
        <Link href="/">MovieBuzz</Link>{" "}
      </div>
      <div className="flex gap-2">
        <Link href="/addmovie">Create</Link>
        <Link href="/browsemovie">Browse</Link>
        <div>
          <ClerkLoading>
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </ClerkLoading>
          <ClerkLoaded>
            <SignedIn>
              <div className="flex items-center gap-3">
                <UserButton />
              </div>
            </SignedIn>
            <SignedOut>
              <div className="cursor-pointer">
                <Link href="/sign-in">Login/Register</Link>
              </div>
            </SignedOut>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
