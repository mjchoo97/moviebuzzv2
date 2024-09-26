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

import { addMovie } from "@/lib/action";
import { useToast } from "@/hooks/use-toast";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import editFormSchema from "@/lib/EditFormSchema";

export function EditForm({ score }: { score: number }) {
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof editFormSchema>>({
    resolver: zodResolver(editFormSchema),
    defaultValues: {
      score: score,
    },
  });

  async function onSubmit(values: z.infer<typeof editFormSchema>) {
    // const res = await addMovie({ ...values });
    // console.log("rerouted");
    // if (res.success) {
    //   router.push(`/movie/${res?.movieslug}`);
    //   toast({
    //     variant: "success",
    //     title: "Success!",
    //     description: "Movie has been succesfully updated",
    //   });
    // } else {
    //   toast({
    //     variant: "destructive",
    //     title: "Uh Oh!",
    //     description: "Error creating movie.",
    //   });
    // }
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 w-[500px] px-5 py-5 "
      >
        <FormField
          control={form.control}
          name="score"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Movie Name</FormLabel>
              <FormControl>
                <Input placeholder="Name of the movie" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
