import Navbar from "@/components/Navbar";
import Dashboard from "./_components";
import Review from "../events/[id]/_components/Review";
import Footer from "@/components/Footer";

function page() {
  return (
    <div>
      <Navbar />
      <Dashboard />
      <Review />
      <Footer />
    </div>
  );
}

export default page;
