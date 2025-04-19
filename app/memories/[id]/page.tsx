import { MemoryDetail } from "@/src/components/memory/MemoryDetail";
import { allMemories } from "@/src/lib/data";

interface MemoryPageProps {
  params: {
    id: string;
  };
}

export default function MemoryPage({ params }: MemoryPageProps) {
  const memory = allMemories.find((m) => m.id === params.id) || allMemories[0];
  
  // Get related memories (same category, excluding current)
  const relatedMemories = allMemories
    .filter(
      (m) => m.category === memory.category && m.id !== memory.id
    )
    .slice(0, 4);

  return (
    <div className="pt-20">
      <MemoryDetail memory={memory} relatedMemories={relatedMemories} />
    </div>
  );
}

export function generateStaticParams() {
  return allMemories.map((memory) => ({
    id: memory.id,
  }));
}