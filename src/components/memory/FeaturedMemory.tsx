"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Memory } from "@/src/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  ShoppingCart, 
  Eye, 
  ArrowRight 
} from "lucide-react";

interface FeaturedMemoryProps {
  memories: Memory[];
}

export function FeaturedMemory({ memories }: FeaturedMemoryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const memory = memories[currentIndex];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % memories.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [memories.length]);
  
  const getRarityClass = (rarity: string) => {
    switch (rarity) {
      case 'Legendary':
        return 'memory-orb-legendary';
      case 'Mythic':
        return 'memory-orb-mythic';
      case 'Rare':
        return 'memory-orb-rare';
      default:
        return 'memory-orb';
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price / 100);
  };

  return (
    <div className="relative mx-auto my-8 overflow-hidden rounded-xl bg-card/40 backdrop-blur-sm">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/5" />
      
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
        <div className="flex flex-col justify-center">
          <motion.div
            key={memory.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <Badge className="bg-primary/20 text-primary mb-2">
              <Sparkles className="h-3 w-3 mr-1" />
              Featured Memory
            </Badge>
            
            <h2 className="font-cormorant text-4xl font-bold leading-tight magical-glow">
              {memory.title}
            </h2>
            
            <p className="text-lg text-muted-foreground">
              {memory.description}
            </p>
            
            <div className="flex items-center space-x-2">
              <Badge className={getRarityClass(memory.rarity)}>
                {memory.rarity}
              </Badge>
              <Badge variant="outline">
                {memory.category}
              </Badge>
              <Badge variant="outline">
                {memory.age}
              </Badge>
            </div>
            
            <div className="flex items-center space-x-2 text-muted-foreground">
              <span>From:</span>
              <span className="font-medium text-foreground">{memory.owner}</span>
            </div>
            
            <div className="mt-6 space-y-4">
              <p className="text-2xl font-bold">
                {formatPrice(memory.price)}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="sm:flex-1 btn-magical" size="lg">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" className="sm:flex-1" size="lg" asChild>
                  <Link href={memory.previewUrl}>
                    <Eye className="h-5 w-5 mr-2" />
                    Preview
                  </Link>
                </Button>
              </div>
              
              <Link 
                href="/memories"
                className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
              >
                View all memories
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </div>
        
        <div className="relative overflow-hidden rounded-lg h-[400px] lg:h-auto">
          <motion.div
            key={memory.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className="relative h-full w-full"
          >
            <Image
              src={memory.thumbnail}
              alt={memory.title}
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
            
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div 
                className={`w-20 h-20 rounded-full ${getRarityClass(memory.rarity)} animate-pulse-glow`}
                animate={{ 
                  scale: [1, 1.1, 1],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 4,
                  ease: "easeInOut",
                }}
              >
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-md"></div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {memories.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? "bg-primary w-6" : "bg-muted"
            }`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}