import { FaWhatsapp } from "react-icons/fa";
import Link from "next/link";
import Header from "./components/Header";
import Footer from "./components/Footer";

const Secondary = () => {
  return (
    <div className="relative h-full">
      <div>
        <Header/>
        <Footer/>      
      </div>

      <Link 
        href="https://wa.me/+923074081226" // Replace with your WhatsApp number
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 p-4 rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300 z-50"
        aria-label="Chat on WhatsApp"
      >
        <FaWhatsapp className="text-white text-3xl" />
      </Link>
    </div>
  );
};

export default Secondary;