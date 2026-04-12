import Image from "next/image";
import Main from "@/app/components/main/page";
import Footer from "@/app/components/footer/page";
import Navbar from "@/app/components/navbar/page";




export default function Home() {
  return (
    <>
      <nav>
        <Navbar />
      </nav>

      < main>
        <Main />
      </main>

      <footer>
        <Footer />
      </footer>

    </>
  );
}