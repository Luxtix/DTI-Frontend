import {
  Categories,
  Footer,
  Hero,
  Navbar,
  Newsletter,
  OnlineEvents,
  PopularEvents,
} from "@/components";

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
