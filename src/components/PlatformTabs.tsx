
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ToneInput from "./ToneInput";

const PlatformTabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState("twitter");
  
  return (
    <Tabs defaultValue="twitter" className="w-full" onValueChange={setActiveTab}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="twitter">
          <span className="mr-2">🐦</span>
          Twitter/X
        </TabsTrigger>
        <TabsTrigger value="linkedin">
          <span className="mr-2">🔗</span>
          LinkedIn
        </TabsTrigger>
        <TabsTrigger value="instagram">
          <span className="mr-2">📸</span>
          Instagram
        </TabsTrigger>
      </TabsList>
      <TabsContent value="twitter">
        <ToneInput platform="twitter" />
      </TabsContent>
      <TabsContent value="linkedin">
        <ToneInput platform="linkedin" />
      </TabsContent>
      <TabsContent value="instagram">
        <ToneInput platform="instagram" />
      </TabsContent>
    </Tabs>
  );
};

export default PlatformTabs;
