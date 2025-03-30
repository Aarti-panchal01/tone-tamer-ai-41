import React, { useState, ChangeEvent, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Send, RefreshCw, Copy, Check, Sparkles } from "lucide-react";
import { toast } from "sonner";

const mockAnalyzeText = (text: string) => {
  if (!text.trim()) return null;
  
  const lowerCaseText = text.toLowerCase();
  const hasNegativeKeywords = ['hate', 'rude', 'terrible', 'awful', 'worst', 'stupid', 'ridiculous'].some(
    word => lowerCaseText.includes(word)
  );
  
  const hasUpperCase = text === text.toUpperCase() && text.length > 5;
  const hasExclamations = (text.match(/!/g) || []).length > 1;
  
  let overallTone = "neutral";
  let confidence = 70;
  let emojiMeter = "🙂 Neutral tone detected";
  
  if (hasNegativeKeywords || (hasUpperCase && hasExclamations)) {
    overallTone = "negative";
    confidence = 85;
    emojiMeter = "😡 Negative tone detected";
  } else if (text.includes('love') || text.includes('great') || text.includes('awesome')) {
    overallTone = "positive";
    confidence = 80;
    emojiMeter = "😊 Positive tone detected";
  }
  
  const mockResults = {
    overallTone,
    confidence,
    triggers: [],
    suggestions: [],
    highlightedText: text,
    emojiMeter
  };

  const negativeWords = ["hate", "terrible", "awful", "worst", "stupid", "ridiculous", "rude"];
  const sarcasticWords = ["sure", "right", "yeah", "whatever", "obviously"];
  const passiveWords = ["kind of", "sort of", "maybe", "just", "actually"];

  const words = text.split(/\s+/);
  
  for (let i = 0; i < words.length; i++) {
    const word = words[i].toLowerCase().replace(/[.,!?;]/g, '');
    
    if (negativeWords.includes(word)) {
      mockResults.triggers.push({
        word: words[i],
        index: text.indexOf(words[i], i > 0 ? text.indexOf(words[i-1]) + words[i-1].length : 0),
        type: "negative"
      });
    } else if (sarcasticWords.includes(word)) {
      mockResults.triggers.push({
        word: words[i],
        index: text.indexOf(words[i], i > 0 ? text.indexOf(words[i-1]) + words[i-1].length : 0),
        type: "sarcastic"
      });
    } else if (passiveWords.includes(word)) {
      mockResults.triggers.push({
        word: words[i],
        index: text.indexOf(words[i], i > 0 ? text.indexOf(words[i-1]) + words[i-1].length : 0),
        type: "passive"
      });
    }
  }

  if (mockResults.overallTone === "negative") {
    mockResults.suggestions.push("Try using more constructive language to convey your feelings.");
    mockResults.suggestions.push("Consider replacing negative words with more balanced alternatives.");
    mockResults.suggestions.push("Your message might come across as harsh. Consider a more neutral approach.");
  } else if (mockResults.overallTone === "sarcastic") {
    mockResults.suggestions.push("Sarcasm can be easily misinterpreted in text. Consider being more direct.");
    mockResults.suggestions.push("Add emojis to clarify your tone if you want to keep the sarcasm.");
  } else if (mockResults.overallTone === "passive") {
    mockResults.suggestions.push("Your message might come across as uncertain. Try being more direct.");
    mockResults.suggestions.push("Remove phrases like 'kind of' and 'sort of' to sound more confident.");
  } else if (mockResults.overallTone === "positive") {
    mockResults.suggestions.push("Your message has a positive tone. Great job!");
  } else {
    mockResults.suggestions.push("Your message has a neutral tone, which is appropriate for many contexts.");
  }

  if (mockResults.triggers.length > 0) {
    let highlightedText = text;
    let offset = 0;
    
    const sortedTriggers = [...mockResults.triggers].sort((a, b) => b.index - a.index);
    
    for (const trigger of sortedTriggers) {
      const before = highlightedText.substring(0, trigger.index + offset);
      const word = trigger.word;
      const after = highlightedText.substring(trigger.index + offset + word.length);
      
      const highlightedWord = `<span class="${trigger.type}-highlight highlighted-word">${word}</span>`;
      highlightedText = before + highlightedWord + after;
      offset += highlightedWord.length - word.length;
    }
    
    mockResults.highlightedText = highlightedText;
  }

  return mockResults;
};

