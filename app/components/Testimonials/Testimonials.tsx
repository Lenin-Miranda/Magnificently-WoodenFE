"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { testimonials } from "../../data/testimonials";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) return testimonials.length - 1;
      if (nextIndex >= testimonials.length) return 0;
      return nextIndex;
    });
  };

  return (
    <section
      className="w-full min-h-screen flex flex-col items-center justify-center py-16 px-4 md:px-8 bg-blanco dark:bg-madera relative overflow-hidden"
      data-aos="fade-up"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-96 h-96 bg-azul dark:bg-verde rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-madera rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl w-full relative z-10">
        <div data-aos="fade-down" className="text-center mb-12 px-4">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-cafe dark:text-cafe mb-4">
            What Our Customers Say
          </h2>
          <p className="text-cafe/70 dark:text-cafe/80 text-base md:text-lg max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers
            have to say about their experience.
          </p>
        </div>

        <div
          data-aos="zoom-in"
          className="relative min-h-[400px] md:h-[400px] flex items-center justify-center px-4 md:px-0"
        >
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              className="absolute w-full max-w-[240px] sm:max-w-md md:max-w-2xl lg:max-w-4xl"
            >
              <div className="bg-white dark:bg-cafe/50 rounded-2xl shadow-2xl p-6 md:p-8 lg:p-12 border border-madera/20">
                <div className="flex flex-col md:flex-row items-center gap-8">
                  <div className="flex-shrink-0">
                    <img
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      className="w-16 h-16 sm:w-20 sm:h-20 md:w-32 md:h-32 rounded-full border-4 border-azul dark:border-verde shadow-lg"
                    />
                  </div>

                  <div className="flex-1 text-center md:text-left">
                    <div className="flex justify-center md:justify-start gap-1 mb-4">
                      {[...Array(testimonials[currentIndex].rating)].map(
                        (_, i) => (
                          <svg
                            key={i}
                            className="w-4 h-4 md:w-6 md:h-6 text-azul dark:text-verde fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                          </svg>
                        )
                      )}
                    </div>

                    <p className="text-cafe dark:text-blanco text-xs sm:text-sm md:text-base lg:text-lg italic mb-4 md:mb-6 leading-relaxed">
                      "{testimonials[currentIndex].comment}"
                    </p>

                    <div>
                      <h4 className="text-sm sm:text-base md:text-lg lg:text-xl font-display font-bold text-cafe dark:text-cafe mb-1">
                        {testimonials[currentIndex].name}
                      </h4>
                      <p className="text-cafe/60 dark:text-cafe/80 text-xs sm:text-sm">
                        {testimonials[currentIndex].role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <button
            onClick={() => paginate(-1)}
            className="absolute left-2 md:left-0 lg:-left-16 z-10 bg-azul dark:bg-verde text-blanco p-3 md:p-4 rounded-full shadow-lg hover:brightness-110 transition-all duration-300 hover:scale-110"
            aria-label="Previous testimonial"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <button
            onClick={() => paginate(1)}
            className="absolute right-2 md:right-0 lg:-right-16 z-10 bg-azul dark:bg-verde text-blanco p-3 md:p-4 rounded-full shadow-lg hover:brightness-110 transition-all duration-300 hover:scale-110"
            aria-label="Next testimonial"
          >
            <svg
              className="w-5 h-5 md:w-6 md:h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-azul dark:bg-verde w-8"
                  : "bg-cafe/30 dark:bg-blanco/30 hover:bg-cafe/50 dark:hover:bg-blanco/50"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
