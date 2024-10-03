"use client";
import { useRouter } from "next/navigation";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { useState } from "react";
import { Input } from "../ui/input";

const SearchDrawer = () => {
  const [searchValue, setSearchValue] = useState("");
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();

  // Handle change in input value
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleSubmit = () => {
    setOpen(false);
    setSearchValue("");
    router.push(`/searchmovie?movie=${searchValue}&page=1`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      handleSubmit();
    }
  };

  return (
    <div className="max-w-sm">
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger>
          <img src="/search-icon.svg" alt="searchicon" width={20} height={20} />
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm">
            <DrawerHeader>
              <DrawerTitle>Search for your movie</DrawerTitle>
            </DrawerHeader>
            <Input
              placeholder="Search for movie..."
              value={searchValue}
              onChange={handleInputChange}
              autoFocus
              onKeyDown={handleKeyDown}
            />
            <div className="flex items-center justify-between py-5">
              <DrawerClose>
                <Button variant="outline" className="w-[100px]">
                  Cancel
                </Button>
              </DrawerClose>
              <Button
                onClick={handleSubmit}
                className="text-md w-[100px]"
                size="sm">
                Search
              </Button>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default SearchDrawer;
