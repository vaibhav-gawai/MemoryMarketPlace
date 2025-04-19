"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { BookOpen, Upload } from "lucide-react";

export function CallToAction() {
  return (
    <div className="py-16 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            className="font-cormorant text-3xl md:text-4xl font-bold magical-glow mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to Dive Into the Pensieve?
          </motion.h2>
          
          <motion.p
            className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join our magical community of memory explorers and contribute to the collective pensieve. 
            Whether you're seeking rare experiences or wish to share your own magical moments, 
            the wizarding world awaits.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Button className="btn-magical" size="lg" asChild>
              <Link href="/memories">
                <BookOpen className="mr-2 h-5 w-5" />
                Explore Memories
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/sell">
                <Upload className="mr-2 h-5 w-5" />
                Contribute Memories
              </Link>
            </Button>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[200%] h-56 bg-card/50 rounded-[100%] backdrop-blur-sm" />
    </div>
  );
}