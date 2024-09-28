import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import NavigationMenus from "./NavigationMenus";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import SideBarMenu from "./SideBarMenu";

const Navbar = () => {
  return (
    <div className="flex justify-between py-2 items-center bg-opacity-0 border-b-2">
      <div>
        <Link href="/">MovieBuzz</Link>{" "}
      </div>
      <div className="flex h-full gap-2 items-center">
        <div className="lg:hidden md:hidden xl:hidden">
          <SideBarMenu />
        </div>
        <div className="hidden md:flex lg:flex">
          <NavigationMenus />
        </div>
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
