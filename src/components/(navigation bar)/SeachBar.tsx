"use client";
import { useRouter } from "next/navigation";

import React, { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const SearchBar = () => {
  // State to store the input value
  const [searchValue, setSearchValue] = useState("");
  const router = useRouter();

  // Handle change in input value
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className="flex items-center">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          placeholder="Search for movie..."
          value={searchValue}
          onChange={handleInputChange}
        />
        <Button
          type="submit"
          onClick={() =>
            router.push(`/searchmovie?movie=${searchValue}&page=1`)
          }>
          Search
        </Button>
      </div>
    </div>
  );
};

export default SearchBar;
