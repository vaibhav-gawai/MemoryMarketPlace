export interface Memory {
  id: string;
  title: string;
  description: string;
  owner: string;
  price: number;
  category: MemoryCategory;
  rarity: MemoryRarity;
  age: string;
  thumbnail: string;
  previewUrl: string;
  createdAt: string;
  isFeatured: boolean;
  isOwned?: boolean;
}

export type MemoryCategory = 
  | "Magical Creatures" 
  | "Wizarding Duels" 
  | "Quidditch Matches" 
  | "Potions Discovery" 
  | "Magical Places" 
  | "Historical Events"
  | "Personal";

export type MemoryRarity = 
  | "Common" 
  | "Uncommon" 
  | "Rare" 
  | "Legendary" 
  | "Mythic";

export interface User {
  id: string;
  name: string;
  avatar: string;
  memories: Memory[];
  purchasedMemories: Memory[];
}