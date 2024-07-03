import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Categories from "./components/Categories";
import PopularEvents from "./components/PopularEvents";
import OnlineEvents from "./components/OnlineEvents";
import Hero from "./components/Hero";
import CTA from "./components/CTA";

function page() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Categories />
      <PopularEvents />
      <OnlineEvents />
      <CTA />
      <Footer />
    </div>
  );
}

export default page;
