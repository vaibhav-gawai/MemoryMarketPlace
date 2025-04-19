"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { categories, rarities } from "@/src/lib/data";
import { Banknote, MemoryStickIcon, Upload, Shield, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

export default function SellPage() {
  const [memoryTitle, setMemoryTitle] = useState("");
  const [memoryDescription, setMemoryDescription] = useState("");
  const [memoryCategory, setMemoryCategory] = useState("");
  const [memoryRarity, setMemoryRarity] = useState("");
  const [memoryPrice, setMemoryPrice] = useState("");
  const [memoryAge, setMemoryAge] = useState("");
  const [includeConsent, setIncludeConsent] = useState(false);
  const [memoryFile, setMemoryFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setMemoryFile(e.target.files[0]);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!includeConsent) {
      toast({
        title: "Consent Required",
        description: "You must agree to the memory extraction terms before proceeding.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Memory Submitted",
        description: "Your memory has been submitted for review and will be listed soon.",
      });
      
      // Reset form
      setMemoryTitle("");
      setMemoryDescription("");
      setMemoryCategory("");
      setMemoryRarity("");
      setMemoryPrice("");
      setMemoryAge("");
      setIncludeConsent(false);
      setMemoryFile(null);
      setIsSubmitting(false);
    }, 2000);
  };
  
  return (
    <div className="pt-20">
      <div className="bg-pensieve py-16">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              className="font-cormorant text-4xl md:text-5xl font-bold magical-glow mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Share Your Memories
            </motion.h1>
            <motion.p
              className="text-xl text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Contribute to our magical pensieve and earn from your extraordinary experiences.
            </motion.p>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="mb-12">
            <h2 className="font-cormorant text-2xl font-bold mb-4">
              Memory Submission Guidelines
            </h2>
            <p className="text-muted-foreground mb-6">
              Before submitting your memory, please ensure it meets our quality standards and 
              ethical guidelines. All memories undergo review before being listed in our marketplace.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card/40 backdrop-blur-sm p-4 rounded-lg border border-border/50">
                <div className="flex items-center mb-2">
                  <MemoryStickIcon className="h-5 w-5 mr-2 text-primary" />
                  <h3 className="font-semibold">Quality</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Memories must be clear, complete, and coherent. Fragmented or damaged 
                  memories will not be accepted.
                </p>
              </div>
              
              <div className="bg-card/40 backdrop-blur-sm p-4 rounded-lg border border-border/50">
                <div className="flex items-center mb-2">
                  <Shield className="h-5 w-5 mr-2 text-primary" />
                  <h3 className="font-semibold">Privacy</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Ensure you have the right to share this memory. Memories involving 
                  other individuals require their consent.
                </p>
              </div>
              
              <div className="bg-card/40 backdrop-blur-sm p-4 rounded-lg border border-border/50">
                <div className="flex items-center mb-2">
                  <Banknote className="h-5 w-5 mr-2 text-primary" />
                  <h3 className="font-semibold">Pricing</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  Price your memory appropriately based on its rarity, age, and 
                  significance. Rare memories command higher prices.
                </p>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <div>
                <Label htmlFor="title">Memory Title</Label>
                <Input
                  id="title"
                  placeholder="Enter a descriptive title for your memory"
                  value={memoryTitle}
                  onChange={(e) => setMemoryTitle(e.target.value)}
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="description">Memory Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your memory in detail..."
                  className="min-h-[120px]"
                  value={memoryDescription}
                  onChange={(e) => setMemoryDescription(e.target.value)}
                  required
                />
              </div>
            </motion.div>
            
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <div>
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={memoryCategory} 
                  onValueChange={setMemoryCategory}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <div className="flex items-center justify-between">
                  <Label htmlFor="rarity">Rarity</Label>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" type="button">
                          <HelpCircle className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs">
                          Common: Everyday experiences<br />
                          Uncommon: Unusual but not rare experiences<br />
                          Rare: Unique experiences few have had<br />
                          Legendary: Historic or famous events<br />
                          Mythic: Once-in-a-lifetime magical phenomena
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Select 
                  value={memoryRarity} 
                  onValueChange={setMemoryRarity}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select rarity" />
                  </SelectTrigger>
                  <SelectContent>
                    {rarities.map((rarity) => (
                      <SelectItem key={rarity} value={rarity}>
                        {rarity}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="price">Price (in USD)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    $
                  </span>
                  <Input
                    id="price"
                    type="number"
                    min="1"
                    step="0.01"
                    placeholder="0.00"
                    className="pl-8"
                    value={memoryPrice}
                    onChange={(e) => setMemoryPrice(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="age">Memory Age</Label>
                <Input
                  id="age"
                  placeholder="e.g. 10 years, 3 months"
                  value={memoryAge}
                  onChange={(e) => setMemoryAge(e.target.value)}
                  required
                />
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <Label htmlFor="memory-file">Upload Memory Preview Image</Label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-border rounded-md">
                <div className="space-y-1 text-center">
                  <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                  <div className="flex text-sm text-muted-foreground">
                    <label
                      htmlFor="memory-file"
                      className="relative cursor-pointer rounded-md font-medium text-primary hover:text-primary/80 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2"
                    >
                      <span>Upload a file</span>
                      <input
                        id="memory-file"
                        name="memory-file"
                        type="file"
                        className="sr-only"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
              {memoryFile && (
                <p className="mt-2 text-sm text-primary">
                  File selected: {memoryFile.name}
                </p>
              )}
            </motion.div>
            
            <motion.div
              className="flex items-center space-x-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <Switch
                id="consent"
                checked={includeConsent}
                onCheckedChange={setIncludeConsent}
              />
              <Label htmlFor="consent" className="text-sm text-muted-foreground">
                I consent to the memory extraction process and confirm that I have the right to share this memory.
              </Label>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 }}
            >
              <Button
                type="submit"
                className="w-full btn-magical"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                    Processing...
                  </>
                ) : (
                  "Submit Memory for Review"
                )}
              </Button>
            </motion.div>
          </form>
        </div>
      </div>
    </div>
  );
}