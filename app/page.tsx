'use client';

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/app/components/Header";
import Hero from "@/app/components/Hero";
import Parcours from "@/app/components/Parcours";
import Welcome from "@/app/components/Welcome";

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true);

  const handleScrollPast = () => {
    setShowWelcome(false);
  };

  useEffect(() => {
    if (!showWelcome) {
      window.scrollTo(0, 0);
    }
  }, [showWelcome]);

  return (
    <>
      <AnimatePresence mode="wait">
        {showWelcome && <Welcome key="welcome" onScrollPast={handleScrollPast} />}
      </AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <Header />
        <main>
          <Hero />
          <Parcours />
          <div className="container mx-auto px-4 py-16 space-y-20">
            <section id="competences">
              {/* Contenu de la section Compétences */}
            </section>
            <section id="projets">
              {/* Contenu de la section Projets */}
            </section>
            <section id="contact">
              {/* Contenu de la section Contact */}
            </section>
          </div>
        </main>
      </motion.div>
    </>
  );
}