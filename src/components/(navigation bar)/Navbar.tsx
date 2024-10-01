import Link from "next/link";
import React from "react";
import NavigationMenus from "./NavigationMenus";
import SideBarMenu from "./SideBarMenu";
import { AuthButton } from "./AuthButton";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className="bg-gray-900 flex justify-between py-1 items-center border-b-2 h-[50px] w-full px-4 md:px-8 lg:px-16 xl:px-32 ">
      <div className="h-full flex items-center">
        <Link href="/">
          <Image src="/websitelogo.png" alt="logo" width={180} height={100} />
        </Link>
      </div>
      <div className="flex h-full gap-2 items-center">
        <div className="lg:hidden md:hidden xl:hidden mt-2">
          <SideBarMenu />
        </div>
        <div className="hidden md:flex lg:flex">
          <NavigationMenus />
        </div>
        <div>
          <AuthButton />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
