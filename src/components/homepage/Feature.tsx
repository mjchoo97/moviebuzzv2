import { getTotalMoieAndUser } from "@/lib/action";

const Feature = async () => {
  const count = await getTotalMoieAndUser();

  return (
    <div className="flex h-[45rem] flex-col items-center gap-20 md:h-[30rem] lg:h-[30rem]">
      <div className="flex flex-col items-center gap-5">
        <div className="text-2xl text-neutral-200 md:text-3xl lg:text-3xl">
          Join the Buzz Commmunity
        </div>
        <div className="text-2xl text-neutral-300">Tell us your thoughts!</div>
      </div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-52 lg:grid-cols-2 lg:gap-52">
        <div className="flex h-[200px] w-[200px] max-w-[200px] transform flex-col items-center justify-center gap-5 overflow-hidden rounded-xl bg-gray-700 bg-opacity-25 px-2 py-2 shadow-[0px_0px_19px_0px_#f7fafc] transition-transform hover:scale-105">
          <div className="flex items-center gap-3">
            <span className="text-5xl text-yellow-500">
              {count?.totalMovie}
            </span>
            <img src="/popcorn.svg" alt="popcorn" width="40" height="40" />
          </div>

          <span className="text-2xl text-neutral-400">Movies Rated</span>
        </div>
        <div className="flex h-[200px] w-[200px] max-w-[200px] transform flex-col items-center justify-center gap-5 overflow-hidden rounded-xl bg-gray-700 bg-opacity-25 px-2 py-2 shadow-[0px_0px_19px_0px_#f7fafc] transition-transform hover:scale-105">
          <div className="flex items-center gap-3">
            <span className="text-5xl text-yellow-500">{count?.totalUser}</span>
            <img src="/profile.svg" alt="popcorn" width="40" height="40" />
          </div>

          <span className="text-2xl text-neutral-400">Buzzer Joined</span>
        </div>
      </div>
    </div>
  );
};

export default Feature;
