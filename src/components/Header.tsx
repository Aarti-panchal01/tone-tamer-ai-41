
import React from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { User, Bell, Settings } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="border-b">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <span role="img" aria-label="logo" className="text-2xl">
            🎭
          </span>
          <h1 className="text-xl font-bold tracking-tight">
            <span className="text-primary">Tone</span>Tamer
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a 
            href="#" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              "text-primary"
            )}
          >
            Tone Checker
          </a>
          <a 
            href="#" 
            className={cn(
              "text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            )}
          >
            My History
          </a>
          <a 
            href="#" 
            className={cn(
              "text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            )}
          >
            Style Guide
          </a>
          <a 
            href="#" 
            className={cn(
              "text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
            )}
          >
            Help
          </a>
        </nav>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <Settings className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
