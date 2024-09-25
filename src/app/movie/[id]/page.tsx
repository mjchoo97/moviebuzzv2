import Image from "next/image";
import React from "react";

const MoviePage = ({ params }: { params: { id: string } }) => {
  const id = params.id;
  console.log(id);
  return (
    <div>
      <div className="py-10 bg-slate-40 flex flex-col justify-center items-center md:flex-row lg:flex-row lg:h-[calc(100vh-200px)] lg:gap-20 ">
        <div className=" h-[350px] w-full lg:h-full lg:w-[500px]">
          <div className="relative w-full h-full ">
            <Image
              src="https://res.cloudinary.com/dux8azcnu/image/upload/v1691509630/moviebuzz/ki1afqori7qqwjz7uyyl.jpg"
              alt="movie"
              layout="fill" // Use layout instead of fill
              objectFit="contain" // Ensures the image scales while maintaining its aspect ratio
            />
          </div>
        </div>
        <div className="w-full lg:h-full  lg:w-[700px] ">
          <div className="py-5 flex flex-col items-center ">
            <div className="text-3xl lg:text-6xl ">
              Dungeuons and the Dragons
            </div>
            <div className="w-full py-10 text-1xl lg:text-lg lg:h-[300px] ">
              <p className="text-ellipsis overflow-hidden ... w-full h-full">
                test
              </p>
            </div>
            <div className="text-3xl md:text-3xl lg:text-5xl">70</div>
          </div>
        </div>
      </div>
      <div className="bg-white w-full">Bottom section</div>
    </div>
  );
};

export default MoviePage;
