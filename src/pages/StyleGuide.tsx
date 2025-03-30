
import React from 'react';
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const StyleGuide: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Style Guide</h2>
          <p className="text-muted-foreground">
            Customize your AI tone preferences and learn about effective communication styles.
          </p>
        </div>

        <Tabs defaultValue="preferences" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3">
            <TabsTrigger value="preferences">My Preferences</TabsTrigger>
            <TabsTrigger value="platform">Platform Tips</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
          </TabsList>
          
          <TabsContent value="preferences" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span role="img" aria-label="Personal Style">✨</span>
                    Your Tone Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Default Tone</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-primary text-primary-foreground">Friendly & Approachable</Badge>
                        <Badge variant="outline">Professional & Neutral</Badge>
                        <Badge variant="outline">Fun & Playful</Badge>
                        <Badge variant="outline">Bold & Persuasive</Badge>
                        <Badge variant="outline">Cautious & Diplomatic</Badge>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Writing Style</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-tone-blue-dark text-white">Concise</Badge>
                        <Badge variant="outline">Detailed</Badge>
                        <Badge className="bg-tone-blue-dark text-white">Casual</Badge>
                        <Badge variant="outline">Formal</Badge>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Emoji Usage</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-tone-purple-dark text-white">Moderate</Badge>
                        <Badge variant="outline">None</Badge>
                        <Badge variant="outline">Abundant</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span role="img" aria-label="Audience">👥</span>
                    Audience Settings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Primary Platform</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-primary text-primary-foreground">Twitter/X</Badge>
                        <Badge variant="outline">LinkedIn</Badge>
                        <Badge variant="outline">Instagram</Badge>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Target Audience</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge className="bg-tone-sarcastic text-black">Gen Z</Badge>
                        <Badge variant="outline">Millennials</Badge>
                        <Badge variant="outline">Professional</Badge>
                        <Badge className="bg-tone-sarcastic text-black">Tech-savvy</Badge>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Content Purpose</h4>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Educational</Badge>
                        <Badge className="bg-tone-positive text-white">Entertaining</Badge>
                        <Badge variant="outline">Promotional</Badge>
                        <Badge className="bg-tone-positive text-white">Personal</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="platform" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="overflow-hidden border-t-4" style={{ borderTopColor: '#1DA1F2' }}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <span role="img" aria-label="twitter" className="text-2xl">🐦</span>
                    Twitter/X Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-primary text-lg">•</span>
                      <span>Keep it brief (280 chars max)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary text-lg">•</span>
                      <span>Use hashtags (#) strategically (1-2 max)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary text-lg">•</span>
                      <span>Add engaging questions to boost replies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary text-lg">•</span>
                      <span>Use emojis to convey tone clearly</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary text-lg">•</span>
                      <span>Be careful with sarcasm - it's often misinterpreted</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden border-t-4" style={{ borderTopColor: '#0077B5' }}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <span role="img" aria-label="linkedin" className="text-2xl">🔗</span>
                    LinkedIn Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-primary text-lg">•</span>
                      <span>Maintain professional tone</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary text-lg">•</span>
                      <span>Use industry-specific terms appropriately</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary text-lg">•</span>
                      <span>Break long posts into paragraphs</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary text-lg">•</span>
                      <span>Support claims with data when possible</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary text-lg">•</span>
                      <span>Avoid overly casual language</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden border-t-4" style={{ borderTopColor: '#E1306C' }}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <span role="img" aria-label="instagram" className="text-2xl">📸</span>
                    Instagram Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="text-primary text-lg">•</span>
                      <span>Be authentic and conversational</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary text-lg">•</span>
                      <span>Use relevant hashtags (5-10)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary text-lg">•</span>
                      <span>Include a call-to-action</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary text-lg">•</span>
                      <span>Emoji usage is highly encouraged</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary text-lg">•</span>
                      <span>Keep captions engaging but scannable</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="examples" className="mt-6">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <span role="img" aria-label="Example" className="text-xl">✨</span>
                    Tone Examples
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-tone-positive/10 rounded-lg border border-tone-positive/20">
                      <h4 className="font-medium flex items-center gap-2 mb-2">
                        <span className="text-tone-positive">😊</span>
                        Positive & Friendly
                      </h4>
                      <p className="text-sm">
                        "We're thrilled to announce our new feature! It's been designed with your feedback in mind, and we can't wait to hear what you think. Try it out and let us know! 💫"
                      </p>
                    </div>
                    
                    <div className="p-4 bg-gray-100 rounded-lg border border-gray-200">
                      <h4 className="font-medium flex items-center gap-2 mb-2">
                        <span className="text-tone-neutral">😐</span>
                        Professional & Neutral
                      </h4>
                      <p className="text-sm">
                        "We are pleased to introduce our latest feature. Developed based on user feedback, this update aims to improve functionality and user experience. Your feedback is welcome."
                      </p>
                    </div>
                    
                    <div className="p-4 bg-tone-negative/10 rounded-lg border border-tone-negative/20">
                      <h4 className="font-medium flex items-center gap-2 mb-2">
                        <span className="text-tone-negative">😠</span>
                        Negative (Avoid)
                      </h4>
                      <p className="text-sm">
                        "Finally fixed that broken feature that nobody was using anyway. Not sure why everyone was complaining so much about it."
                      </p>
                    </div>
                    
                    <div className="p-4 bg-tone-passive/10 rounded-lg border border-tone-passive/20">
                      <h4 className="font-medium flex items-center gap-2 mb-2">
                        <span className="text-tone-passive">😒</span>
                        Passive-Aggressive (Avoid)
                      </h4>
                      <p className="text-sm">
                        "For those who actually read instructions, you'll find that our new feature has been available all along. Just saying."
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
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

export default StyleGuide;
