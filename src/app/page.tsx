import Feature from "@/components/homepage/Feature";
import Hero from "@/components/homepage/Hero";
import { RecommendedMovie } from "@/components/homepage/RecommendedMovie";

export default function Home() {
  return (
    <div className="min-h-screen">
      <div>
        <Hero />
      </div>
      <div>
        <Feature />
      </div>
      <div>
        <RecommendedMovie />
      </div>
    </div>
  );
}
