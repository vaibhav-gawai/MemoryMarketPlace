"use client";

import { motion } from "framer-motion";
import { Search, Sparkles, ShoppingCart, BookOpen } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "Discover Memories",
      description: "Browse our vast collection of magical memories from the wizarding world and beyond.",
    },
    {
      icon: Sparkles,
      title: "Experience Magic",
      description: "Preview memories in our pensieve interface to get a taste of what you'll experience.",
    },
    {
      icon: ShoppingCart,
      title: "Acquire Memories",
      description: "Purchase memories to add them to your personal collection for unlimited viewing.",
    },
    {
      icon: BookOpen,
      title: "Share Your Story",
      description: "Contribute your own memories to the marketplace for others to experience.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    },
  };

  return (
    <div className="py-16 bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-cormorant text-3xl font-bold magical-glow mb-4">
            How The Pensieve Works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our magical pensieve allows you to dive into memories just like in the wizarding world.
            Here's how you can explore and experience these magical moments.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {steps.map((step, index) => (
            <motion.div 
              key={index}
              className="relative p-6 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300"
              variants={itemVariants}
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 text-primary mb-6 mx-auto">
                <step.icon className="w-6 h-6" />
              </div>
              <h3 className="text-center text-xl font-cormorant font-semibold mb-3">
                {step.title}
              </h3>
              <p className="text-center text-muted-foreground">
                {step.description}
              </p>
              
              <div className="absolute -left-2 -bottom-2 w-4 h-4 border-b border-l border-primary/50 rounded-bl-md" />
              <div className="absolute -right-2 -bottom-2 w-4 h-4 border-b border-r border-primary/50 rounded-br-md" />
              <div className="absolute -left-2 -top-2 w-4 h-4 border-t border-l border-primary/50 rounded-tl-md" />
              <div className="absolute -right-2 -top-2 w-4 h-4 border-t border-r border-primary/50 rounded-tr-md" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}