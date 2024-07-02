import Navbar from "@/components/Navbar";
import EventDetails from "./_components/EventDetails";
import Footer from "@/components/Footer";
import Review from "./_components/Review";

function page() {
  return (
    <div>
      <Navbar />
      <EventDetails />
      <Review />
      <Footer />
    </div>
  );
}

export default page;
