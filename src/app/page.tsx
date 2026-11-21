
import CategoriesSection from "@/components/home/CategoriesSection";
import FeaturedEquipment from "@/components/home/FeaturedEquipment";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/How It Works";
import ReviewsSection from "@/components/home/ReviewsSection";
import Subscription from "@/components/home/Subscription";
import TrustedOwnersSection from "@/components/home/TrustedOwnersSection";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedEquipment />
      <CategoriesSection />
      <WhyChooseUs />
      <TrustedOwnersSection />
      <HowItWorks />
      <ReviewsSection />
      <Subscription />
    </>
  );
}
