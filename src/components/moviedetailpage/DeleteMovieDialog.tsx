"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteMovieProfile } from "@/lib/action";
import { useParams, useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";

const DeleteMovieDialog = () => {
  const router = useRouter();
  const params = useParams();

  const movieslug = params.id as string;

  async function onDeleteRating() {
    const res = await deleteMovieProfile(movieslug);
    if (res.success) {
      router.push("/");
      toast({
        variant: "success",
        title: "Removed Successfully",
        description: "The movie has been removed.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Uh Oh!",
        description: "Error removing movie.",
      });
    }
  }
  return (
    <div>
      {" "}
      <AlertDialog>
        <AlertDialogTrigger className="flex items-center h-full">
          <div className="text-sm hover:text-red-600  text-muted-foreground">
            <img
              src="/delete-icon.svg"
              alt="deletebutton"
              width={20}
              height={20}
            />
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              movie and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction onClick={() => onDeleteRating()}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteMovieDialog;
