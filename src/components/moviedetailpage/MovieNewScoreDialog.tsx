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

const MovieNewScoreDialog = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className=" flex flex-col justify-center items-center gap-4 lg:gap-5 w-[250px] lg:w-[250px] px-2 py-2 bg-blue-700 lg:px-3 lg:py-3 rounded-xl border-b-4  active:border-b-0 active:border-r-0 border-sky-500 hover:bg-gray-800">
            <div className="text-2xl lg:text-3xl flex">
              <p className="text-orange-300">Input</p>
            </div>
            <div className="text-2xl md:text-3xl lg:text-3xl">Score</div>
          </div>
        </DialogTrigger>
        a
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Input score</DialogTitle>
            <DialogDescription>
              Input your score here. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <AddScoreForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MovieNewScoreDialog;
