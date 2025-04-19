import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pensieve3D } from "@/src/components/3d/Pensieve3D";

export default function AboutPage() {
  return (
    <div className="pt-20">
      <div className="bg-pensieve py-16">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-cormorant text-4xl md:text-5xl font-bold magical-glow mb-6">
              About The Pensieve
            </h1>
            <p className="text-xl text-muted-foreground">
              Discover the magical technology that allows you to experience memories.
            </p>
          </div>
        </div>
      </div>
      
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-cormorant text-3xl font-bold mb-6">
                The Magic of Memory Preservation
              </h2>
              <p className="text-muted-foreground mb-4">
                In the wizarding world, the Pensieve is a magical object used to review memories. 
                It's a shallow basin made of metal or stone, often elaborately decorated, 
                into which a wizard or witch can deposit their memories in the form of a silvery substance.
              </p>
              <p className="text-muted-foreground mb-4">
                Our digital Pensieve adapts this magical concept for the modern age, allowing 
                wizards and witches to share their memories with others through our secure platform. 
                Each memory is carefully extracted, preserved, and authenticated before being 
                made available in our marketplace.
              </p>
              <p className="text-muted-foreground mb-6">
                Unlike traditional Pensieves, which only allow for personal review, our technology 
                enables the sharing and selling of memories, creating a new form of magical commerce 
                and experience.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="btn-magical" asChild>
                  <Link href="/memories">
                    Explore Memories
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/marketplace">
                    Visit Marketplace
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="order-first lg:order-last">
              <Pensieve3D />
            </div>
          </div>
          
          <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card/40 backdrop-blur-sm p-6 rounded-lg border border-border/50">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <span className="text-2xl font-cormorant font-bold">1</span>
              </div>
              <h3 className="text-xl font-cormorant font-semibold mb-3">
                Memory Extraction
              </h3>
              <p className="text-muted-foreground">
                Memories are carefully extracted using specialized spells that preserve 
                their integrity and emotional resonance. This delicate process ensures 
                that the full experience is captured.
              </p>
            </div>
            
            <div className="bg-card/40 backdrop-blur-sm p-6 rounded-lg border border-border/50">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <span className="text-2xl font-cormorant font-bold">2</span>
              </div>
              <h3 className="text-xl font-cormorant font-semibold mb-3">
                Magical Authentication
              </h3>
              <p className="text-muted-foreground">
                Each memory undergoes rigorous magical verification to confirm its 
                authenticity and origin. Our expert enchanters ensure that memories 
                cannot be tampered with or falsified.
              </p>
            </div>
            
            <div className="bg-card/40 backdrop-blur-sm p-6 rounded-lg border border-border/50">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <span className="text-2xl font-cormorant font-bold">3</span>
              </div>
              <h3 className="text-xl font-cormorant font-semibold mb-3">
                Immersive Experience
              </h3>
              <p className="text-muted-foreground">
                Our specialized Pensieve technology allows users to fully immerse 
                themselves in memories, experiencing them as if they were present. 
                All senses are engaged for a complete magical experience.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-card/40 backdrop-blur-sm py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-cormorant text-3xl font-bold magical-glow mb-4">
              Our Magical Heritage
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Learn about the rich history of memory magic and how our Pensieve technology 
              has evolved from ancient wizarding traditions.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src="https://images.pexels.com/photos/5490778/pexels-photo-5490778.jpeg"
                alt="Ancient Pensieve"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
            </div>
            
            <div>
              <h3 className="font-cormorant text-2xl font-bold mb-4">
                From Ancient Magic to Modern Experience
              </h3>
              <p className="text-muted-foreground mb-4">
                The concept of memory preservation dates back to ancient Egyptian wizards, 
                who developed early methods of capturing important moments for future generations. 
                These techniques were refined over centuries by wizard scholars across the globe.
              </p>
              <p className="text-muted-foreground mb-4">
                The modern Pensieve was developed in the 14th century by the renowned 
                enchantress Bowman Wright, who combined memory extraction charms with 
                containment enchantments to create the first true memory vessel.
              </p>
              <p className="text-muted-foreground">
                Our digital adaptation maintains the core magical principles while 
                enhancing accessibility and allowing for secure memory commerce - a 
                revolutionary advancement in magical technology that has been approved 
                by the Ministry of Magic.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}