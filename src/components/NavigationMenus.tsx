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
import { getDistinctMovieByYear } from "@/lib/action";

import Link from "next/link";

const NavigationMenus = async () => {
  const distictYear = await getDistinctMovieByYear();

  console.log(distictYear);

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
              <ul className="flex flex-col item-center gap-3 p-4 md:w-[200px] lg:w-[200px] ">
                {distictYear.map((year) => (
                  <Link href={`/movieyear/${year}`} legacyBehavior passHref>
                    <NavigationMenuLink
                      key={year}
                      className={
                        "inline-flex py-2 items-center justify-center rounded-md transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
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
