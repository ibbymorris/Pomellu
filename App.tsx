import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeatureCard } from './components/FeatureCard';
import { BackgroundBlob } from './components/BackgroundBlob';
import { EnterWebsite } from './components/EnterWebsite';
import { GeneratingDNA } from './components/GeneratingDNA';
import { BusinessDNA } from './components/BusinessDNA';
import { CampaignsView } from './components/CampaignsView';
import { PhotoshootView } from './components/PhotoshootView';

export default function App() {
  const [currentView, setCurrentView] = useState<'home' | 'enter-website' | 'generating-dna' | 'business-dna' | 'campaigns' | 'photoshoot'>('home');
  const [websiteUrl, setWebsiteUrl] = useState('');

  const handleContinue = (url: string) => {
    setWebsiteUrl(url);
    setCurrentView('generating-dna');
  };

  const handleGenerationComplete = () => {
    setCurrentView('business-dna');
  };

  const handleBusinessDnaComplete = () => {
    setCurrentView('campaigns');
  };

  const handleBack = () => {
    if (currentView === 'business-dna') setCurrentView('generating-dna');
    else if (currentView === 'generating-dna') setCurrentView('enter-website');
    else if (currentView === 'enter-website') setCurrentView('home');
    else if (currentView === 'campaigns') setCurrentView('business-dna');
    else if (currentView === 'photoshoot') setCurrentView('campaigns');
  };

  // The campaigns view has its own full-screen layout (sidebar + content)
  if (currentView === 'campaigns') {
    return <CampaignsView onNavigateBack={handleBack} onNavigateToPhotoshoot={() => setCurrentView('photoshoot')} />;
  }

  // The photoshoot view has its own full-screen layout (sidebar + content)
  if (currentView === 'photoshoot') {
    return <PhotoshootView onNavigateBack={() => setCurrentView('business-dna')} onNavigateToCampaigns={() => setCurrentView('campaigns')} />;
  }

  return (
    <div className="h-screen overflow-hidden bg-surface font-sans text-on-surface relative flex flex-col items-center pt-[100px] pb-8 selection:bg-primary/30">
      <BackgroundBlob />
      <Header currentView={currentView} onBack={handleBack} />

      <main className="relative z-10 flex flex-col items-center flex-1 w-full max-w-7xl mx-auto px-6 min-h-0">
        {currentView === 'home' && (
          <div className="flex flex-col items-center w-full animate-slide-up-fade opacity-0 overflow-y-auto custom-scrollbar pb-8">
            <Hero />

            <div className="flex flex-col md:flex-row gap-6 mt-16 mb-12 justify-center w-full">
              <FeatureCard
                step={1}
                title="Generate Business DNA"
                icon="genetics"
                description="Enter your website and we'll analyze your brand and business."
                iconBgColor="bg-tertiary"
              />
              <FeatureCard
                step={2}
                title="Get campaign ideas"
                icon="campaign"
                description="We'll use your Business DNA to create tailored marketing ideas."
                iconBgColor="bg-primary"
              />
              <FeatureCard
                step={3}
                title="Generate creatives"
                icon="auto_awesome"
                description="We'll generate high quality, on brand creatives that are ready to share."
                iconBgColor="bg-secondary"
              />
            </div>

            <button 
              onClick={() => setCurrentView('enter-website')}
              className="bg-primary hover:bg-primary/90 text-on-primary font-medium text-lg px-8 py-4 rounded-full min-w-[200px] transition-all duration-300 shadow-lg shadow-primary/10 hover:shadow-primary/20 hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-primary/30"
            >
              Let's go!
            </button>
          </div>
        )}

        {currentView === 'enter-website' && (
          <div className="flex flex-col items-center justify-center flex-1 w-full mt-10">
            <EnterWebsite onContinue={handleContinue} />
          </div>
        )}

        {currentView === 'generating-dna' && (
          <div className="flex flex-col items-center justify-center flex-1 w-full mt-2">
            <GeneratingDNA url={websiteUrl} onComplete={handleGenerationComplete} />
          </div>
        )}

        {currentView === 'business-dna' && (
          <div className="w-full flex-1 flex flex-col min-h-0">
            <BusinessDNA onComplete={handleBusinessDnaComplete} />
          </div>
        )}
      </main>

      <style dangerouslySetInnerHTML={{__html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #46483b;
          border-radius: 10px;
        }
      `}} />
    </div>
  );
}