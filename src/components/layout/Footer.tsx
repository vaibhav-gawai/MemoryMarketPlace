import Link from "next/link";
import { Brain, Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/20 bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-primary" />
              <span className="font-cormorant text-xl font-bold magical-glow">
                Pensieve
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Dive into the magical world of memories. Our Pensieve allows you to explore and experience moments from the wizarding world and beyond.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-cormorant font-semibold text-lg mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/memories" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Browse Memories
                </Link>
              </li>
              <li>
                <Link href="/categories" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/featured" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Featured Memories
                </Link>
              </li>
              <li>
                <Link href="/rare" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Rare Collections
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-cormorant font-semibold text-lg mb-4">Marketplace</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/sell" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Sell Memories
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Pricing Guide
                </Link>
              </li>
              <li>
                <Link href="/policy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-cormorant font-semibold text-lg mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/20 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Pensieve Memories. All rights reserved.</p>
          <p className="mt-1">The wizarding world awaits your exploration.</p>
        </div>
      </div>
    </footer>
  );
}