import Navbar from "@/components/Navbar";
import ProfileOrganizer from "./_components/ProfileOrganizer";
import ProfileUser from "./_components/ProfileUser";
import Footer from "@/components/Footer";

function page() {
  return (
    <div>
      <Navbar />
      <ProfileUser />
      <Footer />
    </div>
  );
}

export default page;
