import { Categories, Footer, Hero, Navbar, PopularEvents } from "@/components";

function page() {
  return (
    <div>
      <Navbar />
      <Hero />
      <Categories />
      <PopularEvents />
      <Footer />
    </div>
  );
}

export default page;
