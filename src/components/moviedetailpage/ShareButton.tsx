"use client";
import React, { useEffect, useState } from "react";

import { CopyIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePathname } from "next/navigation";
import { useRouter } from "next/router";
import { toast } from "@/hooks/use-toast";

const ShareButton = () => {
  const [fullUrl, setFullUrl] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setFullUrl(window.location.href);
    }
  }, []);

  const handleCopy = () => {
    if (navigator.clipboard && fullUrl) {
      navigator.clipboard.writeText(fullUrl);
      setOpen(false);
      toast({
        variant: "success",
        title: "Copied Succesfully!",
        description: "You may now share with your friend.",
      });
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <img
            src="/share-icon.svg"
            alt="share-icon"
            width={20}
            height={20}
            className="cursor-pointer"
          />
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
              Anyone who has this link will be able to view this.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input id="link" defaultValue={fullUrl} readOnly />
            </div>
            <Button
              type="submit"
              size="sm"
              className="px-3"
              onClick={handleCopy}
            >
              <span className="sr-only">Copy</span>
              <CopyIcon className="h-4 w-4" />
            </Button>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShareButton;
