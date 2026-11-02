import Hero from "@/components/home/Hero";
import PreviousEvents from "@/components/home/PreviousEvents";
import RecentEvents from "@/components/home/RecentEvents";

export default function Home() {
  return (
    <div >

      <Hero />
      <RecentEvents />
      <PreviousEvents />
    </div>
  );
}
