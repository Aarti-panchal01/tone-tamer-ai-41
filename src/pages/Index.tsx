
import React from 'react';
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";

const Index: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <style jsx global>{`
          .negative-highlight {
            background-color: rgba(239, 68, 68, 0.2);
            border-bottom: 2px solid rgb(239, 68, 68);
          }
          .sarcastic-highlight {
            background-color: rgba(245, 158, 11, 0.2);
            border-bottom: 2px solid rgb(245, 158, 11);
          }
          .passive-highlight {
            background-color: rgba(59, 130, 246, 0.2);
            border-bottom: 2px solid rgb(59, 130, 246);
          }
          .harmful-highlight {
            background-color: rgba(220, 38, 38, 0.2);
            border-bottom: 2px solid rgb(220, 38, 38);
            display: inline-block;
            padding: 2px 4px;
            border-radius: 4px;
          }
        `}</style>
        <Dashboard />
      </main>
      <footer className="py-6 border-t">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2023 ToneTamer by Aarti. Vibes only.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              Legal
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
