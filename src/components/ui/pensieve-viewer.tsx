"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

export function PensieveViewer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [particles, setParticles] = useState<{ id: number; style: React.CSSProperties }[]>([]);
  
  useEffect(() => {
    // Create memory particles
    const newParticles = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      style: {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        opacity: 0,
        scale: Math.random() * 0.5 + 0.5,
        animationDelay: `${Math.random() * 10}s`,
        animationDuration: `${Math.random() * 5 + 10}s`
      } as React.CSSProperties
    }));
    
    setParticles(newParticles);
  }, []);

  return (
    <div className="relative w-full max-w-3xl mx-auto mt-16 mb-24">
      <motion.div 
        className="pensieve-container"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="memory-swirl"></div>
        <div className="memory-swirl" style={{ animationDirection: "reverse", opacity: 0.7 }}></div>
        
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <motion.div
            className="w-24 h-24 rounded-full memory-orb"
            animate={{ 
              y: ["-10%", "10%", "-10%"],
            }}
            transition={{ 
              repeat: Infinity, 
              duration: 5,
              ease: "easeInOut"
            }}
          >
            <div className="absolute inset-0 bg-primary/10 rounded-full blur-md"></div>
          </motion.div>
        </div>
      </motion.div>
      
      <div className="memory-particles">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="memory-particle"
            style={particle.style}
            animate={{
              y: [0, -300],
              x: [0, Math.random() * 40 - 20],
              opacity: [0, 0.7, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      <motion.div 
        className="text-center mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <h2 className="text-3xl font-cormorant font-bold magical-glow">
          The Magical Pensieve
        </h2>
        <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
          Dive into our magical pensieve to explore and experience memories from the wizarding world. 
          Each memory is a doorway to another time and place.
        </p>
      </motion.div>
    </div>
  );
}