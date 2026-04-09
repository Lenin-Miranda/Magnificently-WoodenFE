"use client";

import NavBar from "./components/NavBar/NavBar";
import Hero from "./components/Hero/Hero";
import FeatureProducts from "./components/FeatureProducts/FeatureProducts";
import Testimonials from "./components/Testimonials/Testimonials";
import OurProcess from "./components/OurProcess/OurProcess";
import CallToAction from "./components/CallToAction/CallToAction";
import Footer from "./components/Footer/Footer";
import CartModal from "./components/cartModal/CartModal";
import { useEffect } from "react";
import { About } from "./components/About/About";
import { useProducts } from "./context/ProductContext";
import woodenPlane from "../public/pngtree-wooden-toy-airplane-png-image_13246257-removebg-preview.png";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease",
    });
  }, []);
  const { products, fetchProducts } = useProducts();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex w-full min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-cafe">
      <main className="flex min-h-screen w-full flex-col items-center justify-start bg-white dark:bg-cafe sm:items-start">
        <NavBar />
        <Hero />
        <About />
        <FeatureProducts products={products} />
        <OurProcess />
        <CallToAction />
        <Testimonials />
        <Footer />
        <CartModal />
      </main>
    </div>
  );
}
