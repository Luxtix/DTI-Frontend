import Navbar from "@/components/Navbar";
import Footer from "@/components/Navbar";
import ProfileOrganizer from "./_components/ProfileOrganizer";
import ProfileUser from "./_components/ProfileUser";

function page() {
  return (
    <div>
      <Navbar />
      <ProfileUser />
      <ProfileOrganizer />
      <Footer />
    </div>
  );
}

export default page;
