"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useState } from "react";
import { EditDetailForm } from "./EditDetailForm";

const EditMovieDetailsDialog = ({
  moviename,
  year,
  description,
  movieId,
}: {
  moviename: string;
  year: number;
  description: string | null;
  movieId: string;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="shadow-slate-900 text-shadow">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <img src="/edit-icon.svg" alt="edit icon" width={20} height={20} />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit score</DialogTitle>
          </DialogHeader>
          <EditDetailForm
            moviename={moviename}
            year={year}
            description={description}
            movieId={movieId}
            open={open}
            setOpen={setOpen}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditMovieDetailsDialog;
