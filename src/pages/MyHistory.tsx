
import React from 'react';
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const HistoryItem = ({ platform, date, content, sentiment }: { platform: string, date: string, content: string, sentiment: "positive" | "negative" | "neutral" | "sarcastic" | "passive" }) => {
  const sentimentColor = {
    positive: "bg-tone-positive/10 text-tone-positive",
    negative: "bg-tone-negative/10 text-tone-negative",
    neutral: "bg-tone-neutral/10 text-tone-neutral",
    sarcastic: "bg-tone-sarcastic/10 text-tone-sarcastic",
    passive: "bg-tone-passive/10 text-tone-passive",
  }[sentiment];

  const sentimentEmoji = {
    positive: "😊",
    negative: "😠",
    neutral: "😐",
    sarcastic: "😏",
    passive: "😒",
  }[sentiment];

  const platformEmoji = {
    twitter: "🐦",
    linkedin: "🔗",
    instagram: "📸",
  }[platform.toLowerCase()] || "📱";

  return (
    <Card className="mb-4 hover:shadow-md transition-all">
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">{platformEmoji}</span>
            <CardTitle className="text-base font-medium">{platform}</CardTitle>
          </div>
          <div className="text-sm text-muted-foreground">{date}</div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-3">{content}</p>
        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${sentimentColor}`}>
          <span className="mr-1">{sentimentEmoji}</span>
          {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)} tone
        </div>
      </CardContent>
    </Card>
  );
};

const MyHistory: React.FC = () => {
  // Example history data
  const historyItems = [
    {
      platform: "Twitter",
      date: "Today, 2:30 PM",
      content: "Just released our new feature! So excited to share this with everyone. #ProductLaunch #Innovation",
      sentiment: "positive" as const,
    },
    {
      platform: "LinkedIn",
      date: "Yesterday, 10:15 AM",
      content: "Our team has been working tirelessly to deliver results. The commitment and dedication is truly remarkable.",
      sentiment: "positive" as const,
    },
    {
      platform: "Instagram",
      date: "April 20, 2023",
      content: "This view is absolutely breathtaking! Nature at its finest. #Travel #Adventure",
      sentiment: "positive" as const,
    },
    {
      platform: "Twitter",
      date: "April 18, 2023",
      content: "The customer service at this place is absolutely terrible. Would not recommend.",
      sentiment: "negative" as const,
    },
    {
      platform: "LinkedIn",
      date: "April 15, 2023",
      content: "Interesting how some companies claim to value innovation but shut down every new idea.",
      sentiment: "passive" as const,
    },
    {
      platform: "Instagram",
      date: "April 10, 2023",
      content: "Wow, another perfect influencer with a perfect life. How original.",
      sentiment: "sarcastic" as const,
    },
    {
      platform: "Twitter",
      date: "April 5, 2023",
      content: "New research paper published on machine learning applications in healthcare.",
      sentiment: "neutral" as const,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold tracking-tight mb-2">My History</h2>
          <p className="text-muted-foreground">
            Track your past social media posts and their tone analysis.
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="twitter">Twitter</TabsTrigger>
            <TabsTrigger value="linkedin">LinkedIn</TabsTrigger>
            <TabsTrigger value="instagram">Instagram</TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <ScrollArea className="h-[600px] pr-4">
              <TabsContent value="all" className="mt-0">
                {historyItems.map((item, index) => (
                  <HistoryItem key={index} {...item} />
                ))}
              </TabsContent>
              
              <TabsContent value="twitter" className="mt-0">
                {historyItems.filter(item => item.platform.toLowerCase() === "twitter").map((item, index) => (
                  <HistoryItem key={index} {...item} />
                ))}
              </TabsContent>
              
              <TabsContent value="linkedin" className="mt-0">
                {historyItems.filter(item => item.platform.toLowerCase() === "linkedin").map((item, index) => (
                  <HistoryItem key={index} {...item} />
                ))}
              </TabsContent>
              
              <TabsContent value="instagram" className="mt-0">
                {historyItems.filter(item => item.platform.toLowerCase() === "instagram").map((item, index) => (
                  <HistoryItem key={index} {...item} />
                ))}
              </TabsContent>
            </ScrollArea>
          </div>
        </Tabs>
      </main>
      <footer className="py-6 border-t">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; 2023 ToneTamer AI by Aarti. Vibes only.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MyHistory;
