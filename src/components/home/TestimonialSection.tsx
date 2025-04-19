"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Hermione Granger",
    role: "Ministry of Magic",
    image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
    quote: "The pensieve experience is absolutely magical! Being able to relive the Battle of Hogwarts was both emotional and enlightening. The details captured are incredible.",
    rating: 5,
  },
  {
    id: 2,
    name: "Ron Weasley",
    role: "Weasleys' Wizard Wheezes",
    image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
    quote: "Never thought I'd say this, but experiencing a Quidditch World Cup final from Viktor Krum's perspective was bloody brilliant! Worth every galleon.",
    rating: 5,
  },
  {
    id: 3,
    name: "Luna Lovegood",
    role: "Magizoologist",
    image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150",
    quote: "The magical creatures collection opened my mind to so many wonderful beings. I especially enjoyed the encounter with the Hungarian Horntail - it felt like I could feel its fiery breath!",
    rating: 4,
  },
];

export function TestimonialSection() {
  const [active, setActive] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, []);
  
  const next = () => setActive((prev) => (prev + 1) % testimonials.length);
  const prev = () => setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="bg-card/50 backdrop-blur-sm py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-cormorant text-3xl font-bold magical-glow mb-4">
            What Wizards & Witches Are Saying
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hear from those who have experienced our magical memories firsthand.
          </p>
        </div>
        
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute top-0 left-0 -mt-6 -ml-6 w-24 h-24 border border-primary/20 rounded-full" />
          <div className="absolute bottom-0 right-0 -mb-6 -mr-6 w-24 h-24 border border-primary/20 rounded-full" />
          
          <div className="bg-card border border-border/50 rounded-xl p-8 relative z-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonials[active].id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row gap-8 items-center"
              >
                <div className="md:w-1/3 flex flex-col items-center text-center">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 ring-4 ring-primary/20">
                    <Image
                      src={testimonials[active].image}
                      alt={testimonials[active].name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-cormorant text-xl font-semibold">
                    {testimonials[active].name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {testimonials[active].role}
                  </p>
                  <div className="flex items-center mt-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < testimonials[active].rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-muted"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <svg
                    className="h-10 w-10 text-primary/30 mb-4"
                    fill="currentColor"
                    viewBox="0 0 32 32"
                  >
                    <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                  </svg>
                  
                  <p className="text-lg mb-6 italic">
                    {testimonials[active].quote}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
            
            <div className="flex justify-center gap-2 mt-8">
              <Button variant="outline" size="icon" onClick={prev}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === active ? "bg-primary w-6" : "bg-muted"
                    }`}
                    onClick={() => setActive(index)}
                  />
                ))}
              </div>
              
              <Button variant="outline" size="icon" onClick={next}>
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}