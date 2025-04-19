import { MemoryGrid } from "@/src/components/memory/MemoryGrid";
import { allMemories, categories, rarities } from "@/src/lib/data";

export default function MemoriesPage() {
  return (
    <div className="pt-20">
      <div className="bg-card/40 backdrop-blur-sm py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-cormorant text-4xl font-bold magical-glow text-center mb-6">
            Explore Magical Memories
          </h1>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            Browse our vast collection of magical memories from the wizarding world. 
            Filter by category, rarity, or search for specific experiences.
          </p>
        </div>
      </div>
      
      <MemoryGrid 
        memories={allMemories} 
        categories={categories}
        rarities={rarities}
      />
    </div>
  );
}