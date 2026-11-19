
import FeaturedEquipment from "@/components/home/FeaturedEquipment";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/How It Works";
import Subscription from "@/components/home/Subscription";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedEquipment />
      <WhyChooseUs />
      <HowItWorks />
      <Subscription />
    </>
  );
}
