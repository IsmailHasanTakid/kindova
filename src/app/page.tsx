import About from "@/components/home/About";
import Hero from "@/components/home/Hero";
import PreviousEvents from "@/components/home/PreviousEvents";
import RecentEvents from "@/components/home/RecentEvents";
import SubscribeSection from "@/components/home/SubscribeSection";

export default function Home() {
  return (
    <div >

      <Hero />
      <RecentEvents />
      <About />
      <PreviousEvents />
      <SubscribeSection />
    </div>
  );
}
