import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { NavigationMenuLink } from "../ui/navigation-menu";
import Link from "next/link";
import { getTopDistinctMovieByYear } from "@/lib/action";

const SideBarMenu = async () => {
  const distictYear = await getTopDistinctMovieByYear();
  return (
    <div>
      <Sheet>
        <SheetTrigger className="">
          <img
            src="/hamburger-menu.svg"
            className="h-7 w-7"
            alt="hamburgericon"
          />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>MovieBuzz</SheetTitle>
            <SheetDescription className="text-md">
              <div className="flex flex-col gap-2">
                <Link href="/addmovie" className="w-full">
                  <SheetClose className="w-full border-b-2 px-2 py-1 text-left hover:bg-sky-900">
                    Create
                  </SheetClose>
                </Link>

                <div className="border-b-2 px-2 py-1 text-left">
                  Browse Movie
                </div>
                <div className="ml-10 border-b-2 px-2 py-1 text-left">
                  <Link href={`/browsemovie`}>
                    <SheetClose className="w-full py-1 pl-2 text-left hover:bg-sky-900">
                      All Years
                    </SheetClose>
                  </Link>

                  {distictYear.map((year) => (
                    <Link href={`/movieyear/${year}`} key={year}>
                      <SheetClose className="w-full px-2 py-1 text-left hover:bg-sky-900">
                        {year}
                      </SheetClose>
                    </Link>
                  ))}
                </div>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SideBarMenu;
