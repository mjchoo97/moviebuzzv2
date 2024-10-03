import Link from "next/link";
import React from "react";
import NavigationMenus from "./NavigationMenus";
import SideBarMenu from "./SideBarMenu";
import { AuthButton } from "./AuthButton";
import Image from "next/image";
import SearchBar from "./SeachBar";
import SearchDrawer from "./SearchDrawer";

const Navbar = () => {
  return (
    <div className="flex h-[50px] w-full items-center justify-between border-b-2 bg-gray-900 px-4 py-1 md:px-8 lg:px-16 xl:px-32">
      <div className="flex h-full items-center">
        <Link href="/">
          <Image src="/websitelogo.png" alt="logo" width={180} height={100} />
        </Link>
      </div>

      <div className="flex h-full items-center gap-2">
        <SearchDrawer />

        <div className="mt-2 md:hidden lg:hidden xl:hidden">
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
