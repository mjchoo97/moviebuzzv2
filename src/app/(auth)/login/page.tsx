"use client";

import * as React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import Link from "next/link";
import Image from "next/image";

export default function SignInPage() {
  const moviePoster = [
    "/loginposter.jpeg",
    "/loginposter2.jpg",
    "/loginposter3.jpg",
    "/loginposter4.png",
    "/loginposter5.jpeg",
    "/loginposter6.png",
  ];

  const getRandomPoster = () => {
    const randomIndex = Math.floor(Math.random() * moviePoster.length);
    return moviePoster[randomIndex];
  };

  return (
    <div className="flex h-full  item-center">
      <div className="w-full lg:max-w-[200px] lg:mx-auto flex min-h-[calc(100vh-88px)] justify-center py-24 h-full">
        <div className="mx-auto  w-full space-y-6 flex flex-col justify-center items-center relative ">
          <div className="md:hidden lg:hidden w-full overflow-hidden  h-[calc(100vh-100px)]  rounded-lg absolute -z-10 opacity-90 blur-[2px]">
            <Image
              alt="poster"
              style={{ objectFit: "cover" }}
              fill
              src={getRandomPoster()}
            />
          </div>
          <div className="bg-opacity-90 md:bg-opacity-0  lg:bg-opacity-0 border-2 md:border-0 lg:border-0 border-slate-50 bg-slate-950 p-5 rounded-lg flex flex-col justify-center items-center gap-5">
            <div className="space-y-3 text-center  ">
              <h1 className="text-2xl font-bold gap-3 text-neutral-300">
                Sign In to{" "}
                {/* <p className="text-amber-400 text-3xl mt-3 ">MovieBuzz</p> */}
              </h1>
              <div className="relative h-[50px] w-[250px]">
                <Image
                  src="/websitelogo.png"
                  alt="websitelogo"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
            <div className="space-y-10 ">
              <Link
                href="/api/login/google"
                className={cn(
                  buttonVariants({
                    variant: "googleAuth",
                  }),
                  "w-full"
                )}
              >
                <GoogleIcon className="mr-2 h-5 w-5 stroke-white bg-transparent " />
                Continue with Google
              </Link>
              <div className="text-sm text-neutral-400 text-center">
                By clicking sign in, you agree to our{" "}
                <a
                  href="/terms-of-services"
                  className="underline hover:text-neutral-300"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="/privacy-policy"
                  className="underline hover:text-neutral-300"
                >
                  Privacy Policy
                </a>
                .
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden md:flex lg:flex w-3/4 py-4">
        <div className="w-full overflow-hidden relative h-[calc(100vh-100px)]  rounded-lg">
          <Image
            alt="poster"
            fill
            style={{ objectFit: "cover" }}
            src={getRandomPoster()}
          />
        </div>
      </div>
    </div>
  );
}

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      viewBox="-3 0 262 262"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid"
    >
      <path
        d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
        fill="#4285F4"
      />
      <path
        d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
        fill="#34A853"
      />
      <path
        d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
        fill="#FBBC05"
      />
      <path
        d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
        fill="#EB4335"
      />
    </svg>
  );
}
