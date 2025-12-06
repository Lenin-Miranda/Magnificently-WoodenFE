import Image from "next/image";
import woodenPlane from "../../../public/trasnparent-wooden-plane-removebg-preview.png";
export function About() {
  return (
    <section className="dark:bg-madera relative bg-azul text-white dark:text-cafe w-full py-12 px-4 md:px-8 min-h-screen">
      <div className="max-w-4xl mx-auto flex flex-col justify-start">
        <div className="mt-8" data-aos="fade-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 dark:text-cafe font-display text-madera">
            About Magnificently Wooden
          </h2>
          <p className="text-base md:text-lg leading-relaxed">
            Magnificently Wooden is dedicated to crafting exquisite wooden
            furniture that combines timeless design with modern functionality.
            Our pieces are meticulously handcrafted by skilled artisans using
            sustainably sourced wood, ensuring each item is not only beautiful
            but also environmentally responsible.
          </p>
          <p className="text-base md:text-lg leading-relaxed mt-4">
            We believe in the power of wood to transform spaces and create warm,
            inviting atmospheres. Whether you're looking for a statement piece
            or everyday furniture, Magnificently Wooden offers a range of styles
            to suit your taste and lifestyle.
          </p>
        </div>
        <div className="mt-8" data-aos="fade-right">
          <h3 className="text-xl md:text-2xl font-semibold mb-4 dark:text-cafe font-display text-madera">
            Our Mission
          </h3>
          <p className="text-base md:text-lg leading-relaxed">
            Our mission is to provide high-quality wooden furniture that
            enhances the beauty of your home while promoting sustainability and
            craftsmanship. We are committed to delivering exceptional value and
            customer satisfaction through our dedication to quality and design.
          </p>
        </div>
        <div className="mt-8 flex flex-col justify-center" data-aos="fade-left">
          <h3 className="text-xl md:text-2xl font-semibold text-left dark:text-cafe font-display text-madera mb-4">
            Why choose magnificently wooden?
          </h3>
          <p className="text-base md:text-lg leading-relaxed mt-4 text-left max-w-2xl">
            At Magnificently Wooden, we pride ourselves on our attention to
            detail, use of premium materials, and commitment to customer
            satisfaction. Our furniture is designed to last a lifetime, becoming
            a cherished part of your home for years to come. Experience the
            warmth and elegance of handcrafted wooden furniture with
            Magnificently Wooden.
          </p>
        </div>
      </div>
      <div className="absolute bottom-4 right-8 text-sm italic text-white/50">
        Crafted with care by Magnificently Wooden
      </div>
    </section>
  );
}