const mockGenerateAlternative = (text: string, tone: string) => {
  if (!text.trim()) return "";
  
  const lowerCaseText = text.toLowerCase();
  const hasNegativeKeywords = ['hate', 'rude', 'terrible', 'awful', 'worst', 'stupid', 'ridiculous'].some(
    word => lowerCaseText.includes(word)
  );
  
  if (hasNegativeKeywords || text === text.toUpperCase()) {
    const alternatives = {
      positive: `I'm having a challenging day but looking forward to things improving soon! Every obstacle is a stepping stone to something better. ✨`,
      neutral: `Today has been difficult and I've encountered some frustrating interactions. Looking to reset and move forward.`,
      professional: `I'm experiencing some challenges at the moment and finding interactions difficult. I'm working on constructive solutions to improve the situation.`,
      friendly: `Having a rough day today! Hoping things look up soon - how's everyone else doing? We're all in this together! 💖`,
      bold: `Challenging day ahead but I'm DETERMINED to overcome these obstacles and move forward! Nothing will stop me! 💪`,
      casual: `Ugh, today's been a bit much tbh. But tomorrow's a new day, right? Just gotta vibe through it.`,
      inspirational: `Even in difficult moments, I'm grateful for the lessons they bring. Growing through what I'm going through! 🌱`
    };
    return alternatives[tone as keyof typeof alternatives] || text;
  }
  
  const alternatives = {
    positive: `I'm excited about this new feature and believe it offers great potential for improvement! Can't wait to see where this takes us! ✨`,
    neutral: `The feature has been added to the product and will be available after the update. Users can access it through the main dashboard.`,
    professional: `We are pleased to announce the integration of this feature, which will enhance the user experience considerably. We anticipate positive outcomes from this implementation.`,
    friendly: `Hey everyone! We've added this awesome new feature that we think you'll love. Can't wait to hear what you think! Let us know your thoughts! 💖`,
    bold: `This GAME-CHANGING feature is going to revolutionize how you use our product. Don't miss out on the opportunity to transform your experience!`,
    casual: `So we just dropped this cool new thing and honestly? It's pretty fire. Check it out when you get a chance, no pressure.`,
    inspirational: `Innovation happens one feature at a time. We're proud to introduce this new capability that will empower you to achieve more! 🚀`
  };
  
  return alternatives[tone as keyof typeof alternatives] || text;
};

interface ToneInputProps {
  platform?: string;
}

