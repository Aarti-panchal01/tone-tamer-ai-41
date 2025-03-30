
import React from 'react';
import PlatformTabs from './PlatformTabs';
import AIFeatureCard from './AIFeatureCard';

const Dashboard: React.FC = () => {
  const features = [
    {
      icon: "🔍",
      title: "Real-Time Analysis",
      description: "Our AI analyzes your message as you type, detecting emotional tone and potential issues."
    },
    {
      icon: "📝",
      title: "Auto Rewrite",
      description: "Get smart suggestions to improve your message while maintaining your original intent."
    },
    {
      icon: "🎯",
      title: "Style Guide",
      description: "The AI learns your preferred communication style and makes personalized suggestions."
    },
    {
      icon: "🌡️",
      title: "Sentiment Heatmap",
      description: "Visualize which parts of your message might trigger different emotional responses."
    },
    {
      icon: "🌐",
      title: "Context Awareness",
      description: "Recommendations adapt based on platform (Twitter, LinkedIn, Instagram) and audience."
    },
    {
      icon: "💓",
      title: "Empathy Score",
      description: "Understand how your message might be received emotionally by your audience."
    }
  ];

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-8">
          <div className="mb-6">
            <h2 className="text-3xl font-bold tracking-tight mb-2">Tone Checker</h2>
            <p className="text-muted-foreground">
              Analyze and improve your social media messages before posting. Our AI helps ensure your tone is just right.
            </p>
          </div>
          
          <div className="bg-card rounded-lg shadow-sm border p-6">
            <PlatformTabs />
          </div>
        </div>
        
        <div className="md:col-span-4">
          <div className="mb-6">
            <h2 className="text-xl font-bold tracking-tight mb-2">AI Features</h2>
            <p className="text-muted-foreground">Powerful tools to enhance your communication</p>
          </div>
          
          <div className="space-y-4">
            {features.map((feature, i) => (
              <AIFeatureCard 
                key={i}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
