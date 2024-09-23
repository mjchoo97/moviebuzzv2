import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <div className="flex justify-between py-4">
      <div>
        <Link href="/">MovieBuzz</Link>{" "}
      </div>
      <div className="flex gap-2">
        <Link href="/addmovie">Add Movie</Link>
        <Link href="/browsemovie">Browse Movies</Link>
      </div>
    </div>
  );
};

export default Navbar;
