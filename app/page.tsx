import {
  Categories,
  Footer,
  Hero,
  Navbar,
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
      <Footer />
    </div>
  );
}

export default page;
