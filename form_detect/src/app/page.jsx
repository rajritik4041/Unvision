import Image from "next/image";
import Main from "@/app/Components/main/page";
import Footer from "@/app/Components/footer/page";
import Navbar from "@/app/Components/navbar/page";




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