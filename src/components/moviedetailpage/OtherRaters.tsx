import { getOtherUserRating } from "@/lib/action";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const ReviewCard = (
  name: string | undefined,
  image: string | undefined,
  score: number,
  updatedTime: Date
) => {
  return (
    <div className="flex justify-between items-center max-w-[300px] overflow-hidden  transition-transform transform hover:scale-105 w-[300px] h-[100px] py-5 px-5 border-2 border-slate-400 rounded-lg bg-gradient-to-r from-gray-600 to-gray-700">
      <div className="flex flex-col justify-start h-full gap-3">
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
          <div className="italic text-sm">
            {`Updated: ${formatElapsedTime(new Date(updatedTime))}`}
          </div>
        </div>
      </div>

      <div className="font-bold border-2 border-slate-400 rounded-full w-16 h-16 flex justify-center items-center text-lg hover:shadow-[0px_-4px_26px_10px_#2d3748] bg-gradient-to-b from-orange-700 to-rose-800">
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
    <div className="flex flex-col gap-5 justify-center w-full items-center ">
      <div className="text-2xl md:text-3xl lg:text-3xl font-bold text-wrap flex flex-col md:flex-row lg:flex-row">
        <p>Hear the Buzz:&nbsp;</p>
        <p>Insights from the Hive!</p>
      </div>
      <div>
        {otherUsers.map((otheruser, i) => (
          <div
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6"
            key={i}
          >
            {ReviewCard(
              otheruser.user.account?.name,
              otheruser.user.account?.image,
              otheruser.rating,
              otheruser.updatedAt
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtherRaters;
