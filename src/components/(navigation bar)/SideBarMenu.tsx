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
import { getDistinctMovieByYear } from "@/lib/action";

const SideBarMenu = async () => {
  const distictYear = await getDistinctMovieByYear();
  return (
    <div>
      <Sheet>
        <SheetTrigger className="">
          <img src="/hamburger-menu.svg" className="h-7 w-7" />
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>MovieBuzz</SheetTitle>
            <SheetDescription className="text-md ">
              <div className="flex flex-col gap-2">
                <Link href="/addmovie" className="w-full">
                  <SheetClose className="w-full border-b-2 py-1 hover:bg-sky-900 text-left px-2">
                    Create
                  </SheetClose>
                </Link>

                <div className="border-b-2 py-1 text-left px-2">
                  Browse Movie
                </div>
                <div className="border-b-2 py-1 ml-10 px-2 text-left">
                  {distictYear.map((year) => (
                    <Link href={`/movieyear/${year}`} key={year}>
                      <SheetClose className="w-full  py-1 hover:bg-sky-900 text-left px-2">
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