const ToneInput: React.FC<ToneInputProps> = ({ platform = "twitter" }) => {
  const [inputText, setInputText] = useState("I HATE MY LIFE AND THINK PEOPLE ARE RUDE !!!");
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [targetTone, setTargetTone] = useState("professional");
  const [alternativeText, setAlternativeText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [alternatives, setAlternatives] = useState<string[]>([]);
  const [selectedAlternative, setSelectedAlternative] = useState(0);
  const [copied, setCopied] = useState(false);
  
  useEffect(() => {
    if (inputText) {
      analyzeText(inputText);
    }
  }, []);
  
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    if (e.target.value.length > 20) {
      analyzeText(e.target.value);
    } else {
      setAnalysis(null);
    }
  };
  
  const analyzeText = (text: string) => {
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const results = mockAnalyzeText(text);
      setAnalysis(results);
      setIsAnalyzing(false);
    }, 800);
  };
  
  const generateAlternative = () => {
    if (!inputText.trim()) return;
    
    setIsGenerating(true);
    setAlternatives([]);
    
    setTimeout(() => {
      const alternative1 = mockGenerateAlternative(inputText, targetTone);
      const alternative2 = mockGenerateAlternative(inputText, targetTone);
      const alternative3 = mockGenerateAlternative(inputText, targetTone);
      
      const uniqueAlternatives = [alternative1];
      
      if (alternative2 !== alternative1) {
        uniqueAlternatives.push(alternative2);
      } else {
        uniqueAlternatives.push(alternative2 + " I appreciate your understanding.");
      }
      
      if (alternative3 !== alternative1 && alternative3 !== alternative2) {
        uniqueAlternatives.push(alternative3);
      } else {
        uniqueAlternatives.push(alternative3 + " Thank you for your attention to this matter.");
      }
      
      setAlternatives(uniqueAlternatives);
      setAlternativeText(uniqueAlternatives[0]);
      setSelectedAlternative(0);
      setIsGenerating(false);
      
      toast.success("Multiple rewrites generated! Swipe to view options.");
    }, 1200);
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(alternativeText);
    setCopied(true);
    toast.success("Copied to clipboard!");
    
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };
  
  const useAlternative = () => {
    setInputText(alternativeText);
    analyzeText(alternativeText);
    toast.success("Text updated with AI suggestion!");
  };
  
  const getToneColor = (tone: string) => {
    switch (tone) {
      case "positive": return "bg-tone-positive text-white";
      case "negative": return "bg-tone-negative text-white";
      case "neutral": return "bg-tone-neutral text-white";
      case "sarcastic": return "bg-tone-sarcastic text-white";
      case "passive": return "bg-tone-passive text-white";
      default: return "bg-primary";
    }
  };

  const getToneEmoji = (tone: string) => {
    switch (tone) {
      case "positive": return "😊";
      case "negative": return "😡";
      case "neutral": return "🙂";
      case "sarcastic": return "😏";
      case "passive": return "😐";
      default: return "🤔";
    }
  };
  
  const platformConfig = {
    twitter: {
      name: "Twitter/X",
      maxLength: 280,
      icon: "🐦"
    },
    linkedin: {
      name: "LinkedIn",
      maxLength: 3000,
      icon: "🔗"
    },
    instagram: {
      name: "Instagram",
      maxLength: 2200,
      icon: "📸"
    }
  };
  
  const currentPlatform = platformConfig[platform as keyof typeof platformConfig];
  
  const cycleAlternative = (direction: 'next' | 'prev') => {
    if (alternatives.length === 0) return;
    
    let newIndex = selectedAlternative;
    if (direction === 'next') {
      newIndex = (selectedAlternative + 1) % alternatives.length;
    } else {
      newIndex = selectedAlternative - 1 < 0 ? alternatives.length - 1 : selectedAlternative - 1;
    }
    
    setSelectedAlternative(newIndex);
    setAlternativeText(alternatives[newIndex]);
  };
  
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <span className="text-xl mr-2">{currentPlatform.icon}</span>
          <h2 className="text-lg font-semibold">{currentPlatform.name} Post</h2>
        </div>
        <Badge variant="outline" className="font-mono">
          {inputText.length}/{currentPlatform.maxLength}
        </Badge>
      </div>
      
      <Card className="mb-4">
        <div className="p-4">
          <Textarea
            placeholder={`Write your ${currentPlatform.name} post here...`}
            className="min-h-[120px] mb-2 text-base resize-none"
            value={inputText}
            onChange={handleInputChange}
            maxLength={currentPlatform.maxLength}
          />
          
          <div className="flex justify-end space-x-2 mt-3">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => analyzeText(inputText)}
              disabled={inputText.length < 10 || isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  Analyze Tone
                </>
              )}
            </Button>
            
            <Button variant="default" size="sm">
              <Send className="mr-2 h-4 w-4" />
              Post
            </Button>
          </div>
        </div>
      </Card>
      
      {analysis && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Tone Analysis</h3>
            <div className="flex items-center space-x-2">
              <div className="flex items-center px-3 py-1 bg-card rounded-md border">
                <span className="text-xl mr-2">{getToneEmoji(analysis.overallTone)}</span>
                <span className="text-sm font-medium">
                  {analysis.overallTone.charAt(0).toUpperCase() + analysis.overallTone.slice(1)}
                </span>
              </div>
              <Badge className={getToneColor(analysis.overallTone)}>
                {analysis.confidence}%
              </Badge>
            </div>
          </div>
          
          {analysis.emojiMeter && (
            <div className="bg-card p-3 rounded-md border flex items-center justify-center text-center">
              <div className="text-lg">{analysis.emojiMeter}</div>
            </div>
          )}
          
          <Card className="overflow-hidden">
            <Tabs defaultValue="highlight">
              <TabsList className="w-full grid grid-cols-3">
                <TabsTrigger value="highlight">Tone Heatmap</TabsTrigger>
                <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
                <TabsTrigger value="rewrite">AI Rewrite</TabsTrigger>
              </TabsList>
              
              <TabsContent value="highlight" className="p-4">
                <div 
                  className="p-3 bg-background rounded-md min-h-[100px]"
                  dangerouslySetInnerHTML={{ __html: analysis.highlightedText }}
                ></div>
                
                {analysis.triggers.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-medium mb-2">Highlighted Words</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.triggers.map((trigger: any, index: number) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className={`${trigger.type}-highlight`}
                        >
                          {trigger.word}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="suggestions" className="p-4">
                {analysis.suggestions.length > 0 ? (
                  <ul className="space-y-2">
                    {analysis.suggestions.map((suggestion: string, index: number) => (
                      <li key={index} className="flex items-start">
                        <span className="text-primary mr-2">•</span>
                        <span>{suggestion}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted-foreground italic">
                    Your message appears to have a good tone! No specific suggestions at this time.
                  </p>
                )}
              </TabsContent>
              
              <TabsContent value="rewrite" className="p-4">
                <div className="mb-4">
                  <h4 className="text-sm font-medium mb-2">Target Tone</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge 
                      variant={targetTone === "positive" ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setTargetTone("positive")}
                    >
                      <span className="mr-1">😊</span> Positive
                    </Badge>
                    <Badge 
                      variant={targetTone === "neutral" ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setTargetTone("neutral")}
                    >
                      <span className="mr-1">🙂</span> Neutral
                    </Badge>
                    <Badge 
                      variant={targetTone === "professional" ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setTargetTone("professional")}
                    >
                      <span className="mr-1">💼</span> Professional
                    </Badge>
                    <Badge 
                      variant={targetTone === "friendly" ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setTargetTone("friendly")}
                    >
                      <span className="mr-1">👋</span> Friendly
                    </Badge>
                    <Badge 
                      variant={targetTone === "bold" ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setTargetTone("bold")}
                    >
                      <span className="mr-1">💪</span> Bold
                    </Badge>
                    <Badge 
                      variant={targetTone === "casual" ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setTargetTone("casual")}
                    >
                      <span className="mr-1">😎</span> Casual
                    </Badge>
                    <Badge 
                      variant={targetTone === "inspirational" ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setTargetTone("inspirational")}
                    >
                      <span className="mr-1">✨</span> Inspirational
                    </Badge>
                  </div>
                </div>
                
                <Button
                  variant="outline" 
                  size="sm"
                  className="mb-3"
                  onClick={generateAlternative}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate AI Rewrites
                    </>
                  )}
                </Button>
                
                {alternatives.length > 0 ? (
                  <div className="space-y-4">
                    <div className="relative">
                      <div className="p-4 bg-background rounded-md border border-primary/20 min-h-[120px] shadow-sm">
                        <div className="flex justify-between items-center mb-2">
                          <Badge variant="outline" className="bg-primary/10">
                            Option {selectedAlternative + 1}/{alternatives.length}
                          </Badge>
                          
                          <div className="flex gap-1">
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => cycleAlternative('prev')}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m15 18-6-6 6-6"/>
                              </svg>
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8"
                              onClick={() => cycleAlternative('next')}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m9 18 6-6-6-6"/>
                              </svg>
                            </Button>
                          </div>
                        </div>
                        
                        <p className="whitespace-pre-wrap">{alternativeText}</p>
                        
                        <div className="absolute -bottom-3 right-4 flex gap-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="shadow-sm"
                            onClick={copyToClipboard}
                          >
                            {copied ? (
                              <>
                                <Check className="mr-1.5 h-3.5 w-3.5" />
                                Copied
                              </>
                            ) : (
                              <>
                                <Copy className="mr-1.5 h-3.5 w-3.5" />
                                Copy
                              </>
                            )}
                          </Button>
                          
                          <Button
                            size="sm"
                            variant="default"
                            className="shadow-sm"
                            onClick={useAlternative}
                          >
                            Use This Version
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-center gap-1 pt-2">
                      {alternatives.map((_, index) => (
                        <button
                          key={index}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === selectedAlternative ? 'bg-primary scale-125' : 'bg-muted'
                          }`}
                          onClick={() => {
                            setSelectedAlternative(index);
                            setAlternativeText(alternatives[index]);
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="bg-muted/30 border border-dashed rounded-md p-6 flex flex-col items-center justify-center text-center space-y-2">
                    <div className="rounded-full bg-muted/50 p-3">
                      <Sparkles className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <p className="text-muted-foreground">
                      Click "Generate AI Rewrites" to get multiple tone-adjusted alternatives
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ToneInput;
