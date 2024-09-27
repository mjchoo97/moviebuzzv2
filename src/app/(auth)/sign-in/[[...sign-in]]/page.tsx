import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="h-[calc(100vh-90px)] flex justify-center items-center">
      <SignIn />
    </div>
  );
}
