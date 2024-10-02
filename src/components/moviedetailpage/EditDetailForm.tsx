"use client";
import AddMovieBreadCrumb from "@/components/addmovie/AddMovieBreadCrumb";
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

import { addMovie, editMovieDetail } from "@/lib/action";
import { useToast } from "@/hooks/use-toast";

import { useRouter } from "next/navigation";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Skeleton } from "../ui/skeleton";
import detailFormSchema from "@/lib/MovieDetailFormSchema";

export function EditDetailForm({
  moviename,
  year,
  description,
  movieId,
  open,
  setOpen,
}: {
  moviename: string;
  year: number;
  description: string | null;
  movieId: string;
  open: boolean;
  setOpen: (value: boolean) => void;
}) {
  const { toast } = useToast();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof detailFormSchema>>({
    resolver: zodResolver(detailFormSchema),
    defaultValues: {
      moviename: moviename,
      year: year,
      description: description ? description : "",
    },
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    form.setValue("poster", acceptedFiles[0]);
    // console.log(form.getValues("poster"));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  const uploadFile = async (file: File) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "moviebuzz");
    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dux8azcnu/image/upload",
        {
          method: "POST",
          body: data,
        },
      );

      const responseData = await res.json();

      const { url } = responseData;

      return url;
    } catch (err) {
      console.log(err);
    }
  };

  async function onSubmit(values: z.infer<typeof detailFormSchema>) {
    setLoading(true);

    let url = undefined;
    if (values.poster) {
      console.log(values.poster);
      url = await uploadFile(values.poster);
    }

    const res = await editMovieDetail(
      values.moviename,
      values.year,
      values.description,
      url,
      movieId,
    );
    setOpen(false);
    if (res.success) {
      router.push(`/movie/${res?.movieslug}`);
      toast({
        variant: "success",
        title: "Success!",
        description: "Movie has been succesfully updated",
      });
      // setLoading(false);
    } else {
      toast({
        variant: "destructive",
        title: "Uh Oh!",
        description: "Error creating movie.",
      });
    }
  }

  return (
    <div className="flex flex-col items-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  <Input placeholder="A brief description ..." {...field} />
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
                  <div
                    {...getRootProps()}
                    className="flex h-[50px] items-center justify-center gap-2 border-2 border-dashed border-sky-700 px-2 lg:gap-3">
                    <input {...getInputProps()} />
                    {form.getValues("poster") ? (
                      <div className="flex items-center justify-center gap-5">
                        <Image
                          src={URL.createObjectURL(
                            form.getValues("poster") as File,
                          )}
                          width={30}
                          height={30}
                          alt="uploaded image"
                          className="max-h-[400px] overflow-hidden object-cover"
                          key="upload-file"
                        />
                        <div>{form.getValues("poster")?.name}</div>
                      </div>
                    ) : (
                      <>
                        <Image
                          src="/upload.svg"
                          width={30}
                          height={30}
                          alt="upload"
                          key="upload-icon"
                        />
                        <div className="">
                          <p className="">
                            <span className="md:text-md lg:text-md text-sm text-orange-300">
                              Click to upload{" "}
                            </span>
                            or drag and drop
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-center">
            <Button
              type="submit"
              variant={loading ? "processing" : "submit"}
              className={`h-10 w-40 text-lg font-bold`}
              disabled={loading}>
              {loading && (
                <svg
                  aria-hidden="true"
                  className="size-6 animate-spin fill-slate-200 text-gray-200 dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              )}
              <span className="pl-2">{loading ? "Submitting" : "Submit"}</span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
