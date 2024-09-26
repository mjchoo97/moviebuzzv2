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
import { EditForm } from "./EditForm";

const MovieAlertDialog = ({ score }: { score: number }) => {
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger>
          <div className=" flex flex-col justify-center items-center gap-5 w-[250px] px-2 py-2 lg:w-[300px] bg-green-700 lg:px-4 lg:py-4 rounded-xl border-b-4 border-r-4 active:border-b-0 active:border-r-0 border-green-900 hover:bg-gray-800">
            <div className="text-3xl lg:text-4xl flex">
              <p className="text-orange-300">{`Your `}</p> Score
            </div>
            <div className="text-3xl md:text-3xl lg:text-5xl">{score}</div>
          </div>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Pleae input your new score:</AlertDialogTitle>
            <AlertDialogDescription>
              <EditForm score={score} />
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            {/* <AlertDialogAction>Continue</AlertDialogAction> */}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MovieAlertDialog;
