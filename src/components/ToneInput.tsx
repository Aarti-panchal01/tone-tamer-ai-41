import React, { useState, ChangeEvent, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Send, RefreshCw, Copy, Check, Sparkles, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

const mockAnalyzeText = (text: string) => {
  if (!text.trim()) return null;
  
  const lowerCaseText = text.toLowerCase();
  
  const harmfulKeywords = ['kill', 'suicide', 'harm', 'end my life', 'want to die'];
  const hasHarmfulContent = harmfulKeywords.some(phrase => lowerCaseText.includes(phrase));
  
  if (hasHarmfulContent) {
    return {
      overallTone: "harmful",
      confidence: 90,
      triggers: [
        {
          word: text.trim(),
          index: 0,
          type: "harmful"
        }
      ],
      suggestions: [
        "This content suggests potential harm. Please consider reaching out for support.",
        "If you're experiencing distress, please contact a mental health professional or crisis helpline.",
        "Remember that help is available. Consider reaching out to supportive friends, family, or professionals."
      ],
      highlightedText: `<span class="harmful-highlight highlighted-word">${text}</span>`,
      emojiMeter: "⚠️ Potentially harmful content detected",
      requiresAttention: true
    };
  }
  
  const financialDistressKeywords = ['no money', 'poor', 'broke', 'can\'t afford', 'debt', 'bankrupt', 'poverty'];
  const hasFinancialDistress = financialDistressKeywords.some(phrase => lowerCaseText.includes(phrase));
  
  const negativeKeywords = ['hate', 'rude', 'terrible', 'awful', 'worst', 'stupid', 'ridiculous'];
  const hasNegativeKeywords = negativeKeywords.some(word => lowerCaseText.includes(word));
  
  const hasUpperCase = text === text.toUpperCase() && text.length > 5;
  const hasExclamations = (text.match(/!/g) || []).length > 1;
  
  let overallTone = "neutral";
  let confidence = 70;
  let emojiMeter = "🙂 Neutral tone detected";
  
  if (hasFinancialDistress) {
    overallTone = "negative";
    confidence = 85;
    emojiMeter = "😟 Financial distress detected";
  } else if (hasNegativeKeywords || (hasUpperCase && hasExclamations)) {
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
    emojiMeter,
    requiresAttention: false
  };

  const negativeWords = ["hate", "terrible", "awful", "worst", "stupid", "ridiculous", "rude", "no money", "poor", "broke", "debt", "bankrupt", "poverty"];
  const sarcasticWords = ["sure", "right", "yeah", "whatever", "obviously"];
  const passiveWords = ["kind of", "sort of", "maybe", "just", "actually"];

  const words = text.split(/\s+/);
  
  if (hasFinancialDistress) {
    for (const phrase of financialDistressKeywords) {
      if (lowerCaseText.includes(phrase)) {
        const index = lowerCaseText.indexOf(phrase);
        mockResults.triggers.push({
          word: text.substring(index, index + phrase.length),
          index: index,
          type: "negative"
        });
      }
    }
  }
  
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

  if (hasFinancialDistress) {
    mockResults.suggestions.push("Your message indicates financial concerns. Consider a more optimistic framing if appropriate.");
    mockResults.suggestions.push("Financial situations are temporary. Consider a tone that focuses on solutions or support.");
    mockResults.suggestions.push("If sharing financial struggles, consider adding context about your plans or needs.");
  } else if (mockResults.overallTone === "negative") {
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
  const harmfulKeywords = ['kill', 'suicide', 'harm', 'end my life', 'want to die'];
  const hasHarmfulContent = harmfulKeywords.some(phrase => lowerCaseText.includes(phrase));
  
  if (hasHarmfulContent) {
    return "I'm having a difficult time and would appreciate some support or someone to talk to.";
  }
  
  const financialDistressKeywords = ['no money', 'poor', 'broke', 'can\'t afford', 'debt', 'bankrupt', 'poverty'];
  const hasFinancialDistress = financialDistressKeywords.some(phrase => lowerCaseText.includes(phrase));
  
  const extractCircumstances = () => {
    if (hasFinancialDistress) {
      return "financial situation";
    }
    
    const nouns = text.match(/\b(?:the\s+)?([a-z]+(?:\s+[a-z]+)?)\b/gi) || [];
    return nouns.length > 0 ? nouns[Math.floor(nouns.length / 2)] : "situation";
  };
  
  const circumstance = extractCircumstances();
  
  const toneTransformations: Record<string, (input: string, circumstances: string) => string> = {
    positive: (input, circumstances) => {
      if (hasFinancialDistress) {
        const phrases = [
          `I'm working through some temporary financial challenges right now, but I'm staying positive and focusing on solutions! 💪✨`,
          `Currently navigating a tight financial spot, but I'm grateful for what I do have and excited about future opportunities! 🌱💖`,
          `Embracing this moment of financial growth - every challenge brings new lessons and I'm ready for them! 🌟`,
          `This financial chapter is just temporary! I'm focused on the abundance of possibilities ahead and staying optimistic! 😊✨`
        ];
        return phrases[Math.floor(Math.random() * phrases.length)];
      }
      
      const phrases = [
        `I'm thrilled about ${circumstances}! Every step forward is a victory! 😊✨`,
        `What a fantastic ${circumstances}! I'm genuinely excited about this! 🌟`,
        `I'm absolutely delighted with ${circumstances}! This is wonderful news and I'm feeling very optimistic! 💖`,
        `So happy about ${circumstances}! This is exactly the kind of positive outcome I was hoping for! 🎉`
      ];
      return phrases[Math.floor(Math.random() * phrases.length)];
    },
    
    professional: (input, circumstances) => {
      if (hasFinancialDistress) {
        const phrases = [
          `I'm currently seeking opportunities to improve my financial situation. I welcome any professional advice or connections that might be beneficial.`,
          `I'm navigating some financial constraints at present and exploring sustainable solutions. Any professional guidance would be appreciated.`,
          `I'm in the process of restructuring my financial approach and would value insights from those with relevant expertise in this area.`,
          `I'm currently reassessing my financial strategy and would appreciate any professional resources or opportunities that might assist in this transition.`
        ];
        return phrases[Math.floor(Math.random() * phrases.length)];
      }
      
      const phrases = [
        `I would like to address the matter of ${circumstances} with a structured approach that aligns with our established objectives.`,
        `After careful analysis of ${circumstances}, I've developed a solution that effectively addresses the key requirements.`,
        `Regarding ${circumstances}, I've implemented a methodical approach that adheres to industry best practices.`,
        `I'm pleased to provide an update on ${circumstances}, which has been handled according to our standard protocols.`
      ];
      return phrases[Math.floor(Math.random() * phrases.length)];
    },
    
    friendly: (input, circumstances) => {
      if (hasFinancialDistress) {
        const phrases = [
          `Hey friends! Going through a bit of a tight spot with money right now - anyone have tips for fun free activities we could do together? 💖`,
          `Budget mode: activated! 😅 Who else is saving right now? Let's share some money-saving hacks and support each other! ✨`,
          `Being budget-conscious these days, but still want to hang out! Anyone up for a potluck or movie night at my place this weekend? 🍿💕`,
          `Wallet's feeling light lately but my spirit isn't! Who's up for a walk in the park and good conversation? Sometimes the best things in life really are free! 🌳💫`
        ];
        return phrases[Math.floor(Math.random() * phrases.length)];
      }
      
      const phrases = [
        `Hey there! Just wanted to chat about ${circumstances} - it's been on my mind lately and I'd love your thoughts! 💕`,
        `Hi friend! Have you heard about ${circumstances}? Let me know what you think - I'm all ears! 🤗`,
        `Hello lovely! ${circumstances.charAt(0).toUpperCase() + circumstances.slice(1)} has been keeping me busy lately - would love to catch up and tell you all about it! ✨`,
        `Hey you! What's your take on ${circumstances}? I've been thinking about it and would love your perspective! 💭`
      ];
      return phrases[Math.floor(Math.random() * phrases.length)];
    },
    
    neutral: (input, circumstances) => {
      if (hasFinancialDistress) {
        const phrases = [
          `Currently managing financial constraints and exploring available options.`,
          `Navigating limited financial resources at present. Considering viable alternatives.`,
          `Financial resources are currently restricted. Evaluating next steps accordingly.`,
          `Experiencing budgetary limitations. Assessing appropriate courses of action.`
        ];
        return phrases[Math.floor(Math.random() * phrases.length)];
      }
      
      const phrases = [
        `Regarding ${circumstances}: the process has been completed as specified.`,
        `This update concerns ${circumstances}. Documentation is available if needed.`,
        `${circumstances.charAt(0).toUpperCase() + circumstances.slice(1)} has been addressed according to guidelines.`,
        `Information about ${circumstances} has been processed. Further details are available upon request.`
      ];
      return phrases[Math.floor(Math.random() * phrases.length)];
    },
    
    bold: (input, circumstances) => {
      if (hasFinancialDistress) {
        const phrases = [
          `ATTENTION: I'm ACTIVELY SEEKING new INCOME OPPORTUNITIES! Let's connect if you know of any AMAZING positions that match my EXCEPTIONAL skills!`,
          `BREAKING: I'm on a RADICAL financial reset journey and CRUSHING my budget goals! INCREDIBLE money-saving tips welcome!`,
          `ANNOUNCING my REVOLUTIONARY "zero spending" challenge! Follow along as I TRANSFORM my financial future in just 30 DAYS!`,
          `CALLING ALL CONNECTIONS! I'm LAUNCHING my freelance career and READY to deliver OUTSTANDING results at COMPETITIVE rates! DM for details!`
        ];
        return phrases[Math.floor(Math.random() * phrases.length)];
      }
      
      const phrases = [
        `This GROUNDBREAKING development with ${circumstances} is going to REVOLUTIONIZE how we approach everything! Don't miss this INCREDIBLE opportunity!`,
        `ATTENTION: I've just discovered a GAME-CHANGING approach to ${circumstances} that will TRANSFORM your entire perspective! Act NOW!`,
        `I've COMPLETELY REIMAGINED ${circumstances} and the results are SPECTACULAR! This will DRAMATICALLY improve everything!`,
        `${circumstances.toUpperCase()} is the BIGGEST and MOST IMPORTANT topic we need to discuss! You WON'T BELIEVE the AMAZING insights I've gained!`
      ];
      return phrases[Math.floor(Math.random() * phrases.length)];
    },
    
    genz: (input, circumstances) => {
      if (hasFinancialDistress) {
        const phrases = [
          `Bestie my bank account is in its flop era fr 😭 But we still vibing and that's on period! 💅`,
          `No cap, I'm broke as a joke rn but still slaying the day! It's giving resourceful queen energy! 👑`,
          `My wallet said "I'm literally empty" and I felt that 💀 Still gonna make this my main character era tho! ✨`,
          `The struggle is real but I'm still that girl! 💁‍♀️ Budget life check! Who else is surviving on vibes and instant noodles? 🍜`
        ];
        return phrases[Math.floor(Math.random() * phrases.length)];
      }
      
      const phrases = [
        `FR FR ${circumstances} is so bussin, no cap! It's giving main character energy and that's on periodt! 💅✨`,
        `Bestie, this ${circumstances} moment is LITERALLY eating and leaving no crumbs! It's so fire you'll be SHOOK! 😭🤌`,
        `The way ${circumstances} ate and left zero crumbs?? You're about to be obsessed, I'm dead serious! It's giving everything it's supposed to give! 💯🔥`,
        `I can't even with how slay ${circumstances} is! It's lowkey POPing off. Not me being obsessed with it! 💁‍♀️✌️`
      ];
      return phrases[Math.floor(Math.random() * phrases.length)];
    }
  };
  
  if (!toneTransformations[tone]) {
    return toneTransformations.neutral(text, circumstance);
  }
  
  const transformedText = toneTransformations[tone](text, circumstance);
  
  const seed = Date.now() % 10000;
  
  return transformedText + (seed % 2 === 0 ? '' : ' ');
};

interface ToneInputProps {
  platform?: string;
}

const ToneInput: React.FC<ToneInputProps> = ({ platform = "twitter" }) => {
  const [inputText, setInputText] = useState("");
  const [analysis, setAnalysis] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [targetTone, setTargetTone] = useState("professional");
  const [alternativeText, setAlternativeText] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [alternatives, setAlternatives] = useState<string[]>([]);
  const [selectedAlternative, setSelectedAlternative] = useState(0);
  const [copied, setCopied] = useState(false);
  const [hasWarning, setHasWarning] = useState(false);
  const [regenerateCounter, setRegenerateCounter] = useState(0);
  
  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    setHasWarning(false);
    
    if (analysis !== null) {
      setAnalysis(null);
    }
  };
  
  const analyzeText = (text: string) => {
    if (!text.trim()) {
      toast.error("Please enter some text to analyze");
      return;
    }
    
    setIsAnalyzing(true);
    
    setTimeout(() => {
      const results = mockAnalyzeText(text);
      setAnalysis(results);
      setIsAnalyzing(false);
      
      if (results && results.requiresAttention) {
        setHasWarning(true);
        toast.warning("This content may require attention", {
          description: "Please be mindful of potentially harmful content.",
          duration: 5000,
          action: {
            label: "Get Support",
            onClick: () => window.open("https://www.crisistextline.org/", "_blank"),
          }
        });
      }
    }, 800);
  };
  
  const generateAlternative = () => {
    if (!inputText.trim()) return;
    
    setIsGenerating(true);
    setAlternatives([]);
    
    setTimeout(() => {
      const alternative = mockGenerateAlternative(inputText, targetTone);
      
      setAlternatives([alternative]);
      setAlternativeText(alternative);
      setSelectedAlternative(0);
      setIsGenerating(false);
    }, 1200);
  };
  
  const forceRegenerate = () => {
    setRegenerateCounter(prev => prev + 1);
    generateAlternative();
  };
  
  useEffect(() => {
    if (inputText.trim() && analysis !== null) {
      generateAlternative();
    }
  }, [targetTone, regenerateCounter]);
  
  useEffect(() => {
    if (analysis !== null && inputText.trim()) {
      generateAlternative();
    }
  }, [analysis]);
  
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
      case "positive": return "bg-green-500 text-white";
      case "negative": return "bg-red-500 text-white";
      case "neutral": return "bg-gray-500 text-white";
      case "harmful": return "bg-red-600 text-white";
      default: return "bg-primary";
    }
  };

  const getToneEmoji = (tone: string) => {
    switch (tone) {
      case "positive": return "😊";
      case "negative": return "😟";
      case "neutral": return "🙂";
      case "harmful": return "⚠️";
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
      
      <Card className={`mb-4 ${hasWarning ? 'border-red-400' : ''}`}>
        <div className="p-4">
          <Textarea
            placeholder={`Write your ${currentPlatform.name} post here...`}
            className={`min-h-[120px] mb-2 text-base resize-none ${hasWarning ? 'bg-red-50 border-red-300' : 'bg-[#f7f7ff]'}`}
            value={inputText}
            onChange={handleInputChange}
            maxLength={currentPlatform.maxLength}
          />
          
          {hasWarning && (
            <div className="mb-3 p-2 bg-red-50 border border-red-300 rounded flex items-center text-red-700">
              <AlertTriangle className="h-4 w-4 mr-2" />
              <span className="text-sm">This content may contain harmful language. Consider rephrasing.</span>
            </div>
          )}
          
          <div className="flex justify-end space-x-2 mt-3">
            <Button 
              variant={hasWarning ? "destructive" : "default"}
              size="sm"
              onClick={() => analyzeText(inputText)}
              disabled={inputText.length < 3 || isAnalyzing}
              className="shadow-sm"
            >
              {isAnalyzing ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Analyze Tone"
              )}
            </Button>
          </div>
        </div>
      </Card>
      
      {analysis && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">Tone Analysis</h3>
            <div className="flex items-center space-x-2">
              <div className="flex items-center px-3 py-1 rounded-md border">
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
            <div className={`p-3 rounded-md border flex items-center justify-center text-center ${analysis.overallTone === "harmful" ? "bg-red-50 border-red-300 text-red-700" : "bg-card"}`}>
              <div className="text-lg">{analysis.emojiMeter}</div>
            </div>
          )}
          
          <Card className="overflow-hidden">
            <Tabs defaultValue="rewrite">
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
                      className={`cursor-pointer ${targetTone === "positive" ? "bg-green-500 hover:bg-green-600" : ""}`}
                      onClick={() => setTargetTone("positive")}
                    >
                      <span className="mr-1">😊</span> Positive
                    </Badge>
                    <Badge 
                      variant={targetTone === "neutral" ? "default" : "outline"}
                      className={`cursor-pointer ${targetTone === "neutral" ? "bg-gray-500 hover:bg-gray-600" : ""}`}
                      onClick={() => setTargetTone("neutral")}
                    >
                      <span className="mr-1">🙂</span> Neutral
                    </Badge>
                    <Badge 
                      variant={targetTone === "professional" ? "default" : "outline"}
                      className={`cursor-pointer ${targetTone === "professional" ? "bg-purple-500 hover:bg-purple-600" : ""}`}
                      onClick={() => setTargetTone("professional")}
                    >
                      <span className="mr-1">💼</span> Professional
                    </Badge>
                    <Badge 
                      variant={targetTone === "friendly" ? "default" : "outline"}
                      className={`cursor-pointer ${targetTone === "friendly" ? "bg-blue-500 hover:bg-blue-600" : ""}`}
                      onClick={() => setTargetTone("friendly")}
                    >
                      <span className="mr-1">👋</span> Friendly
                    </Badge>
                    <Badge 
                      variant={targetTone === "bold" ? "default" : "outline"}
                      className={`cursor-pointer ${targetTone === "bold" ? "bg-amber-500 hover:bg-amber-600" : ""}`}
                      onClick={() => setTargetTone("bold")}
                    >
                      <span className="mr-1">💪</span> Bold
                    </Badge>
                    <Badge 
                      variant={targetTone === "genz" ? "default" : "outline"}
                      className={`cursor-pointer ${targetTone === "genz" ? "bg-pink-500 hover:bg-pink-600" : ""}`}
                      onClick={() => setTargetTone("genz")}
                    >
                      <span className="mr-1">💅</span> Gen Z
                    </Badge>
                  </div>
                </div>
                
                <Button
                  variant="outline" 
                  size="sm"
                  className="mb-3 flex items-center"
                  onClick={forceRegenerate}
                  disabled={isGenerating || !inputText.trim()}
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Edit className="mr-2 h-4 w-4" />
                      Rewrite with AI
                    </>
                  )}
                </Button>
                
                {alternatives.length > 0 ? (
                  <div className="space-y-4">
                    <div className="relative">
                      <div className="p-4 bg-background rounded-md border border-primary/20 min-h-[120px] shadow-sm">
                        <p className="whitespace-pre-wrap">{alternativeText}</p>
                        
                        <div className="mt-4 flex gap-2 justify-end">
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
                            className="shadow-sm text-purple-600 bg-purple-100 hover:bg-purple-200 hover:text-purple-700"
                            onClick={useAlternative}
                          >
                            Use this version
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  inputText.trim() ? (
                    <div className="bg-muted/30 border border-dashed rounded-md p-6 flex flex-col items-center justify-center text-center space-y-2">
                      <div className="rounded-full bg-muted/50 p-3">
                        <Edit className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <p className="text-muted-foreground">
                        Click "Rewrite with AI" to get a tone-adjusted alternative
                      </p>
                    </div>
                  ) : (
                    <div className="bg-muted/30 border border-dashed rounded-md p-6 flex flex-col items-center justify-center text-center space-y-2">
                      <p className="text-muted-foreground">
                        Write some text to generate an AI rewrite
                      </p>
                    </div>
                  )
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
