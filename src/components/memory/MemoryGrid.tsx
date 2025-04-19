"use client";

import { useState } from "react";
import { Memory, MemoryCategory, MemoryRarity } from "@/src/lib/types";
import { MemoryCard } from "./MemoryCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal, X } from "lucide-react";

interface MemoryGridProps {
  memories: Memory[];
  categories: string[];
  rarities: string[];
}

export function MemoryGrid({ memories, categories, rarities }: MemoryGridProps) {
  const [filteredMemories, setFilteredMemories] = useState<Memory[]>(memories);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedRarity, setSelectedRarity] = useState<string>("");
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilters(query, selectedCategory, selectedRarity);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    applyFilters(searchQuery, category, selectedRarity);
  };

  const handleRarityChange = (rarity: string) => {
    setSelectedRarity(rarity);
    applyFilters(searchQuery, selectedCategory, rarity);
  };

  const applyFilters = (query: string, category: string, rarity: string) => {
    let filtered = [...memories];
    
    if (query) {
      filtered = filtered.filter(memory => 
        memory.title.toLowerCase().includes(query.toLowerCase()) ||
        memory.description.toLowerCase().includes(query.toLowerCase()) ||
        memory.owner.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    if (category) {
      filtered = filtered.filter(memory => memory.category === category);
    }
    
    if (rarity) {
      filtered = filtered.filter(memory => memory.rarity === rarity);
    }
    
    setFilteredMemories(filtered);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("");
    setSelectedRarity("");
    setFilteredMemories(memories);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4">
          <div className="flex-grow relative mb-4 md:mb-0">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search memories..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
            {(searchQuery || selectedCategory || selectedRarity) && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={clearFilters}
              >
                <X className="h-4 w-4 mr-2" />
                Clear
              </Button>
            )}
          </div>
        </div>

        {showFilters && (
          <div className="mt-4 p-4 bg-card/50 rounded-lg space-y-4 md:space-y-0 md:flex md:space-x-4">
            <div className="w-full md:w-1/2">
              <p className="text-sm font-medium mb-2">Category</p>
              <Select 
                value={selectedCategory} 
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="w-full md:w-1/2">
              <p className="text-sm font-medium mb-2">Rarity</p>
              <Select 
                value={selectedRarity} 
                onValueChange={handleRarityChange}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Rarities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Rarities</SelectItem>
                  {rarities.map((rarity) => (
                    <SelectItem key={rarity} value={rarity}>
                      {rarity}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="w-full max-w-md grid grid-cols-3 mx-auto mb-8">
          <TabsTrigger value="all">All Memories</TabsTrigger>
          <TabsTrigger value="featured">Featured</TabsTrigger>
          <TabsTrigger value="recent">Recently Added</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="mt-0">
          {filteredMemories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMemories.map((memory) => (
                <MemoryCard key={memory.id} memory={memory} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No memories found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filters</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="featured" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMemories
              .filter(memory => memory.isFeatured)
              .map((memory) => (
                <MemoryCard key={memory.id} memory={memory} />
              ))}
          </div>
        </TabsContent>
        
        <TabsContent value="recent" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMemories
              .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
              .slice(0, 6)
              .map((memory) => (
                <MemoryCard key={memory.id} memory={memory} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}