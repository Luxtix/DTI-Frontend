import { Footer, Navbar, ProfileOrganizer, ProfileUser } from "@/components";

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
