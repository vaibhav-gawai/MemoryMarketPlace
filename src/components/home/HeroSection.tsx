"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Book, 
  ShoppingCart, 
  ArrowRight 
} from "lucide-react";

export function HeroSection() {
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const createParticles = () => {
      if (!particlesRef.current) return;
      
      const container = particlesRef.current;
      container.innerHTML = '';
      
      // Create floating particles
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'memory-particle';
        
        // Randomize position and animation
        const randomX = Math.random() * window.innerWidth;
        const randomDelay = Math.random() * 20;
        const randomDuration = Math.random() * 10 + 15;
        const randomSize = Math.random() * 3 + 1;
        
        particle.style.left = `${randomX}px`;
        particle.style.bottom = '0';
        particle.style.width = `${randomSize}px`;
        particle.style.height = `${randomSize}px`;
        particle.style.animationDelay = `${randomDelay}s`;
        particle.style.animationDuration = `${randomDuration}s`;
        
        container.appendChild(particle);
      }
    };
    
    createParticles();
    window.addEventListener('resize', createParticles);
    
    return () => {
      window.removeEventListener('resize', createParticles);
    };
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-pensieve">
      <div ref={particlesRef} className="memory-particles"></div>
      
      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h1 
            className="text-4xl md:text-6xl font-cormorant font-bold magical-glow leading-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Explore the Magical World of <span className="text-primary">Memories</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Dive into our pensieve and experience magical moments from the wizarding world. 
            Buy, sell, and collect rare memories that transport you to extraordinary places and times.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button className="btn-magical" size="lg" asChild>
              <Link href="/memories">
                <Book className="mr-2 h-5 w-5" />
                Browse Memories
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/marketplace">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Enter Marketplace
              </Link>
            </Button>
          </motion.div>
          
          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link 
              href="#featured"
              className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
            >
              Discover featured memories
              <ArrowRight className="ml-2 h-4 w-4 animate-pulse" />
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}