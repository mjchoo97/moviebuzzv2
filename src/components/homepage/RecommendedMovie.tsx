import { FocusCards } from "@/components/ui/focus-cards";
import { getRecommendedMovie } from "@/lib/action";

export async function RecommendedMovie() {
  const recommends = await getRecommendedMovie();

  if (!recommends) {
    return <></>;
  }

  return (
    <div className="pb-24 flex flex-col">
      <div className="text-3xl flex justify-center mb-5 text-neutral-200">
        <span>Lets Get Started</span>
      </div>
      <FocusCards cards={recommends} />
    </div>
  );
}
