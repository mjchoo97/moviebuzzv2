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

import { EditForm } from "./EditForm";
import { useState } from "react";

const MovieDialog = ({ score }: { score: number }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="text-shadow shadow-slate-900">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div className=" flex flex-col justify-center items-center gap-5 w-[250px] lg:w-[250px] px-2 py-2 bg-green-700 lg:px-3 lg:py-3 rounded-xl border-2 border-slate-300 overflow-hidden  transition-transform transform hover:scale-105 ">
            <div className="text-2xl lg:text-3xl flex">
              <p className="text-orange-300">Your</p>Score
            </div>
            <div className="text-3xl md:text-3xl lg:text-5xl">
              {score.toFixed(1)}
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit score</DialogTitle>
            <DialogDescription>
              Make changes to your score here. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <EditForm score={score} open={open} setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MovieDialog;
