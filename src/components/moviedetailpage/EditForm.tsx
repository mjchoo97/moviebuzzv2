"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addMovie, deleteUserRating, editRating } from "@/lib/action";
import { useToast } from "@/hooks/use-toast";
import { useParams, useRouter } from "next/navigation";
import editFormSchema from "@/lib/EditFormSchema";
import { DialogClose } from "../ui/dialog";

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
import { useState } from "react";

export function EditForm({
  score,
  open,
  setOpen,
}: {
  score: number;
  open: boolean;
  setOpen: (value: boolean) => void;
}) {
  const { toast } = useToast();

  const router = useRouter();
  const params = useParams();
  const movieslug = params.id as string;

  const form = useForm<z.infer<typeof editFormSchema>>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      score: score,
    },
  });

  async function onSubmit(values: z.infer<typeof editFormSchema>) {
    console.log("enterd submit");
    const res = await editRating({
      rating: values.score,
      movieslug: movieslug,
    });

    if (res.success) {
      setOpen(false);
      router.refresh();
      toast({
        variant: "success",
        title: "Success!",
        description: "Score has been succesfully updated",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Uh Oh!",
        description: "Error updating score.",
      });
    }
  }

  async function onDeleteRating() {
    const res = await deleteUserRating(movieslug);
    if (res.success) {
      router.refresh();
      toast({
        variant: "success",
        title: "Removed Successfully",
        description: "Your rating has been removed.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Uh Oh!",
        description: "Error removing rating.",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full px-5 py-2 "
      >
        <div className="space-y-2">
          <FormField
            control={form.control}
            name="score"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-md">New Score</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Score"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className=" justify-end flex w-full">
            <AlertDialog>
              <AlertDialogTrigger>
                <div className="text-sm hover:text-red-600  text-muted-foreground">
                  Delete Rating?
                </div>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    your rating and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <DialogClose>
                    <AlertDialogAction onClick={() => onDeleteRating()}>
                      Continue
                    </AlertDialogAction>
                  </DialogClose>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <Button
            type="submit"
            variant="submit"
            className="text-lg h-10 w-40 font-bold"
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
