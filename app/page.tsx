import { HeroSection } from "@/src/components/home/HeroSection";
import { FeaturedMemory } from "@/src/components/memory/FeaturedMemory";
import { PensieveViewer } from "@/src/components/ui/pensieve-viewer";
import { HowItWorks } from "@/src/components/home/HowItWorks";
import { CategoryShowcase } from "@/src/components/home/CategoryShowcase";
import { TestimonialSection } from "@/src/components/home/TestimonialSection";
import { CallToAction } from "@/src/components/home/CallToAction";
import { featuredMemories } from "@/src/lib/data";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />
      
      <section id="featured" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-cormorant text-3xl font-bold magical-glow mb-4">
              Featured Memories
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover our most extraordinary and rare magical memories, 
              handpicked for their exceptional quality and significance.
            </p>
          </div>
          
          <FeaturedMemory memories={featuredMemories} />
        </div>
      </section>
      
      <PensieveViewer />
      
      <HowItWorks />
      
      <CategoryShowcase />
      
      <TestimonialSection />
      
      <CallToAction />
    </div>
  );
}