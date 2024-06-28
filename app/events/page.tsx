import Navbar from "@/components/Navbar";
import EventsTab from "./_components/EventsTab";
import Footer from "@/components/Footer";
import HeroEvent from "./_components/HeroEvent";


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

