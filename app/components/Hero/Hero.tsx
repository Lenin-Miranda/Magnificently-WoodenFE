"use client";

import Image from "next/image";
import TypewriterText from "../TypewriterText/TypewriterText";
import woodenPlane from "../../../public/trasnparent-wooden-plane-removebg-preview.png";

export default function Hero() {
  return (
    <section className="relative flex border-b border-madera/40 min-h-[calc(100vh-88px)] justify-center items-center w-full overflow-hidden py-12">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-madera rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-azul dark:bg-verde rounded-full blur-3xl"></div>
      </div>

      <div
        className="flex flex-1 py-6 flex-col items-center w-full justify-center px-4 md:px-20 text-center relative z-10"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div className="px-4 py-1 bg-madera/10 dark:bg-madera/20 rounded-full text-xs md:text-sm font-medium text-cafe dark:text-madera border border-madera/30">
          ✨ Handcrafted Excellence
        </div>

        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-cafe dark:text-madera leading-tight mt-6">
          <TypewriterText text="Welcome to " className="inline-block" />
          <br />
          <span className="text-azul dark:text-verde bg-gradient-to-r from-azul to-azul/70 dark:from-verde dark:to-verde/70 bg-clip-text">
            <TypewriterText
              text="Magnificently Wooden"
              className="inline-block"
              delay={1000}
            />
          </span>
        </h1>

        <p
          data-aos="fade-right"
          data-aos-delay="4000"
          className="mt-6 max-w-2xl text-sm sm:text-base md:text-lg font-sans text-cafe/70 dark:text-blanco/90 leading-relaxed px-4"
        >
          Your one-stop shop for all things wooden! Explore our exquisite
          collection of handcrafted wooden products that bring warmth and
          elegance to your home.
        </p>

        <div
          data-aos="fade-up"
          data-aos-delay="4400"
          className="flex gap-4 mt-8 flex-wrap justify-center"
        >
          <button className="group relative rounded-full bg-azul dark:bg-verde px-8 py-3 text-lg font-semibold text-blanco hover:brightness-110 hover:scale-105 transition-all duration-300 ease-in-out shadow-lg hover:shadow-2xl cursor-pointer overflow-hidden">
            <span className="relative z-10">Shop Now</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </button>

          <button className="rounded-full border-2 border-azul dark:border-verde px-8 py-3 text-lg font-semibold text-azul dark:text-verde hover:bg-azul/10 dark:hover:bg-verde/10 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
            Learn More
          </button>
        </div>

        {/* Social proof / stats */}
        <div
          data-aos="fade-up"
          data-aos-delay="5000"
          className="flex gap-8 mt-12 text-center flex-wrap justify-center"
        >
          <div>
            <div className="text-3xl font-display font-bold text-azul dark:text-verde">
              500+
            </div>
            <div className="text-sm text-cafe/60 dark:text-blanco/60">
              Products
            </div>
          </div>
          <div className="w-px bg-madera/30"></div>
          <div>
            <div className="text-3xl font-display font-bold text-azul dark:text-verde">
              1000+
            </div>
            <div className="text-sm text-cafe/60 dark:text-blanco/60">
              Happy Customers
            </div>
          </div>
          <div className="w-px bg-madera/30"></div>
          <div>
            <div className="text-3xl font-display font-bold text-azul dark:text-verde">
              15+
            </div>
            <div className="text-sm text-cafe/60 dark:text-blanco/60">
              Years Experience
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex mb-8 w-1/2 flex-1 flex-col items-center justify-center px-8 md:px-20 text-center relative">
        <Image
          data-aos="fade-left"
          data-aos-delay="300"
          className="relative mt-8 w-full max-w-md h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-500"
          src={woodenPlane}
          alt="Wooden Products Banner"
          priority
        />
      </div>
    </section>
  );
}
