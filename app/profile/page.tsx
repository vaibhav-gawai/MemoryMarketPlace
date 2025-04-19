"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MemoryCard } from "@/src/components/memory/MemoryCard";
import { dummyUser, allMemories } from "@/src/lib/data";
import { User, Settings, ShoppingBag, Bookmark, LogOut } from "lucide-react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("purchased");
  const user = dummyUser;
  
  // Dummy data to simulate purchased and listed memories
  const purchasedMemories = user.purchasedMemories;
  const listedMemories = allMemories.slice(0, 2).map(memory => ({ ...memory, isOwned: true }));
  const savedMemories = allMemories.slice(2, 5);
  
  return (
    <div className="pt-20">
      <div className="bg-card/40 backdrop-blur-sm py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary/30 shadow-lg">
              <Image
                src={user.avatar}
                alt={user.name}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="text-center md:text-left">
              <h1 className="font-cormorant text-3xl font-bold magical-glow mb-2">
                {user.name}
              </h1>
              <p className="text-muted-foreground mb-4">
                Memory Collector & Explorer
              </p>
              
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <Button variant="outline" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
                <Button variant="outline" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="purchased" onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full max-w-md grid grid-cols-3 mx-auto mb-8">
            <TabsTrigger value="purchased">
              <ShoppingBag className="h-4 w-4 mr-2" />
              My Memories
            </TabsTrigger>
            <TabsTrigger value="listed">
              <Bookmark className="h-4 w-4 mr-2" />
              Listed
            </TabsTrigger>
            <TabsTrigger value="saved">
              <Bookmark className="h-4 w-4 mr-2" />
              Saved
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="purchased" className="mt-0">
            {purchasedMemories.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {purchasedMemories.map((memory) => (
                  <MemoryCard key={memory.id} memory={memory} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-card/20 rounded-lg">
                <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No memories purchased yet</h3>
                <p className="text-muted-foreground mb-6">
                  Explore our marketplace to find magical memories to experience.
                </p>
                <Button asChild>
                  <a href="/marketplace">Browse Marketplace</a>
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="listed" className="mt-0">
            {listedMemories.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {listedMemories.map((memory) => (
                  <MemoryCard key={memory.id} memory={memory} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-card/20 rounded-lg">
                <Bookmark className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No memories listed yet</h3>
                <p className="text-muted-foreground mb-6">
                  Share your magical experiences with the wizarding world.
                </p>
                <Button asChild>
                  <a href="/sell">Sell a Memory</a>
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="saved" className="mt-0">
            {savedMemories.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedMemories.map((memory) => (
                  <MemoryCard key={memory.id} memory={memory} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-card/20 rounded-lg">
                <Bookmark className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No memories saved yet</h3>
                <p className="text-muted-foreground mb-6">
                  Save memories that interest you for later viewing.
                </p>
                <Button asChild>
                  <a href="/memories">Browse Memories</a>
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
        
        {activeTab === "purchased" && purchasedMemories.length > 0 && (
          <div className="mt-12 text-center">
            <h2 className="font-cormorant text-2xl font-bold mb-6">Memory Statistics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-card/40 backdrop-blur-sm p-6 rounded-lg border border-border/50">
                <p className="text-3xl font-bold mb-2">{purchasedMemories.length}</p>
                <p className="text-muted-foreground">Memories Collected</p>
              </div>
              <div className="bg-card/40 backdrop-blur-sm p-6 rounded-lg border border-border/50">
                <p className="text-3xl font-bold mb-2">14</p>
                <p className="text-muted-foreground">Hours Experienced</p>
              </div>
              <div className="bg-card/40 backdrop-blur-sm p-6 rounded-lg border border-border/50">
                <p className="text-3xl font-bold mb-2">3</p>
                <p className="text-muted-foreground">Categories Explored</p>
              </div>
              <div className="bg-card/40 backdrop-blur-sm p-6 rounded-lg border border-border/50">
                <p className="text-3xl font-bold mb-2">1</p>
                <p className="text-muted-foreground">Rare Memories</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}