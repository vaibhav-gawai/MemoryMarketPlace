"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Memory } from "@/src/lib/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ShoppingCart,
  Shield,
  Award,
  Clock,
  Tag,
  ChevronLeft,
  ChevronRight,
  Play,
} from "lucide-react";

interface MemoryDetailProps {
  memory: Memory;
  relatedMemories: Memory[];
}

export function MemoryDetail({ memory, relatedMemories }: MemoryDetailProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price / 100);
  };

  const getRarityClass = (rarity: string) => {
    switch (rarity) {
      case "Common":
        return "bg-primary/20 text-primary";
      case "Uncommon":
        return "bg-secondary/20 text-secondary";
      case "Rare":
        return "bg-accent/20 text-accent";
      case "Legendary":
        return "bg-yellow-400/20 text-yellow-400";
      case "Mythic":
        return "bg-orange-500/20 text-orange-500";
      default:
        return "bg-primary/20 text-primary";
    }
  };

  const handlePlayMemory = () => {
    setIsPlaying(true);
    // In a real implementation, this would initiate the 3D experience
    setTimeout(() => {
      setIsPlaying(false);
    }, 5000);
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
          <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
            <Image
              src={memory.thumbnail}
              alt={memory.title}
              fill
              priority
              className="object-cover"
            />
            
            {!isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <Button
                  size="lg"
                  className="rounded-full h-16 w-16 p-0"
                  onClick={handlePlayMemory}
                >
                  <Play className="h-8 w-8" />
                </Button>
              </div>
            )}
            
            {isPlaying && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 rounded-full memory-orb animate-pulse-glow">
                  <div className="absolute inset-0 rounded-full blur-md"></div>
                </div>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            {relatedMemories.slice(0, 3).map((relatedMemory) => (
              <div
                key={relatedMemory.id}
                className="relative aspect-square overflow-hidden rounded-md bg-muted cursor-pointer"
              >
                <Image
                  src={relatedMemory.thumbnail}
                  alt={relatedMemory.title}
                  fill
                  className="object-cover hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <p className="text-xs text-white font-medium p-1">
                    {relatedMemory.title}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <div className="flex flex-wrap gap-2 mb-3">
              <Badge className={getRarityClass(memory.rarity)}>
                <Award className="h-3 w-3 mr-1" />
                {memory.rarity}
              </Badge>
              <Badge variant="outline">
                <Clock className="h-3 w-3 mr-1" />
                {memory.age}
              </Badge>
              <Badge variant="outline">
                <Tag className="h-3 w-3 mr-1" />
                {memory.category}
              </Badge>
            </div>

            <h1 className="text-4xl font-cormorant font-bold magical-glow mb-4">
              {memory.title}
            </h1>
            
            <p className="text-muted-foreground text-lg mb-4">
              {memory.description}
            </p>
            
            <div className="flex items-center mb-6">
              <p className="text-sm">From:</p>
              <p className="ml-2 font-medium">{memory.owner}</p>
            </div>
          </div>

          <div className="p-6 bg-card rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <p className="text-2xl font-bold">{formatPrice(memory.price)}</p>
              <Badge variant="outline" className="text-green-400">In Stock</Badge>
            </div>
            
            <div className="space-y-4">
              <Button className="w-full btn-magical" size="lg">
                <ShoppingCart className="h-5 w-5 mr-2" />
                Add to Cart
              </Button>
              
              <Button variant="outline" className="w-full" size="lg">
                Preview Memory
              </Button>
            </div>
            
            <div className="flex items-center mt-4 text-sm text-muted-foreground">
              <Shield className="h-4 w-4 mr-2" />
              Secured by magical encryption
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-xl font-cormorant font-semibold">Memory Details</h3>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Category</p>
                <p>{memory.category}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rarity</p>
                <p>{memory.rarity}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Age</p>
                <p>{memory.age}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Contributed By</p>
                <p>{memory.owner}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-2xl font-cormorant font-bold mb-6">You May Also Like</h2>
        
        <div className="relative">
          <div className="flex overflow-x-auto gap-6 pb-4 -mx-4 px-4 scrollbar-hide">
            {relatedMemories.map((relatedMemory) => (
              <div key={relatedMemory.id} className="min-w-[280px] memory-card">
                <div className="aspect-video mb-3 overflow-hidden rounded-lg bg-muted relative">
                  <Image
                    src={relatedMemory.thumbnail}
                    alt={relatedMemory.title}
                    fill
                    className="object-cover transition-all duration-500 hover:scale-110"
                  />
                  <Badge
                    className={`absolute top-2 right-2 ${getRarityClass(
                      relatedMemory.rarity
                    )}`}
                  >
                    {relatedMemory.rarity}
                  </Badge>
                </div>
                
                <h3 className="text-lg font-cormorant font-bold leading-tight mb-1">
                  {relatedMemory.title}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-2">
                  by {relatedMemory.owner}
                </p>
                
                <div className="flex items-center justify-between">
                  <p className="font-medium">
                    {formatPrice(relatedMemory.price)}
                  </p>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-card/40 backdrop-blur-sm"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-card/40 backdrop-blur-sm"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}