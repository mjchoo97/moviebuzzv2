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

import { useRouter } from "next/navigation";

import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";

export function MovieForm() {
  const { toast } = useToast();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

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

  // const handleFileChange = (file: File) => {
  //   // console.log(e);

  //   if (file) {
  //     form.setValue("poster", file); // Update form value for 'poster'
  //   }
  // };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Do something with the files
    form.setValue("poster", acceptedFiles[0]);
    console.log(form.getValues("poster"));
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
        }
      );

      const responseData = await res.json();

      const { url } = responseData;
      console.log(`Link:${url}`);
      return url;
    } catch (err) {
      console.log(err);
    }
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    let url;
    if (values.poster) {
      console.log(values.poster);
      url = await uploadFile(values.poster);
    }

    const res = await addMovie({ ...values, poster: url });

    console.log("rerouted");
    if (res.success) {
      router.push(`/movie/${res?.movieslug}`);
      toast({
        variant: "success",
        title: "Success!",
        description: "Movie has been succesfully updated",
      });
      setLoading(false);
    } else {
      toast({
        variant: "destructive",
        title: "Uh Oh!",
        description: "Error creating movie.",
      });
    }
  }

  if (loading)
    return (
      <div className="h-screen flex item-center top-24 gap-5 text-2xl">
        Updating your movie
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );

  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl font-bold text-center text-gray-100 mb-6">
        <h1>Add A New Movie!</h1>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full md:w-[500px] lg:w-[500px] px-5 py-5 border-4 "
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
              <FormItem key={field.name}>
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
                  <div
                    {...getRootProps()}
                    className="border-2 border-dashed border-sky-700 px-2 h-[100px] gap-2 lg:gap-5 flex justify-center items-center"
                  >
                    <input {...getInputProps()} />
                    {form.getValues("poster") ? (
                      <div className="flex  justify-center items-center gap-5">
                        <Image
                          src={URL.createObjectURL(
                            form.getValues("poster") as File
                          )}
                          width={40}
                          height={40}
                          alt="uploaded image"
                          className="max-h-[400px] overflow-hidden object-cover"
                          key="upload-file"
                        />
                        <div>File uploaded</div>
                      </div>
                    ) : (
                      <>
                        <Image
                          src="/upload.svg"
                          width={40}
                          height={40}
                          alt="upload"
                          key="upload-icon"
                        />
                        <div className="">
                          <p className="">
                            <span className="text-orange-300 text-md">
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
    </div>
  );
}
