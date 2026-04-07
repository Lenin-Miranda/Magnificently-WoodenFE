"use client";

import Image from "next/image";
import TypewriterText from "../TypewriterText/TypewriterText";
import heroBg from "../../../public/hero_bg.png";

export default function Hero() {
  return (
    <section className="relative flex border-b border-madera/40 min-h-[calc(100vh-88px)] justify-center items-center w-full overflow-hidden py-12">
      {/* Background image */}
      <Image
        src={heroBg}
        alt="Hero background"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Overlay — light: blanco suave, dark: cafe profundo */}
      <div className="absolute inset-0 bg-blanco/70 dark:bg-cafe/85" />

      {/* Content */}
      <div
        className="relative z-10 flex flex-col items-center w-full max-w-6xl mx-auto px-6 md:px-8 text-center"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        {/* Heading */}
        <h1 className="max-w-full font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight">
          <span className="text-cafe dark:text-madera">
            <TypewriterText text="Welcome to" className="inline-block" />
          </span>
          <br />
          <TypewriterText
            text="Magnificently Wooden"
            className="inline-block bg-gradient-to-r from-azul to-azul/60 dark:from-madera dark:to-madera/60 bg-clip-text text-transparent [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]"
            delay={1000}
          />
        </h1>

        {/* Ornament divider */}
        <div className="flex items-center gap-4 my-8 w-full max-w-xs">
          <div className="flex-1 h-px bg-madera/50 dark:bg-madera/30" />
          <span className="text-madera dark:text-madera/70 text-lg">✦</span>
          <div className="flex-1 h-px bg-madera/50 dark:bg-madera/30" />
        </div>

        {/* Subtitle */}
        <p
          data-aos="fade-up"
          data-aos-delay="400"
          className="max-w-2xl text-base md:text-lg font-sans text-cafe/70 dark:text-blanco/75 leading-relaxed"
        >
          Your one-stop shop for all things wooden! Explore our exquisite
          collection of handcrafted wooden products that bring warmth and
          elegance to your home.
        </p>

        {/* CTA Buttons */}
        <div
          data-aos="fade-up"
          data-aos-delay="500"
          className="flex gap-4 mt-10 flex-wrap justify-center"
        >
          <button className="group relative rounded-full bg-azul dark:bg-verde px-10 py-3.5 text-base md:text-lg font-semibold text-blanco hover:brightness-110 hover:scale-105 transition-all duration-300 ease-in-out shadow-lg hover:shadow-2xl cursor-pointer overflow-hidden">
            <span className="relative z-10">Shop Now</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>

          <button className="rounded-full border-2 border-cafe dark:border-madera px-10 py-3.5 text-base md:text-lg font-semibold text-cafe dark:text-madera hover:bg-cafe/10 dark:hover:bg-madera/10 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer">
            Learn More
          </button>
        </div>

        {/* Stats */}
        <div
          data-aos="fade-up"
          data-aos-delay="600"
          className="flex gap-8 md:gap-16 mt-16 text-center flex-wrap justify-center"
        >
          <div>
            <div className="text-3xl md:text-4xl font-display font-bold text-azul dark:text-madera">
              500+
            </div>
            <div className="text-xs md:text-sm text-cafe/60 dark:text-blanco/60 mt-1">
              Products
            </div>
          </div>
          <div className="w-px bg-madera/40 hidden md:block" />
          <div>
            <div className="text-3xl md:text-4xl font-display font-bold text-azul dark:text-madera">
              1000+
            </div>
            <div className="text-xs md:text-sm text-cafe/60 dark:text-blanco/60 mt-1">
              Happy Customers
            </div>
          </div>
          <div className="w-px bg-madera/40 hidden md:block" />
          <div>
            <div className="text-3xl md:text-4xl font-display font-bold text-azul dark:text-madera">
              15+
            </div>
            <div className="text-xs md:text-sm text-cafe/60 dark:text-blanco/60 mt-1">
              Years Experience
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
