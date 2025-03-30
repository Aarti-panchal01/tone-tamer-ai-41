
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ToneInput from "./ToneInput";
import { motion } from "framer-motion";

const PlatformTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState("twitter");
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simulate loading for effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-card/50 backdrop-blur-sm z-10 rounded-lg">
          <div className="flex flex-col items-center">
            <div className="w-10 h-10 rounded-full border-4 border-primary border-t-transparent animate-spin mb-2"></div>
            <p className="text-sm font-medium text-muted-foreground">Loading vibes...</p>
          </div>
        </div>
      )}
      
      <Tabs 
        defaultValue="twitter" 
        className="w-full" 
        onValueChange={setActiveTab}
      >
        <TabsList className="grid w-full grid-cols-3 p-1 mb-4 bg-muted/50 backdrop-blur-sm">
          <TabsTrigger 
            value="twitter"
            className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all data-[state=active]:shadow-lg"
          >
            <span className="mr-2">🐦</span>
            Twitter/X
          </TabsTrigger>
          <TabsTrigger 
            value="linkedin"
            className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all data-[state=active]:shadow-lg"
          >
            <span className="mr-2">🔗</span>
            LinkedIn
          </TabsTrigger>
          <TabsTrigger 
            value="instagram"
            className="data-[state=active]:bg-primary data-[state=active]:text-white transition-all data-[state=active]:shadow-lg"
          >
            <span className="mr-2">📸</span>
            Instagram
          </TabsTrigger>
        </TabsList>
        
        <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-background to-muted/30 p-px">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 to-transparent opacity-50"></div>
          
          <TabsContent value="twitter" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
            <div className="bg-card p-6 rounded-lg relative z-10">
              <ToneInput platform="twitter" />
            </div>
          </TabsContent>
          
          <TabsContent value="linkedin" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
            <div className="bg-card p-6 rounded-lg relative z-10">
              <ToneInput platform="linkedin" />
            </div>
          </TabsContent>
          
          <TabsContent value="instagram" className="mt-0 focus-visible:outline-none focus-visible:ring-0">
            <div className="bg-card p-6 rounded-lg relative z-10">
              <ToneInput platform="instagram" />
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default PlatformTabs;
