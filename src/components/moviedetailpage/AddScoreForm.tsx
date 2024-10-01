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
import formSchema from "@/lib/MovieFormSchema";

import { addMovie, addRating, editRating } from "@/lib/action";
import { useToast } from "@/hooks/use-toast";
import { revalidatePath } from "next/cache";
import { useParams, useRouter } from "next/navigation";
import editFormSchema from "@/lib/EditFormSchema";
import { DialogClose } from "../ui/dialog";

export function AddScoreForm({
  open,
  setOpen,
}: {
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
      score: 10,
    },
  });

  async function onSubmit(values: z.infer<typeof editFormSchema>) {
    const res = await addRating({
      rating: values.score,
      movieslug: movieslug,
    });
    if (res.success) {
      setOpen(false);
      router.refresh();
      toast({
        variant: "success",
        title: "Success!",
        description: "Score has been succesfully input",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Uh Oh!",
        description: "Error inputting score.",
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
