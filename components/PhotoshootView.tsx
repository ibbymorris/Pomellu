import React, { useState } from 'react';

interface PhotoshootViewProps {
  onNavigateBack?: () => void;
  onNavigateToCampaigns?: () => void;
}

const PRODUCT_IMAGES = [
  "https://labs.google.com/pomelli_downloads/accounts/96vAwBU0h4J9OjW11fL_Qm/thumbnails_medium/8CwIZa-sE5275oB-fzrkml?authuser=0",
  "https://labs.google.com/pomelli_downloads/accounts/96vAwBU0h4J9OjW11fL_Qm/thumbnails_medium/8-p5zd88xeTbvmC1RZx_g_?authuser=0",
  "https://labs.google.com/pomelli_downloads/accounts/96vAwBU0h4J9OjW11fL_Qm/thumbnails_medium/9KZUTaPyJp33hk5-ecW4HE?authuser=0",
  "https://labs.google.com/pomelli_downloads/accounts/96vAwBU0h4J9OjW11fL_Qm/thumbnails_small/8U2HOn-M65G2yBy0DjyOB5?authuser=0",
  "https://labs.google.com/pomelli_downloads/accounts/96vAwBU0h4J9OjW11fL_Qm/thumbnails_small/8kQuu5st8SI4GStNWes_LO?authuser=0",
  "https://picsum.photos/seed/cake1/400/400",
  "https://picsum.photos/seed/cake2/400/400",
];

const TEMPLATES = [
  { id: 'studio', label: 'Studio', image: 'https://gstatic.com/_/bettany/MjAyNjAyMjUuMDFfcDA/sage%2Fassets/photoshoot/shot_thumbnails/CONSUMABLES_STUDIO_NEUTRAL.png' },
  { id: 'floating', label: 'Floating', image: 'https://gstatic.com/_/bettany/MjAyNjAyMjUuMDFfcDA/sage%2Fassets/photoshoot/shot_thumbnails/CONSUMABLES_STUDIO_FLOATING.png', disabled: true },
  { id: 'ingredient', label: 'Ingredient', image: 'https://gstatic.com/_/bettany/MjAyNjAyMjUuMDFfcDA/sage%2Fassets/photoshoot/shot_thumbnails/CONSUMABLES_STUDIO_INGREDIENT.png' },
  { id: 'in_use', label: 'In Use', image: 'https://gstatic.com/_/bettany/MjAyNjAyMjUuMDFfcDA/sage%2Fassets/photoshoot/shot_thumbnails/CONSUMABLES_LIFESTYLE_IN_USE.png' },
  { id: 'contextual', label: 'Contextual', image: 'https://gstatic.com/_/bettany/MjAyNjAyMjUuMDFfcDA/sage%2Fassets/photoshoot/shot_thumbnails/CONSUMABLES_LIFESTYLE_CONTEXTUAL.png' },
  { id: 'easter', label: 'Easter', image: 'https://gstatic.com/_/bettany/MjAyNjAyMjUuMDFfcDA/sage%2Fassets/photoshoot/shot_thumbnails/CONSUMABLES_SEASONAL_EASTER.png', disabled: true },
];

