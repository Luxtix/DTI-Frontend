import { Footer, Navbar } from "@/components";
import EventDetails from "./_components/EventDetails";

function page() {
  return (
    <div>
      <Navbar />
      <EventDetails />
      <Footer />
    </div>
  );
}

export default page;
