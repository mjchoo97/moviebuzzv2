import { getOtherUserRating } from "@/lib/action";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ReviewCard = (
  name: string | undefined,
  image: string | undefined,
  score: number,
  updatedTime: Date,
) => {
  return (
    <div className="flex h-[100px] w-[300px] max-w-[300px] transform items-center justify-between overflow-hidden rounded-lg border-2 border-slate-400 bg-gradient-to-r from-gray-600 to-gray-700 px-5 py-5 transition-transform hover:scale-105">
      <div className="flex h-full flex-col justify-start gap-3">
        <div className="flex items-center gap-5">
          <div>
            <Avatar>
              <AvatarImage src={image} />
              <AvatarFallback>BZ</AvatarFallback>
            </Avatar>
          </div>
          <div className="text-lg">{name && maskName(name)}</div>
        </div>

        <div>
          <div className="text-sm italic">
            {`Updated: ${formatElapsedTime(new Date(updatedTime))}`}
          </div>
        </div>
      </div>

      <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-slate-400 bg-gradient-to-b from-orange-700 to-rose-800 text-lg font-bold hover:shadow-[0px_-4px_26px_10px_#2d3748]">
        {score.toFixed(1)}
      </div>
    </div>
  );
};

function formatElapsedTime(date: Date) {
  const now = new Date();
  const elapsed = now.getTime() - date.getTime(); // Get the difference in milliseconds
  const seconds = Math.floor(elapsed / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  return `${seconds} second${seconds > 1 ? "s" : ""} ago`;
}

function maskName(name: string) {
  if (!name || name.length < 3) return name; // Return the name as is if it's too short to mask.

  // Calculate the number of characters to show at the beginning and end
  const visibleStart = 1; // Number of characters to show at the beginning
  const visibleEnd = 1; // Number of characters to show at the end
  const maskedLength = name.length - visibleStart - visibleEnd;

  // Create the masked name using the specified number of asterisks
  const masked =
    name.substring(0, visibleStart) +
    "*".repeat(maskedLength) +
    name.substring(name.length - visibleEnd);

  return masked;
}

const OtherRaters = async ({ movieslug }: { movieslug: string }) => {
  const otherUsers = await getOtherUserRating(movieslug);
  // if (otherUsers?.length > 0) {
  //   console.log(otherUsers[0].user.account);
  // }

  if (!otherUsers || typeof otherUsers == "undefined") {
    return;
    <></>;
  }

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <div className="flex flex-col text-wrap text-2xl font-bold md:flex-row md:text-3xl lg:flex-row lg:text-3xl">
        <p>Hear the Buzz:&nbsp;</p>
        <p>Insights from the Hive!</p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-3">
        {otherUsers.map((otheruser, i) => (
          <div key={i}>
            {ReviewCard(
              otheruser.user.account?.name,
              otheruser.user.account?.image,
              otheruser.rating,
              otheruser.updatedAt,
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtherRaters;
