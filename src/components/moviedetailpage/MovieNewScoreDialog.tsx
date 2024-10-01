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

import { AddScoreForm } from "./AddScoreForm";
import { useState } from "react";

const MovieNewScoreDialog = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="text-shadow shadow-slate-900">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <div className="relative flex flex-col justify-center items-center gap-4 lg:gap-5 w-[250px] lg:w-[250px] px-2 py-2 bg-blue-900 lg:px-3 lg:py-3 rounded-xl border-2 border-slate-300 overflow-hidden  transition-transform transform hover:scale-105  ">
            <span className="top-0 right-0 animate-ping absolute  size-4 rounded-full bg-orange-200 opacity-75"></span>
            <span className="top-0 right-0 absolute inline-flex rounded-full size-4  bg-orange-400  opacity-90"></span>
            <div className="text-2xl lg:text-3xl flex">
              <p className="text-orange-300">Input</p>
            </div>
            <div className="text-2xl md:text-3xl lg:text-3xl">Score</div>
          </div>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Input score</DialogTitle>
            <DialogDescription>
              Input your score here. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <AddScoreForm open={open} setOpen={setOpen} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MovieNewScoreDialog;
