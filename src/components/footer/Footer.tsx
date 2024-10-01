import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col gap-1 md:flex-row lg:flex-row items-center border-t-2 border-neutral-600 justify-between w-screen py-2 md:py-4 lg:py-4 px-4 md:px-8 lg:px-16 xl:px-32 h-[80px] md:h-[30px] lg:h-[30px] text-sm">
      <div>©️ 2024 MovieBuzz. All rights reserved.</div>
      <div className="flex gap-5 text-neutral-200">
        <Link href="/privacy-policy" className="hover:text-orange-300">
          Privacy Policy
        </Link>
        <Link href="/terms-of-services" className="hover:text-orange-300">
          Terms of Services
        </Link>
      </div>
    </div>
  );
};

export default Footer;
