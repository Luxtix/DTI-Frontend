import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Categories from "./components/Categories";
import PopularEvents from "./components/PopularEvents";
import OnlineEvents from "./components/OnlineEvents";
import Newsletter from "./components/Newsletter";
import Hero from "./components/Hero";

function page() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Categories />
      <PopularEvents />
      <OnlineEvents />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default page;
