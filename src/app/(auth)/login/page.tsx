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
              <h1 className="text-2xl font-bold gap-3">
                Sign In to{" "}
                <p className="text-amber-400 text-3xl mt-3 ">MovieBuzz</p>
              </h1>
            </div>
            <div className="space-y-4">
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
                Sign in with Google
              </Link>
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
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Google</title>
      <path
        fill="transparent"
        d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
      />
    </svg>
  );
}
