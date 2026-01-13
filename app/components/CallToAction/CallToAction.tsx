"use client";

import { motion } from "framer-motion";

export default function CallToAction() {
  return (
    <section className="w-full min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background image overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-cafe/95 via-cafe/90 to-cafe/95 dark:from-azul/95 dark:via-azul/90 dark:to-azul/95"></div>

      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 bg-madera rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-verde rounded-full blur-3xl"></div>
      </div>

      {/* Pattern overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="relative z-10 max-w-5xl mx-auto px-8 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <div
            className="inline-block mb-6 px-6 py-2 bg-madera/20 dark:bg-verde/20 rounded-full text-sm font-medium text-blanco border border-madera/30"
            data-aos="fade-down"
          >
            ✨ Limited Time Offer
          </div>

          {/* Main heading */}
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-blanco mb-6 leading-tight"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Experience the Magic of
            <br />
            <span className="text-madera dark:text-verde">
              Handcrafted Flight
            </span>
          </h2>

          {/* Subheading */}
          <p
            className="text-lg md:text-xl text-blanco/90 max-w-3xl mx-auto mb-10 leading-relaxed"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            Discover beautifully handcrafted wooden airplanes that inspire
            imagination and bring joy to children and collectors. Each airplane
            tells a story of craftsmanship, tradition, and the timeless wonder
            of flight.
          </p>

          {/* CTA Buttons */}
          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            data-aos="fade-up"
            data-aos-delay="600"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-4 bg-madera dark:bg-verde text-cafe dark:text-blanco text-lg font-semibold rounded-full shadow-2xl hover:shadow-madera/50 transition-all duration-300 overflow-hidden min-w-[200px]"
            >
              <span className="relative z-10">Shop Collection</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-transparent border-2 border-blanco text-blanco text-lg font-semibold rounded-full hover:bg-blanco hover:text-cafe transition-all duration-300 min-w-[200px]"
            >
              View Catalog
            </motion.button>
          </div>

          {/* Trust indicators */}
          <div
            className="flex flex-wrap justify-center gap-8 mt-16 text-blanco/80"
            data-aos="fade-up"
            data-aos-delay="800"
          >
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-madera dark:text-verde"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Free Shipping</span>
            </div>

            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-madera dark:text-verde"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>30-Day Returns</span>
            </div>

            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-madera dark:text-verde"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Lifetime Warranty</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
