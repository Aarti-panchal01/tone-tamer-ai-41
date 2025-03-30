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
  
  const negativeKeywords = ['hate', 'rude', 'terrible', 'awful', 'worst', 'stupid', 'ridiculous'];
  const hasNegativeKeywords = negativeKeywords.some(word => lowerCaseText.includes(word));
  
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
    emojiMeter,
    requiresAttention: false
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
  const harmfulKeywords = ['kill', 'suicide', 'harm', 'end my life', 'want to die'];
  const hasHarmfulContent = harmfulKeywords.some(phrase => lowerCaseText.includes(phrase));
  
  if (hasHarmfulContent) {
    return "I'm having a difficult time and would appreciate some support or someone to talk to.";
  }
  
  const toneOutputs = {
    positive: [
      "I'm thrilled about this progress and see so much potential! Every step forward is a victory! 😊✨",
      "What a fantastic development! I'm genuinely excited about the amazing possibilities this creates! 🌟",
      "I'm absolutely delighted with these results! This is such wonderful news and I'm feeling very optimistic! 💖"
    ],
    negative: [
      "This is extremely disappointing. I expected much better results than this.",
      "I'm completely unsatisfied with the outcome. The quality is far below acceptable standards.",
      "This is not at all what I wanted. I'm very unhappy with how things turned out."
    ],
    neutral: [
      "The process has been completed as requested. The results are now available for review.",
      "This update contains several modifications to the system. Documentation is available for reference.",
      "The features have been implemented according to specifications. Testing can now begin."
    ],
    professional: [
      "We're pleased to inform you that the requested modifications have been successfully implemented per specifications.",
      "Upon thorough analysis of the requirements, we have developed a solution that effectively addresses the key objectives.",
      "I would like to confirm that we have completed the integration as discussed, which should enhance overall functionality."
    ],
    friendly: [
      "Hey there! Just wanted to let you know we've added that awesome feature you asked for! Can't wait to hear what you think! 💖",
      "Hi friend! Amazing news - we've made those changes you were hoping for! Hope you love them as much as we do! 🥰",
      "Hello lovely! Just popping in to share that everything you requested is ready to go! So excited for you to see it! ✨"
    ],
    bold: [
      "This GROUNDBREAKING update is going to REVOLUTIONIZE how you interact with our platform! Don't miss this INCREDIBLE opportunity!",
      "ATTENTION: We've just unleashed a GAME-CHANGING feature that will TRANSFORM your entire experience! Act NOW!",
      "We've COMPLETELY REIMAGINED the interface and the results are SPECTACULAR! This will DRAMATICALLY improve your workflow!"
    ],
    casual: [
      "So yeah, we just rolled out that thing you wanted. Pretty cool if you ask me. Check it out whenever.",
      "Just FYI, that update is done. Turned out pretty decent. Let me know what you think when you get a chance.",
      "Hey, so that stuff you asked for is ready now. No rush, but it's there when you need it."
    ],
    genz: [
      "FR FR this update is so bussin, no cap! It's giving main character energy and that's on periodt! 💅✨",
      "Bestie, this feature is LITERALLY eating and leaving no crumbs! It's so fire you'll be SHOOK! 😭🤌",
      "The way this update ate and left zero crumbs?? You're about to be obsessed, I'm dead serious! It's giving everything it's supposed to give! 💯🔥"
    ],
    inspirational: [
      "Every step forward is a testament to your vision. This update represents not just code, but possibility—embrace it! 🚀",
      "Behind every feature lies a journey of growth. Let this improvement be the wings that elevate your project to new heights! ✨",
      "The path to excellence is paved with continuous improvement. This update is not the destination, but another beautiful step in your journey! 🌟"
    ]
  };
  
  const hasNegativeKeywords = ['hate', 'rude', 'terrible', 'awful', 'worst', 'stupid', 'ridiculous'].some(
    word => lowerCaseText.includes(word)
  );
  
  if (hasNegativeKeywords || text === text.toUpperCase()) {
    const negativeAlternatives = {
      positive: "I'm experiencing some challenges but remain optimistic about finding solutions! Every obstacle is just a stepping stone to something better. ✨",
      neutral: "I'm encountering some difficulties with this situation. Looking for ways to address these issues efficiently.",
      professional: "We've identified several challenges in the current implementation. We're developing a structured approach to resolve these matters promptly.",
      friendly: "Having a bit of a rough time with this! But hey, we'll figure it out together! How's everyone else handling similar situations? 💖",
      bold: "Facing some MAJOR CHALLENGES right now but I'm DETERMINED to overcome them! Nothing will stand in the way of SUCCESS! 💪",
      casual: "Tbh this isn't really working out great. Kind of a bummer, but whatever, we'll figure something out I guess.",
      genz: "This is lowkey stressing me out fr fr. Not the vibe I was looking for. But we move! No cap! 😭✋",
      inspirational: "Within every challenge lies the seed of opportunity. I'm embracing this moment of difficulty as the soil from which growth will bloom! 🌱"
    };
    
    return negativeAlternatives[tone as keyof typeof negativeAlternatives] || negativeAlternatives.neutral;
  }
  
  const toneOptions = toneOutputs[tone as keyof typeof toneOutputs];
  if (!toneOptions) {
    return toneOutputs.neutral[Math.abs(text.length % toneOutputs.neutral.length)];
  }
  
  return toneOptions[Math.abs(text.length % toneOptions.length)];
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
      case "negative": return "😡";
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
  
  useEffect(() => {
    if (inputText.trim() && analysis !== null) {
      generateAlternative();
    }
  }, [targetTone]);
  
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
                  onClick={generateAlternative}
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
