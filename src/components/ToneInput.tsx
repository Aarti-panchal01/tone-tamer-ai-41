
import React, { useState, ChangeEvent } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Send, RefreshCw } from "lucide-react";

// This would be replaced with actual API calls to your AI models
const mockAnalyzeText = (text: string) => {
  if (!text.trim()) return null;
  
  // This is just a mock implementation
  const tones = ["positive", "neutral", "negative", "sarcastic", "passive"];
  const mockResults = {
    overallTone: tones[Math.floor(Math.random() * tones.length)],
    confidence: Math.floor(Math.random() * 40 + 60), // Random score between 60-100
    triggers: [],
    suggestions: [],
    highlightedText: text
  };

  // Simple mock to find potential trigger words
  const negativeWords = ["hate", "terrible", "awful", "worst", "stupid", "ridiculous"];
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

  // Generate mock suggestions
  if (mockResults.overallTone === "negative") {
    mockResults.suggestions.push("Try using more positive language to convey your message.");
    mockResults.suggestions.push("Consider replacing negative words with constructive alternatives.");
  } else if (mockResults.overallTone === "sarcastic") {
    mockResults.suggestions.push("Sarcasm can be easily misinterpreted in text. Consider being more direct.");
    mockResults.suggestions.push("Add emojis to clarify your tone if you want to keep the sarcasm.");
  } else if (mockResults.overallTone === "passive") {
    mockResults.suggestions.push("Your message might come across as uncertain. Try being more direct.");
    mockResults.suggestions.push("Remove phrases like 'kind of' and 'sort of' to sound more confident.");
  }

  // Generate highlighted text
  if (mockResults.triggers.length > 0) {
    let highlightedText = text;
    let offset = 0;
    
    // Sort triggers by index in descending order to prevent index shifting
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

// Mock function to generate alternative text
const mockGenerateAlternative = (text: string, tone: string) => {
  if (!text.trim()) return "";
  
  const alternatives = {
    positive: `I'm excited about this new feature and believe it offers great potential for improvement!`,
    neutral: `The feature has been added to the product and will be available after the update.`,
    professional: `We are pleased to announce the integration of this feature, which will enhance the user experience considerably.`,
  };
  
  return alternatives[tone as keyof typeof alternatives] || text;
};

interface ToneInputProps {
  platform?: string;
}

const ToneInput: React.FC<ToneInputProps> = ({ platform = "twitter" }) => {
  const [inputText, setInputText] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [targetTone, setTargetTone] = useState("positive");
  const [alternativeText, setAlternativeText] = useState("");
  
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    if (e.target.value.length > 20) {
      // For a real implementation, you would want to debounce this
      analyzeText(e.target.value);
    } else {
      setAnalysis(null);
    }
  };
  
  const analyzeText = (text: string) => {
    setIsAnalyzing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const results = mockAnalyzeText(text);
      setAnalysis(results);
      setIsAnalyzing(false);
    }, 800);
  };
  
  const generateAlternative = () => {
    if (!inputText.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      const alternative = mockGenerateAlternative(inputText, targetTone);
      setAlternativeText(alternative);
      setIsAnalyzing(false);
    }, 800);
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
            <Badge className={getToneColor(analysis.overallTone)}>
              {analysis.overallTone.charAt(0).toUpperCase() + analysis.overallTone.slice(1)} 
              ({analysis.confidence}%)
            </Badge>
          </div>
          
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
                      Positive
                    </Badge>
                    <Badge 
                      variant={targetTone === "neutral" ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setTargetTone("neutral")}
                    >
                      Neutral
                    </Badge>
                    <Badge 
                      variant={targetTone === "professional" ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setTargetTone("professional")}
                    >
                      Professional
                    </Badge>
                  </div>
                </div>
                
                <Button
                  variant="outline" 
                  size="sm"
                  className="mb-3"
                  onClick={generateAlternative}
                  disabled={isAnalyzing}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Rewrite with AI
                </Button>
                
                {alternativeText ? (
                  <div className="p-3 bg-background rounded-md">
                    <p>{alternativeText}</p>
                    <Button
                      variant="ghost" 
                      size="sm"
                      className="mt-2 text-primary"
                      onClick={() => setInputText(alternativeText)}
                    >
                      Use this version
                    </Button>
                  </div>
                ) : (
                  <p className="text-muted-foreground italic">
                    Click "Rewrite with AI" to get tone-adjusted alternatives
                  </p>
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
