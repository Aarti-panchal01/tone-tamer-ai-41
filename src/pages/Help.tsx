
import React from 'react';
import Header from "@/components/Header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const Help: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold tracking-tight mb-2">Help Center</h2>
          <p className="text-muted-foreground">
            Find answers to common questions and learn how to get the most out of ToneTamer AI.
          </p>
        </div>

        <div className="mb-8 max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              className="pl-10 h-12 bg-background" 
              placeholder="Search for help topics..."
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-8">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
                <CardDescription>Common questions about using ToneTamer AI</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How does the tone analyzer work?</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-2">ToneTamer uses advanced AI and natural language processing to analyze your text across multiple dimensions:</p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        <li>Sentiment (positive, negative, neutral)</li>
                        <li>Emotional tone (friendly, angry, sarcastic, etc.)</li>
                        <li>Formality level</li>
                        <li>Potential audience reactions</li>
                      </ul>
                      <p className="mt-2 text-sm text-muted-foreground">The AI has been trained on millions of social media posts and comments to understand how different phrases and words might be perceived.</p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Why are some words highlighted in different colors?</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-2">Words are highlighted based on their emotional impact:</p>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-tone-positive"></span>
                          <span><strong>Green:</strong> Positive words that convey friendliness, appreciation, or encouragement</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-tone-negative"></span>
                          <span><strong>Red:</strong> Negative words that might come across as harsh, critical, or angry</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-tone-sarcastic"></span>
                          <span><strong>Amber:</strong> Words that could be interpreted as sarcastic or might be misunderstood</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-3 h-3 rounded-full bg-tone-passive"></span>
                          <span><strong>Purple:</strong> Words that have a passive-aggressive tone</span>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Can I adjust how sensitive the tone detection is?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Yes! You can customize the sensitivity in your Style Guide settings. If you feel the analyzer is too sensitive to certain expressions or not sensitive enough, adjust the settings to match your communication style.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger>How can I save my analyzed posts?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        All your checked messages are automatically saved in the "My History" section. You can access them anytime to review previous analyses or reuse content. Each entry shows the original text, platform, and detected tone.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5">
                    <AccordionTrigger>Does ToneTamer support languages other than English?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        Currently, ToneTamer AI supports English with high accuracy. We're working on adding support for additional languages including Spanish, French, German, and Japanese in our upcoming updates. Stay tuned!
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-6">
                    <AccordionTrigger>What's the difference between the tone options?</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-2">Each tone option adjusts your message for a different purpose:</p>
                      <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                        <li><strong>Friendly & Approachable:</strong> Warm, conversational tone good for general audiences</li>
                        <li><strong>Professional & Neutral:</strong> Businesslike tone ideal for work communications</li>
                        <li><strong>Fun & Playful:</strong> Casual, energetic tone with more personality</li>
                        <li><strong>Bold & Persuasive:</strong> Confident tone for marketing or calls to action</li>
                        <li><strong>Cautious & Diplomatic:</strong> Measured tone for sensitive topics</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-4">
            <div className="space-y-6">
              <Card className="bg-primary/5 border-primary/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span role="img" aria-label="Tips" className="text-xl">💡</span>
                    Quick Tips
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>Use the platform selector to get context-specific advice</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>Try different tone options to see which works best</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>Review your history to see tone patterns over time</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>Check the Style Guide for platform-specific best practices</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span role="img" aria-label="Contact" className="text-xl">📧</span>
                    Need More Help?
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">
                    Can't find what you're looking for? Our support team is here to help!
                  </p>
                  <Button className="w-full">
                    Contact Support
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-tone-purple-light to-background border-none overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">ToneTamer Pro</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">
                    Unlock advanced features with our Pro version:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="text-primary text-lg">✓</span>
                      <span>Custom tone profiles</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary text-lg">✓</span>
                      <span>Unlimited history</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-primary text-lg">✓</span>
                      <span>Advanced analytics</span>
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full mt-4">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
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

export default Help;
