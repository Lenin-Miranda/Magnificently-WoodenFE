import Image from "next/image";
import woodenPlane from "../../../public/trasnparent-wooden-plane-removebg-preview.png";
export function About() {
  return (
    <section className="flex justify-center items-center dark:bg-madera relative bg-azul text-white dark:text-cafe w-full py-12 px-4 md:px-8 min-h-screen">
      <div className="max-w-4xl mx-auto flex flex-col justify-start">
        <div className="mt-8" data-aos="fade-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 dark:text-cafe font-display text-madera">
            About Magnificently Wooden
          </h2>
          <p className="text-base md:text-lg leading-relaxed mb-2">
            Magnificently Wooden is dedicated to crafting exquisite wooden
            aircraft models and decorative planes that combine traditional
            craftsmanship with aviation inspiration. Our pieces are meticulously
            handcrafted by skilled artisans using sustainably sourced wood,
            ensuring each aircraft model is not only beautiful but also
            environmentally responsible.
          </p>
          <p className="text-base md:text-lg leading-relaxed">
            We believe in the power of wood to capture the elegance and spirit
            of flight. Whether you&apos;re an aviation enthusiast, collector, or
            looking for unique decorative pieces, Magnificently Wooden offers a
            range of aircraft models and aviation-inspired wooden crafts to suit
            your passion and style.
          </p>
        </div>
        <div className="mt-8" data-aos="fade-right">
          <h3 className="text-xl md:text-2xl font-semibold mb-2 dark:text-cafe font-display text-madera">
            Our Mission
          </h3>
          <p className="text-base md:text-lg leading-relaxed">
            Our mission is to provide high-quality wooden aircraft models that
            celebrate the beauty of aviation while promoting sustainability and
            traditional craftsmanship. We are committed to delivering
            exceptional detail and customer satisfaction through our dedication
            to precision and authentic design inspired by real aircraft.
          </p>
        </div>
        <div className="mt-8 flex flex-col justify-center" data-aos="fade-left">
          <h3 className="text-xl md:text-2xl font-semibold text-left dark:text-cafe font-display text-madera mb-2">
            Why choose magnificently wooden?
          </h3>
          <p className="text-base md:text-lg leading-relaxed text-left max-w-full">
            At Magnificently Wooden, we pride ourselves on our attention to
            aerodynamic detail, use of premium wood materials, and commitment to
            aviation authenticity. Our aircraft models are designed to be
            treasured collectibles, becoming a cherished part of your collection
            or display for years to come. Experience the wonder of flight
            through the warmth and elegance of handcrafted wooden aircraft with
            Magnificently Wooden.
          </p>
        </div>
      </div>
      <div className="absolute bottom-4 right-8 text-sm italic text-white/50">
        Crafted with passion for aviation by Magnificently Wooden
      </div>
    </section>
  );
}
