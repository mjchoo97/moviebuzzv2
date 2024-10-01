import { FlipWords } from "@/components/ui/flip-words";
import { getCurrentUser } from "@/lib/session";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";

const flipwords = ["Discover", "Rate", "Discuss", "Explore"];

const Hero = async () => {
  const user = await getCurrentUser();

  return (
    <div className="py-4 h-[35rem] flex items-left lg:items-center px-4 bg-[url('/polkadots.png')] bg-cover bg-center flex-col justify-center">
      <div className="text-5xl lg:text-7xl font-normal text-neutral-600 dark:text-neutral-400">
        <FlipWords
          words={flipwords}
          className="text-yellow-500 font-semibold text-left"
        />
        <br />
        movie with MovieBuzz
      </div>

      {user ? (
        <div className="mt-6 left-0">
          <Link href="/addmovie">
            <Button
              size="xl"
              variant="homepage"
              className="bg-gray-950 border-neutral-400 border-2 text-neutral-400"
            >
              Get Started
            </Button>
          </Link>
        </div>
      ) : (
        <div className="mt-8">
          <Link href="/login">
            <Button
              size="xl"
              variant="homepage"
              className="bg-gray-950 border-neutral-400 border-2 text-neutral-400"
            >
              Login Now
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Hero;
