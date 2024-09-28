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
import { addMovie, editRating } from "@/lib/action";
import { useToast } from "@/hooks/use-toast";
import { useParams, useRouter } from "next/navigation";
import editFormSchema from "@/lib/EditFormSchema";
import { DialogClose } from "../ui/dialog";

export function EditForm({ score }: { score: number }) {
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
    const res = await editRating({
      rating: values.score,
      movieslug: movieslug,
    });

    if (res.success) {
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

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-full px-5 py-2 "
      >
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

        <div className="flex justify-center items-center">
          <DialogClose>
            <Button
              type="submit"
              variant="submit"
              className="text-lg h-10 w-40 font-bold"
            >
              Submit
            </Button>
          </DialogClose>
        </div>
      </form>
    </Form>
  );
}
