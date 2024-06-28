import { Footer, Navbar } from "@/components";
import Transaction from "./components/Transaction";

function page() {
  return (
    <div>
      <Navbar />
      <Transaction />;
      <Footer />
    </div>
  );
}

export default page;
