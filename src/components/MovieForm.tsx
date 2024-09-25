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

export function MovieForm() {
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      moviename: "",
      year: 0,
      description: "",
      score: 0,
      poster: undefined,
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the first selected file
    if (file) {
      form.setValue("poster", file); // Update form value for 'poster'
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const res = await addMovie(values);
    if (res.status) {
      toast({
        variant: "success",
        title: "Success!",
        description: "Movie has been succesfully updated",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Uh Oh!",
        description: "Error creating movie.",
      });
    }
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
          name="moviename"
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
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Year</FormLabel>
              <FormControl>
                <Input
                  placeholder="Movie released year..."
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="A brief description..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="score"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Score</FormLabel>
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
        <FormField
          control={form.control}
          name="poster"
          render={({}) => (
            <FormItem>
              <FormLabel>Poster</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  placeholder="Upload a poster"
                  onChange={handleFileChange} // Manually handle the file selection
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
