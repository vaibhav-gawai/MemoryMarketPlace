"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Brain, ShoppingCart, User, Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/memories", label: "Explore Memories" },
  { href: "/marketplace", label: "Marketplace" },
  { href: "/about", label: "About the Pensieve" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-card/80 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-primary" />
              <span className="font-cormorant text-2xl font-bold magical-glow">
                Pensieve
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  pathname === link.href
                    ? "text-primary magical-glow"
                    : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/cart">
              <Button variant="ghost" size="icon">
                <ShoppingCart className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/profile">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/sell">
              <Button>Sell a Memory</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-card/95 backdrop-blur-md p-4">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary p-2",
                  pathname === link.href
                    ? "text-primary magical-glow"
                    : "text-muted-foreground"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center space-x-4 pt-2 border-t border-border">
              <Link href="/cart" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" size="sm" className="w-full">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Cart
                </Button>
              </Link>
              <Link href="/profile" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" size="sm" className="w-full">
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </Button>
              </Link>
            </div>
            <Link href="/sell" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full">Sell a Memory</Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}