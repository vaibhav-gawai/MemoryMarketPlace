"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Memory } from "@/src/lib/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Sparkles,
  Clock,
  Tag,
  ShoppingCart
} from "lucide-react";

interface MemoryCardProps {
  memory: Memory;
}

export function MemoryCard({ memory }: MemoryCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const getRarityClass = (rarity: string) => {
    switch (rarity) {
      case 'Common':
        return 'bg-primary/20 text-primary';
      case 'Uncommon':
        return 'bg-secondary/20 text-secondary';
      case 'Rare':
        return 'bg-accent/20 text-accent';
      case 'Legendary':
        return 'bg-yellow-400/20 text-yellow-400';
      case 'Mythic':
        return 'bg-orange-500/20 text-orange-500';
      default:
        return 'bg-primary/20 text-primary';
    }
  };
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price / 100);
  };

  return (
    <motion.div
      className="memory-card group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="aspect-[4/5] mb-4 overflow-hidden rounded-lg bg-muted relative">
        <Image
          src={memory.thumbnail}
          alt={memory.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-all duration-500 group-hover:scale-110"
          priority
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        
        <Badge 
          className={`absolute top-2 right-2 ${getRarityClass(memory.rarity)}`}
        >
          <Sparkles className="h-3 w-3 mr-1" />
          {memory.rarity}
        </Badge>
        
        <Badge 
          className="absolute bottom-2 left-2 bg-muted/60 text-foreground"
        >
          <Clock className="h-3 w-3 mr-1" />
          {memory.age}
        </Badge>
        
        <Badge 
          className="absolute bottom-2 right-2 bg-muted/60 text-foreground"
        >
          <Tag className="h-3 w-3 mr-1" />
          {memory.category}
        </Badge>
      </div>
      
      <div className="flex-1">
        <h3 className="text-lg font-cormorant font-bold leading-tight mb-1">
          {memory.title}
        </h3>
        
        <p className="text-muted-foreground text-sm line-clamp-2 mb-2">
          {memory.description}
        </p>
        
        <div className="flex items-center justify-between mt-auto">
          <p className="font-medium">
            {formatPrice(memory.price)}
          </p>
          <p className="text-sm text-muted-foreground">
            by {memory.owner}
          </p>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-4 space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1"
          asChild
        >
          <Link href={`/memories/${memory.id}`}>
            Preview
          </Link>
        </Button>
        <Button 
          size="sm"
          className="flex-1"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Buy
        </Button>
      </div>
    </motion.div>
  );
}