export const PhotoshootView: React.FC<PhotoshootViewProps> = ({ onNavigateBack, onNavigateToCampaigns }) => {
  const [viewMode, setViewMode] = useState<'landing' | 'create' | 'select_image' | 'select_templates'>('landing');
  const [selectedProductImage, setSelectedProductImage] = useState<string | null>(null);
  const [tempSelectedImage, setTempSelectedImage] = useState<string | null>(null);
  
  const [selectedTemplates, setSelectedTemplates] = useState<string[]>([]);
  const [tempSelectedTemplates, setTempSelectedTemplates] = useState<string[]>([]);

  const handleImageLooksGood = () => {
    setSelectedProductImage(tempSelectedImage);
    setViewMode('create');
    // Simulate AI auto-selecting templates when an image is chosen
    if (tempSelectedImage && selectedTemplates.length === 0) {
      setSelectedTemplates(['studio', 'ingredient', 'in_use', 'contextual']);
    }
  };

  const handleTemplatesLooksGood = () => {
    setSelectedTemplates(tempSelectedTemplates);
    setViewMode('create');
  };

  const toggleTempTemplate = (id: string) => {
    setTempSelectedTemplates(prev => {
      if (prev.includes(id)) {
        return prev.filter(t => t !== id);
      } else if (prev.length < 4) {
        return [...prev, id];
      }
      return prev;
    });
  };

  return (
    <div className="flex h-screen w-screen bg-[#13140e] text-on-surface overflow-hidden font-sans relative">
      
      {/* Sidebar Navigation */}
      <aside className="w-[275px] h-full bg-[#1b1b1b] border-r border-outline/20 flex flex-col shrink-0 z-30 transition-all duration-200">
        
        {/* Header / Logo Area */}
        <div className="h-[72px] px-4 flex items-center gap-2 cursor-pointer transition-colors hover:bg-white/5">
          <span className="google-symbols text-[26px] text-primary">google_labs</span>
          <span className="text-[22px] text-primary font-sans tracking-wide">Pomelli</span>
          <span className="text-[10px] font-medium border border-[#46483b] text-[#c7c8b6] rounded-full px-2.5 py-1 tracking-wider ml-1">EXPERIMENT</span>
          
          <button className="ml-auto w-10 h-10 flex items-center justify-center text-on-surface-variant hover:bg-white/10 rounded-full transition-colors">
             <span className="material-symbols-outlined text-[24px]">right_panel_open</span>
          </button>
        </div>

        {/* Nav Items */}
        <nav className="flex flex-col gap-1.5 px-2 py-3 mt-2">
          
          <button 
            onClick={onNavigateBack}
            className="flex items-center gap-3 px-4 py-3 rounded-[6px] text-on-surface-variant hover:bg-white/5 transition-colors w-full text-left"
          >
            <span className="material-symbols-outlined text-[24px]">genetics</span>
            <span className="text-[16px]">Business DNA</span>
          </button>

          <button 
            onClick={onNavigateToCampaigns}
            className="flex items-center gap-3 px-4 py-3 rounded-[6px] text-on-surface-variant hover:bg-white/5 transition-colors w-full text-left"
          >
            <span className="google-symbols text-[24px]">smart_campaign</span>
            <span className="text-[16px]">Campaigns</span>
          </button>

          <button className="flex items-center gap-3 px-4 py-3 rounded-[6px] bg-primary text-on-primary font-medium transition-colors w-full text-left">
            <span className="google-symbols text-[24px]">photo_spark</span>
            <span className="text-[16px]">Photoshoot</span>
          </button>

        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden flex flex-col animate-slide-up-fade opacity-0" style={{ animationFillMode: 'forwards' }}>
        
        {/* Top Right Header Actions (Avatar & More Vert) */}
        <header className="absolute top-0 right-0 p-4 flex justify-end items-center gap-4 z-40 w-full pointer-events-none">
          <div className="flex items-center gap-3 pointer-events-auto mr-2 mt-1">
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined text-[24px]">more_vert</span>
            </button>
            <button className="w-9 h-9 rounded-full bg-[#f48fb1] flex items-center justify-center text-[#13140e] font-sans font-medium text-sm shadow-sm ring-1 ring-white/20">
              I
            </button>
          </div>
        </header>

        {viewMode === 'landing' ? (
          <div className="flex-1 flex flex-col items-center w-full px-8 pt-20 pb-24 overflow-auto custom-scrollbar">
             <div className="w-full max-w-[1200px] flex flex-col items-center gap-12 mt-6">
                
                {/* Header Title */}
                <div className="flex flex-col items-center text-center gap-2 w-full max-w-[640px] animate-slide-up-fade" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
                   <span className="google-symbols text-[28px] text-on-surface" style={{ fontVariationSettings: "'FILL' 1" }}>photo_spark</span>
                   <h1 className="font-playfair italic text-[36px] text-on-surface leading-tight">Photoshoot</h1>
                   <p className="font-sans text-[14px] text-on-surface-variant leading-relaxed">
                     Choose a guided template for professional product shots or use our flexible editor to create anything you can imagine.
                   </p>
                </div>

                {/* Action Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full animate-slide-up-fade" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                  
                  {/* Create a product photoshoot card */}
                  <div 
                    onClick={() => setViewMode('create')}
                    className="bg-[#1e1f20] border-2 border-transparent hover:border-primary rounded-[32px] p-8 flex flex-col gap-4 cursor-pointer transition-colors group"
                  >
                    <div className="flex flex-col gap-1">
                      <h3 className="font-sans text-[16px] font-medium text-on-surface">Create a product photoshoot</h3>
                      <p className="font-sans text-[14px] text-on-surface-variant">Choose a product image and templates to get professional shots</p>
                    </div>
                    <div className="w-full aspect-[494/284] rounded-[12px] overflow-hidden bg-[#282a2c] mt-2 relative">
                      <video 
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                        className="w-full h-full object-cover"
                      >
                        <source src="https://gstatic.com/_/bettany/MjAyNjAyMjUuMDFfcDA/sage%2Fassets/photoshoot/create.mp4" type="video/mp4" />
                      </video>
                    </div>
                  </div>

                  {/* Generate or edit an image card */}
                  <div className="bg-[#1e1f20] border-2 border-transparent hover:border-primary rounded-[32px] p-8 flex flex-col gap-4 cursor-pointer transition-colors group">
                    <div className="flex flex-col gap-1">
                      <h3 className="font-sans text-[16px] font-medium text-on-surface">Generate or edit an image</h3>
                      <p className="font-sans text-[14px] text-on-surface-variant">Describe the image you want with a prompt or edit an existing one</p>
                    </div>
                    <div className="w-full aspect-[494/284] rounded-[12px] overflow-hidden bg-[#282a2c] mt-2 relative">
                      <video 
                        autoPlay 
                        loop 
                        muted 
                        playsInline
                        className="w-full h-full object-cover"
                      >
                        <source src="https://gstatic.com/_/bettany/MjAyNjAyMjUuMDFfcDA/sage%2Fassets/photoshoot/edit.mp4" type="video/mp4" />
                      </video>
                    </div>
                  </div>

                </div>

             </div>
          </div>
        ) : viewMode === 'create' ? (
          <div className="flex-1 flex w-full h-full overflow-hidden animate-in fade-in duration-300">
            {/* Main Editor Panel */}
            <div className="flex-1 h-full bg-[#1b1b1b] flex flex-col z-10 relative">
              {/* Top Bar */}
              <div className="absolute top-6 left-6 z-20">
                <button 
                  onClick={() => setViewMode('landing')}
                  className="w-10 h-10 rounded-full bg-[#333537] flex items-center justify-center text-[#d0db8e] hover:bg-[#46483b] transition-colors"
                >
                  <span className="material-symbols-outlined text-[24px]">arrow_back</span>
                </button>
              </div>
              <div className="absolute top-6 right-6 z-20">
                <button 
                  onClick={() => setViewMode('landing')}
                  className="w-10 h-10 rounded-full bg-[#333537] flex items-center justify-center text-[#d0db8e] hover:bg-[#46483b] transition-colors"
                >
                  <span className="material-symbols-outlined text-[24px]">close</span>
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col items-center pt-24 pb-32">
                
                <div className="w-full max-w-[800px] flex flex-col gap-8 px-8">
                  {/* Header */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-[18px] font-medium text-on-surface">
                      <span className="google-symbols text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>camera_filter_auto</span>
                      Product Photoshoot with Templates
                    </div>
                    <p className="text-[14px] text-on-surface-variant leading-relaxed">
                      Select your product and shot templates to generate new professional photos.
                    </p>
                  </div>

                  {/* Ingredients Container */}
                  <div className="flex gap-6 w-full">
                    
                    {/* Product Image */}
                    <div className="flex-1 bg-[#282a2c] rounded-[24px] p-6 flex flex-col gap-4 min-h-[400px]">
                      <div className="flex items-center justify-between">
                        <span className="text-[16px] font-medium text-on-surface">Product Image</span>
                        <button 
                          onClick={() => {
                            setTempSelectedImage(selectedProductImage);
                            setViewMode('select_image');
                          }}
                          className="w-8 h-8 rounded-full bg-[#333537] hover:bg-[#46483b] flex items-center justify-center text-[#d0db8e] transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                      </div>
                      
                      {selectedProductImage ? (
                        <div className="flex-1 rounded-[16px] overflow-hidden relative group">
                          <img src={selectedProductImage} alt="Selected Product" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <button 
                          onClick={() => {
                            setTempSelectedImage(selectedProductImage);
                            setViewMode('select_image');
                          }}
                          className="flex-1 rounded-[16px] hover:bg-white/5 transition-colors flex flex-col items-center justify-center gap-2 text-on-surface-variant"
                        >
                          <span className="material-symbols-outlined text-[24px]">add</span>
                          <span className="text-[14px] font-medium">Select Image</span>
                        </button>
                      )}
                    </div>

                    {/* Photoshoot Templates */}
                    <div className="flex-1 bg-[#282a2c] rounded-[24px] p-6 flex flex-col gap-4 min-h-[400px]">
                      <div className="flex items-center justify-between">
                        <span className="text-[16px] font-medium text-on-surface">Photoshoot Templates</span>
                        <button 
                          onClick={() => {
                            setTempSelectedTemplates(selectedTemplates);
                            setViewMode('select_templates');
                          }}
                          className="w-8 h-8 rounded-full bg-[#333537] hover:bg-[#46483b] flex items-center justify-center text-[#d0db8e] transition-colors"
                        >
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                      </div>
                      
                      {selectedTemplates.length > 0 ? (
                        <div className="grid grid-cols-3 gap-2">
                          {selectedTemplates.map(id => {
                            const template = TEMPLATES.find(t => t.id === id);
                            if (!template) return null;
                            return (
                              <div key={id} className="relative aspect-square rounded-[12px] overflow-hidden bg-[#333537]">
                                <img src={template.image} alt={template.label} className="w-full h-full object-cover" />
                              </div>
                            );
                          })}
                          {selectedTemplates.length < 9 && (
                            <button 
                              onClick={() => {
                                setTempSelectedTemplates(selectedTemplates);
                                setViewMode('select_templates');
                              }}
                              className="aspect-square rounded-[12px] bg-[#333537] hover:bg-[#46483b] transition-colors flex flex-col items-center justify-center gap-1 text-on-surface-variant"
                            >
                              <span className="material-symbols-outlined text-[20px]">add</span>
                              <span className="text-[12px] font-medium">Select Template</span>
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="grid grid-cols-3 gap-2">
                          <button 
                            onClick={() => {
                              setTempSelectedTemplates(selectedTemplates);
                              setViewMode('select_templates');
                            }}
                            className="aspect-square rounded-[12px] bg-[#333537] hover:bg-[#46483b] transition-colors flex flex-col items-center justify-center gap-1 text-on-surface-variant"
                          >
                            <span className="material-symbols-outlined text-[20px]">add</span>
                            <span className="text-[12px] font-medium">Select Template</span>
                          </button>
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Aspect Ratio */}
                  <div className="mt-4">
                    <button className="flex items-center gap-2 bg-[#282a2c] hover:bg-[#333537] text-on-surface px-4 py-2 rounded-full font-sans text-[14px] font-medium transition-colors w-max">
                      Story (9:16)
                      <span className="material-symbols-outlined text-[20px]">arrow_drop_down</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Bar */}
              <div className="absolute bottom-8 right-8 z-20">
                <button 
                  disabled={!selectedProductImage || selectedTemplates.length === 0}
                  className="bg-[#333537] hover:bg-[#46483b] disabled:opacity-50 disabled:cursor-not-allowed text-on-surface px-6 py-3 rounded-full font-sans text-[14px] font-medium transition-colors"
                >
                  Create Photoshoot
                </button>
              </div>

            </div>
          </div>
        ) : viewMode === 'select_image' ? (
          <div className="flex-1 flex flex-col w-full h-full bg-[#1e1f20] rounded-tl-[16px] mt-8 ml-8 overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
            {/* Header */}
            <div className="flex items-center gap-4 p-6 shrink-0">
              <button 
                onClick={() => setViewMode('create')}
                className="w-10 h-10 rounded-full bg-[#333537] flex items-center justify-center text-primary hover:bg-[#46483b] transition-colors"
              >
                <span className="material-symbols-outlined text-[24px]">arrow_back</span>
              </button>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 text-[16px] font-medium text-on-surface">
                  <span className="material-symbols-outlined text-[24px]">add_photo_alternate</span>
                  Select your product
                </div>
                <div className="flex items-center justify-between w-full">
                  <p className="text-[14px] text-on-surface-variant">Select or upload a product image that you would like to use for the photoshoot</p>
                </div>
              </div>
              <div className="ml-auto text-[14px] text-primary">
                ({tempSelectedImage ? '1' : '0'}/1 selected)
              </div>
            </div>

            {/* Image Grid */}
            <div className="flex-1 overflow-y-auto custom-scrollbar px-6 pb-24">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                
                {/* Upload Button */}
                <button className="aspect-square rounded-[16px] bg-[#46483b] hover:bg-[#5a5c4d] flex flex-col items-center justify-center gap-2 text-primary transition-colors">
                  <span className="material-symbols-outlined text-[24px]">upload</span>
                  <span className="text-[14px] font-medium">Upload Images</span>
                </button>

                {/* Images */}
                {PRODUCT_IMAGES.map((img, idx) => {
                  const isSelected = tempSelectedImage === img;
                  return (
                    <div 
                      key={idx}
                      onClick={() => setTempSelectedImage(img)}
                      className={`aspect-square rounded-[16px] overflow-hidden cursor-pointer relative transition-all duration-200 ${
                        isSelected ? 'ring-4 ring-primary ring-offset-2 ring-offset-[#1e1f20] scale-[0.98]' : 'hover:opacity-90'
                      }`}
                    >
                      <img src={img} alt={`Product ${idx}`} className="w-full h-full object-cover" />
                      {isSelected && (
                        <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-[#2c3400]">
                          <span className="material-symbols-outlined text-[16px]">check</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="absolute bottom-0 right-0 p-6 w-full flex justify-end bg-gradient-to-t from-[#1e1f20] via-[#1e1f20] to-transparent pointer-events-none">
              <button 
                onClick={handleImageLooksGood}
                disabled={!tempSelectedImage}
                className="pointer-events-auto bg-[#333537] hover:bg-[#46483b] disabled:opacity-50 disabled:cursor-not-allowed text-on-surface px-8 py-3 rounded-full font-sans text-[14px] font-medium transition-colors min-w-[160px]"
              >
                Looks Good
              </button>
            </div>
          </div>
        ) : viewMode === 'select_templates' ? (
          <div className="flex-1 flex flex-col w-full h-full bg-[#1e1f20] rounded-tl-[16px] mt-8 ml-8 overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
            {/* Header */}
            <div className="flex items-center gap-4 p-6 shrink-0">
              <button 
                onClick={() => setViewMode('create')}
                className="w-10 h-10 rounded-full bg-[#333537] flex items-center justify-center text-primary hover:bg-[#46483b] transition-colors"
              >
                <span className="material-symbols-outlined text-[24px]">arrow_back</span>
              </button>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 text-[16px] font-medium text-on-surface">
                  <span className="material-symbols-outlined text-[24px]">add_photo_alternate</span>
                  Choose product shots
                </div>
                <div className="flex items-center justify-between w-full">
                  <p className="text-[14px] text-on-surface-variant">Select up to 4 templates from a curated selection of shots that are tailored to your product</p>
                </div>
              </div>
              <div className="ml-auto text-[14px] text-primary">
                ({tempSelectedTemplates.length}/4 selected)
              </div>
            </div>

            {/* Templates Grid */}
            <div className="flex-1 overflow-y-auto custom-scrollbar px-6 pb-24">
              <div className="flex flex-col gap-4">
                <div className="text-[14px] font-medium text-on-surface flex items-center gap-2">
                  Consumables <span className="text-primary">(Recommended)</span>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {TEMPLATES.map((template) => {
                    const isSelected = tempSelectedTemplates.includes(template.id);
                    return (
                      <div 
                        key={template.id}
                        onClick={() => !template.disabled && toggleTempTemplate(template.id)}
                        className={`aspect-square rounded-[16px] overflow-hidden relative transition-all duration-200 bg-[#282a2c]
                          ${template.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:opacity-90'}
                          ${isSelected ? 'ring-4 ring-primary ring-offset-2 ring-offset-[#1e1f20] scale-[0.98]' : ''}
                        `}
                      >
                        <img src={template.image} alt={template.label} className="w-full h-full object-cover" />
                        
                        {/* Label Overlay */}
                        <div className={`absolute bottom-2 left-2 right-2 rounded-[8px] py-1.5 text-center text-[12px] font-medium transition-colors
                          ${isSelected ? 'bg-primary text-[#2c3400]' : 'bg-black/50 text-white backdrop-blur-sm'}
                        `}>
                          {template.label}
                        </div>

                        {/* Checkmark */}
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center text-[#2c3400]">
                            <span className="material-symbols-outlined text-[16px]">check</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Action Bar */}
            <div className="absolute bottom-0 right-0 p-6 w-full flex justify-end bg-gradient-to-t from-[#1e1f20] via-[#1e1f20] to-transparent pointer-events-none">
              <button 
                onClick={handleTemplatesLooksGood}
                className="pointer-events-auto bg-primary hover:bg-[#d0db8e] text-[#2c3400] px-8 py-3 rounded-full font-sans text-[14px] font-medium transition-colors min-w-[160px]"
              >
                Looks Good
              </button>
            </div>
          </div>
        ) : null}

      </main>
    </div>
  );
};
