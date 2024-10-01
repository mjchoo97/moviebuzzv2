import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import {
  getDistinctMovieByYear,
  getTopDistinctMovieByYear,
} from "@/lib/action";

import Link from "next/link";

const NavigationMenus = async () => {
  const distictYear = await getTopDistinctMovieByYear();

  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/addmovie" legacyBehavior passHref>
              <NavigationMenuLink className="inline-flex px-4 py-2 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50">
                Create
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Browse</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="flex flex-col item-center gap-2 p-4 md:w-[200px] lg:w-[200px] ">
                <Link href={`/browsemovie`} legacyBehavior passHref>
                  <NavigationMenuLink
                    className={
                      "inline-flex py-1 text-sm items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                    }
                  >
                    All Years
                  </NavigationMenuLink>
                </Link>
                {distictYear.map((year) => (
                  <Link
                    key={year}
                    href={`/movieyear/${year}`}
                    legacyBehavior
                    passHref
                  >
                    <NavigationMenuLink
                      className={
                        "inline-flex py-1 text-sm items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                      }
                    >
                      {year}
                    </NavigationMenuLink>
                  </Link>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavigationMenus;
