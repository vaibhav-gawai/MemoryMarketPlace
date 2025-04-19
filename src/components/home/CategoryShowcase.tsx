"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

const categories = [
  {
    name: "Magical Creatures",
    description: "Encounter magnificent beasts from dragons to hippogriffs",
    image: "https://images.pexels.com/photos/4308189/pexels-photo-4308189.jpeg",
    color: "from-blue-500/20 to-purple-500/20",
  },
  {
    name: "Wizarding Duels",
    description: "Experience intense magical combat between powerful wizards",
    image: "https://images.pexels.com/photos/7919/pexels-photo.jpg",
    color: "from-red-500/20 to-orange-500/20",
  },
  {
    name: "Quidditch Matches",
    description: "Soar through the air in exhilarating quidditch competitions",
    image: "https://images.pexels.com/photos/1486064/pexels-photo-1486064.jpeg",
    color: "from-yellow-500/20 to-amber-500/20",
  },
  {
    name: "Historical Events",
    description: "Witness pivotal moments in wizarding history unfold",
    image: "https://images.pexels.com/photos/4314574/pexels-photo-4314574.jpeg",
    color: "from-emerald-500/20 to-teal-500/20",
  },
];

export function CategoryShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-cormorant text-3xl font-bold magical-glow mb-4">
            Explore Memory Categories
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dive into different types of magical memories, each offering unique experiences and insights into the wizarding world.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-2">
            {categories.map((category, index) => (
              <div
                key={index}
                className={cn(
                  "p-4 rounded-lg cursor-pointer transition-all duration-300",
                  activeIndex === index
                    ? "bg-gradient-to-r " + category.color + " border border-primary/30"
                    : "hover:bg-card"
                )}
                onClick={() => setActiveIndex(index)}
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-cormorant text-xl font-semibold">
                    {category.name}
                  </h3>
                  <ChevronRight
                    className={cn(
                      "h-5 w-5 transition-transform",
                      activeIndex === index ? "rotate-90" : ""
                    )}
                  />
                </div>
                {activeIndex === index && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="text-muted-foreground mt-2"
                  >
                    {category.description}
                  </motion.p>
                )}
              </div>
            ))}
          </div>

          <div className="lg:col-span-2 relative rounded-xl overflow-hidden h-[400px]">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: activeIndex === index ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                style={{ zIndex: activeIndex === index ? 1 : 0 }}
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="font-cormorant text-2xl font-bold mb-2 magical-glow">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground mb-4 max-w-md">
                    {category.description}
                  </p>
                  <Button asChild>
                    <Link href={`/memories?category=${encodeURIComponent(category.name)}`}>
                      Explore Category
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}