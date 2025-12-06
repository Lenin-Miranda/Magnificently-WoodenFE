"use client";

import { motion } from "framer-motion";

const processSteps = [
  {
    id: 1,
    title: "Design",
    description:
      "Our expert designers create unique airplane concepts that capture the beauty and elegance of aviation.",
    icon: (
      <svg
        className="w-12 h-12"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Craft",
    description:
      "Skilled artisans handcraft each wooden airplane with precision, using traditional woodworking techniques and premium wood.",
    icon: (
      <svg
        className="w-12 h-12"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
        />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Quality Check",
    description:
      "Every wooden airplane undergoes rigorous quality inspection to ensure smooth finish and perfect balance.",
    icon: (
      <svg
        className="w-12 h-12"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
  },
  {
    id: 4,
    title: "Delivery",
    description:
      "Carefully packaged and shipped to your doorstep, ready to delight children and collectors alike.",
    icon: (
      <svg
        className="w-12 h-12"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
        />
      </svg>
    ),
  },
];

export default function OurProcess() {
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center py-16 px-8 bg-azul dark:bg-madera relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-40 left-20 w-96 h-96 bg-madera rounded-full blur-3xl"></div>
        <div className="absolute bottom-40 right-20 w-96 h-96 bg-cafe dark:bg-verde rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl w-full relative z-10">
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-blanco dark:text-cafe mb-4">
            Our Process
          </h2>
          <p className="text-blanco/70 dark:text-cafe/70 text-lg max-w-2xl mx-auto">
            From concept to delivery, every step is carefully executed to bring
            you the finest handcrafted wooden airplanes.
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden md:block relative">
          {/* Connecting line */}
          <div className="absolute top-[50px] left-0 w-full h-1 bg-madera/30 dark:bg-cafe/30"></div>

          <div className="grid grid-cols-4 gap-8 relative">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.id}
                data-aos="fade-up"
                data-aos-delay={index * 200}
                className="flex flex-col items-center text-center relative"
              >
                {/* Icon circle */}
                <div className="bg-blanco dark:bg-verde dark:text-blanco text-cafe w-24 h-24 rounded-full flex items-center justify-center shadow-xl mb-6 relative z-10 hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>

                {/* Step number */}
                <div className="absolute -top-12 right-1/2 transform translate-x-1/2 bg-blanco text-cafe dark:text-blanco dark:bg-cafe font-bold w-8 h-8 rounded-full flex items-center justify-center text-sm">
                  {step.id}
                </div>

                <h3 className="text-2xl font-display font-bold text-blanco dark:text-cafe mb-3">
                  {step.title}
                </h3>
                <p className="text-blanco/70 dark:text-cafe/70 text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden space-y-8">
          {processSteps.map((step, index) => (
            <motion.div
              key={step.id}
              data-aos="fade-right"
              data-aos-delay={index * 150}
              className="flex gap-6 items-start"
            >
              <div className="flex-shrink-0">
                <div className="bg-azul dark:bg-verde text-blanco w-16 h-16 rounded-full flex items-center justify-center shadow-lg relative">
                  {step.icon}
                  <div className="absolute -top-2 -right-2 bg-cafe text-madera font-bold w-6 h-6 rounded-full flex items-center justify-center text-xs">
                    {step.id}
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-xl font-display font-bold text-blanco dark:text-cafe mb-2">
                  {step.title}
                </h3>
                <p className="text-blanco/70 dark:text-cafe/70 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
