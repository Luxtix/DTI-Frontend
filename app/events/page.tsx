import { EventsTab, Footer, HeroEvent, Navbar } from "@/components";

function page() {
  return (
    <div>
      <Navbar />
      <HeroEvent />
      <EventsTab />
      <Footer />
    </div>
  );
}

export default page;
