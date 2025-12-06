"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PictureCarrusel({ pictures }: { pictures: string[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1); // 1 para adelante, -1 para atrás

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % pictures.length);
    }, 8000); // Cambia cada 8 segundos

    return () => clearInterval(interval);
  }, [pictures.length]);

  const getPrevIndex = () =>
    (currentIndex - 1 + pictures.length) % pictures.length;
  const getNextIndex = () => (currentIndex + 1) % pictures.length;

  const handlePrevClick = () => {
    setDirection(-1);
    setCurrentIndex((currentIndex - 1 + pictures.length) % pictures.length);
  };

  const handleNextClick = () => {
    setDirection(1);
    setCurrentIndex((currentIndex + 1) % pictures.length);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -1000 : 1000,
      opacity: 0,
    }),
  };

  const sideImageVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 0.3,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <div className="relative p-4 w-full h-96 overflow-hidden rounded-lg shadow-lg">
      <h1 className="text-3xl mb-6  font-display font-bold text-cafe dark:text-madera text-center ">
        Our Featured Wooden Products
      </h1>
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Imagen previa (izquierda, transparente) */}
        <AnimatePresence initial={false} custom={direction} mode="sync">
          <motion.img
            key={`prev-${getPrevIndex()}`}
            src={pictures[getPrevIndex()]}
            alt={`Picture ${getPrevIndex() + 1}`}
            className="absolute left-0 w-1/3 h-full object-cover rounded-lg"
            custom={direction}
            variants={sideImageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 200, damping: 25 },
              opacity: { duration: 0.5 },
            }}
          />
        </AnimatePresence>

        {/* Imagen actual (centro, opaca con slide) */}
        <AnimatePresence initial={false} custom={direction} mode="sync">
          <motion.img
            key={currentIndex}
            src={pictures[currentIndex]}
            alt={`Picture ${currentIndex + 1}`}
            className="absolute w-1/3 h-full object-cover rounded-lg z-10 shadow-2xl"
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 200, damping: 25 },
              opacity: { duration: 0.5 },
            }}
          />
        </AnimatePresence>

        {/* Imagen siguiente (derecha, transparente) */}
        <AnimatePresence initial={false} custom={direction} mode="sync">
          <motion.img
            key={`next-${getNextIndex()}`}
            src={pictures[getNextIndex()]}
            alt={`Picture ${getNextIndex() + 1}`}
            className="absolute right-0 w-1/3 h-full object-cover rounded-lg"
            custom={direction}
            variants={sideImageVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 200, damping: 25 },
              opacity: { duration: 0.5 },
            }}
          />
        </AnimatePresence>
      </div>

      {/* Indicadores de posición */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
        {pictures.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "bg-azul dark:bg-verde scale-125"
                : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      {/* Botones de navegación */}
      <button
        onClick={handlePrevClick}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300 z-20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5 8.25 12l7.5-7.5"
          />
        </svg>
      </button>
      <button
        onClick={handleNextClick}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-all duration-300 z-20"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m8.25 4.5 7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </div>
  );
}
