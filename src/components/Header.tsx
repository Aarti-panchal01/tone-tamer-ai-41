
import React from 'react';
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";

const Header: React.FC = () => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <header className="sticky top-0 z-10 backdrop-blur-md bg-background/80 border-b">
      <div className="container flex h-16 items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <span role="img" aria-label="logo" className="text-2xl animate-pulse-soft">
            🎭
          </span>
          <Link to="/" className="text-xl font-bold tracking-tight hover:opacity-80 transition-opacity">
            <span className="text-primary">Tone</span>Tamer
            <span className="ml-1 text-xs font-normal bg-gradient-to-r from-pink-500 to-purple-500 text-transparent bg-clip-text">by Ace Infinity</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link 
            to="/" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary relative",
              isActive("/") ? "text-primary after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-primary" : "text-muted-foreground"
            )}
          >
            Tone Checker
          </Link>
          <Link 
            to="/my-history" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary relative",
              isActive("/my-history") ? "text-primary after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-primary" : "text-muted-foreground"
            )}
          >
            My History
          </Link>
          <Link 
            to="/style-guide" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary relative",
              isActive("/style-guide") ? "text-primary after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-primary" : "text-muted-foreground"
            )}
          >
            Style Guide
          </Link>
          <Link 
            to="/help" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary relative",
              isActive("/help") ? "text-primary after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-primary" : "text-muted-foreground"
            )}
          >
            Help
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
