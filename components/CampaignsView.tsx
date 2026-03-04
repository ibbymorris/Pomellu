import React, { useState } from 'react';

interface CampaignsViewProps {
  onNavigateBack?: () => void;
  onNavigateToPhotoshoot?: () => void;
}

interface Campaign {
  id: number;
  title: string;
  image: string;
  description: string;
}

const INITIAL_CARDS: Campaign[] = [
  {
    id: 1,
    title: "The art of Easter indulgence.",
    image: "https://labs.google.com/pomelli_downloads/accounts/96vAwBU0h4J9OjW11fL_Qm/thumbnails_medium/8CwIZa-sE5275oB-fzrkml?authuser=0",
    description: "Positioning the Burnt Basque cheesecake as the ultimate sophisticated centerpiece for spring holiday gatherings and Easter celebrations."
  },
  {
    id: 2,
    title: "The centerpiece of your spring table.",
    image: "https://labs.google.com/pomelli_downloads/accounts/96vAwBU0h4J9OjW11fL_Qm/thumbnails_medium/8-p5zd88xeTbvmC1RZx_g_?authuser=0",
    description: "Positioning the cheesecake as a sophisticated, effortless centerpiece for upcoming Spring and Easter gatherings."
  },
  {
    id: 3,
    title: "Burned by design, creamy by nature.",
    image: "https://labs.google.com/pomelli_downloads/accounts/96vAwBU0h4J9OjW11fL_Qm/thumbnails_medium/9KZUTaPyJp33hk5-ecW4HE?authuser=0",
    description: "Highlighting the signature textural contrast of the Burnt Basque style—specifically the caramelized 'burnt' exterior versus the ultra-creamy, molten interior."
  }
];

// Fallback images to rotate through when generating new ideas
const FALLBACK_IMAGES = [
  "https://labs.google.com/pomelli_downloads/accounts/96vAwBU0h4J9OjW11fL_Qm/thumbnails_medium/8CwIZa-sE5275oB-fzrkml?authuser=0",
  "https://labs.google.com/pomelli_downloads/accounts/96vAwBU0h4J9OjW11fL_Qm/thumbnails_medium/8-p5zd88xeTbvmC1RZx_g_?authuser=0",
  "https://labs.google.com/pomelli_downloads/accounts/96vAwBU0h4J9OjW11fL_Qm/thumbnails_medium/9KZUTaPyJp33hk5-ecW4HE?authuser=0",
  "https://labs.google.com/pomelli_downloads/accounts/96vAwBU0h4J9OjW11fL_Qm/thumbnails_small/8U2HOn-M65G2yBy0DjyOB5?authuser=0",
  "https://labs.google.com/pomelli_downloads/accounts/96vAwBU0h4J9OjW11fL_Qm/thumbnails_small/8kQuu5st8SI4GStNWes_LO?authuser=0"
];

const EXTRACTED_IMAGES = [
  "https://labs.google.com/pomelli_downloads/accounts/96vAwBU0h4J9OjW11fL_Qm/thumbnails_medium/9KZUTaPyJp33hk5-ecW4HE?authuser=0",
  "https://labs.google.com/pomelli_downloads/accounts/96vAwBU0h4J9OjW11fL_Qm/thumbnails_medium/8CwIZa-sE5275oB-fzrkml?authuser=0",
  "https://labs.google.com/pomelli_downloads/accounts/96vAwBU0h4J9OjW11fL_Qm/thumbnails_medium/8-p5zd88xeTbvmC1RZx_g_?authuser=0",
  "https://labs.google.com/pomelli_downloads/accounts/96vAwBU0h4J9OjW11fL_Qm/thumbnails_small/8U2HOn-M65G2yBy0DjyOB5?authuser=0",
  "https://labs.google.com/pomelli_downloads/accounts/96vAwBU0h4J9OjW11fL_Qm/thumbnails_small/8kQuu5st8SI4GStNWes_LO?authuser=0",
  "https://picsum.photos/seed/cake1/400/400",
  "https://picsum.photos/seed/cake2/400/400",
  "https://picsum.photos/seed/cake3/400/400",
  "https://picsum.photos/seed/cake4/400/400",
];

export const CampaignsView: React.FC<CampaignsViewProps> = ({ onNavigateBack, onNavigateToPhotoshoot }) => {
  const [showNotification, setShowNotification] = useState(true);
  const [promptText, setPromptText] = useState("");
  const [campaigns, setCampaigns] = useState<Campaign[]>(INITIAL_CARDS);
  const [editingState, setEditingState] = useState<{ id: number, field: 'title' | 'description', value: string } | null>(null);

  // Product extraction state
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [productUrl, setProductUrl] = useState("");
  const [isExtracting, setIsExtracting] = useState(false);
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
  const [extractedProduct, setExtractedProduct] = useState<{title: string, description: string, image: string} | null>(null);
  const [addedProduct, setAddedProduct] = useState<{title: string, description: string, image: string} | null>(null);
  const [isRemoveProductModalOpen, setIsRemoveProductModalOpen] = useState(false);
  const [isSelectImagesModalOpen, setIsSelectImagesModalOpen] = useState(false);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [tempSelectedImages, setTempSelectedImages] = useState<string[]>([]);

  const handleSuggestIdeas = () => {
    if (!promptText.trim()) return;

    const newCampaign: Campaign = {
      id: Date.now(),
      title: "New Custom Campaign",
      image: FALLBACK_IMAGES[campaigns.length % FALLBACK_IMAGES.length],
      description: promptText.trim()
    };

    setCampaigns([newCampaign, ...campaigns]);
    setPromptText("");
  };

  const handleEditStart = (id: number, field: 'title' | 'description', value: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingState({ id, field, value });
  };

  const handleEditSave = () => {
    if (!editingState) return;

    setCampaigns(prevCampaigns => prevCampaigns.map(c => 
      c.id === editingState.id 
        ? { ...c, [editingState.field]: editingState.value.trim() || c[editingState.field] } 
        : c
    ));
    setEditingState(null);
  };

  const handleExtractProduct = () => {
    setIsExtracting(true);
    // Simulate API call
    setTimeout(() => {
      setIsExtracting(false);
      setIsAddProductModalOpen(false);
      setExtractedProduct({
        title: "Classic Burnt Basque Cheesecake",
        description: "Indulge in the rich and creamy delight of our Classic Burnt Basque Cheesecake, made with an original Spanish recipe and completely gluten-free. With its perfectly caramelized top and a velvety, melt-in-your-mouth center, this cheesecake offers a unique balance of flavors that is both simple and sophisticated.",
        image: "https://labs.google.com/pomelli_downloads/accounts/96vAwBU0h4J9OjW11fL_Qm/thumbnails_medium/9KZUTaPyJp33hk5-ecW4HE?authuser=0"
      });
      setIsCatalogModalOpen(true);
    }, 2000);
  };

  const handleLooksGood = () => {
    setAddedProduct(extractedProduct);
    setIsCatalogModalOpen(false);
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

          <button className="flex items-center gap-3 px-4 py-3 rounded-[6px] bg-primary text-on-primary font-medium transition-colors w-full text-left">
            <span className="google-symbols text-[24px]">smart_campaign</span>
            <span className="text-[16px]">Campaigns</span>
          </button>

          <button 
            onClick={onNavigateToPhotoshoot}
            className="flex items-center gap-3 px-4 py-3 rounded-[6px] text-on-surface-variant hover:bg-white/5 transition-colors w-full text-left"
          >
            <span className="google-symbols text-[24px]">photo_spark</span>
            <span className="text-[16px]">Photoshoot</span>
          </button>

        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-auto custom-scrollbar flex flex-col animate-slide-up-fade opacity-0">
        
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

        {/* Notification Banner */}
        {showNotification && (
          <div className="absolute top-6 left-6 z-40 w-[340px] bg-[#dce4a0] text-[#13140e] rounded-[28px] p-5 shadow-lg flex flex-col gap-3 animate-slide-up-fade">
             
             <button 
                onClick={() => setShowNotification(false)}
                className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/10 transition-colors"
             >
                <span className="material-symbols-outlined text-[20px]">close</span>
             </button>

             <div className="flex gap-3 mt-1">
                <span className="material-symbols-outlined text-[24px] shrink-0 mt-0.5">campaign</span>
                <div className="flex flex-col gap-1.5 pr-4">
                   <h3 className="font-sans text-[16px] font-medium leading-snug">Try new Photoshoot feature</h3>
                   <p className="font-sans text-[14px] leading-relaxed opacity-90">
                     Skip the cost and complexity of traditional photoshoots and generate compelling, on-brand images of your products.
                   </p>
                </div>
             </div>

             <button className="self-start ml-9 font-sans text-[14px] font-medium underline hover:bg-black/5 px-2 py-1 -ml-2 rounded transition-colors">
                Try Photoshoot
             </button>

             {/* Inner glowing animation effect matched roughly */}
             <div className="absolute inset-0 rounded-[28px] overflow-hidden pointer-events-none mix-blend-overlay opacity-30">
                 <div className="w-[200%] h-[200%] bg-gradient-to-br from-transparent via-white to-transparent animate-[spin_4s_linear_infinite] origin-top-left opacity-50"></div>
             </div>
          </div>
        )}

        {/* Center Content Container */}
        <div className="flex-1 flex flex-col items-center w-full px-6 pt-16 pb-24">
           
           <div className="w-full max-w-[928px] flex flex-col items-center gap-10 mt-6">
              
              {/* Campaigns Header Title */}
              <div className="flex flex-col items-center text-center gap-2 w-full animate-slide-up-fade" style={{ animationDelay: '0.1s' }}>
                 <span className="material-symbols-outlined text-[28px] text-on-surface">campaign</span>
                 <h1 className="font-playfair italic text-4xl text-on-surface">Campaigns</h1>
                 <p className="font-sans text-[14px] text-on-surface-variant">Start from our suggestions or prompt to create a new campaign.</p>
              </div>

              {/* Prompt Input Bar Area */}
              <div className="w-full flex flex-col items-center gap-2 animate-slide-up-fade" style={{ animationDelay: '0.2s' }}>
                <div className="w-full max-w-[800px] bg-[#1e1f20] border border-[#46483b] hover:border-primary transition-colors rounded-[24px] p-2 flex flex-col shadow-lg">
                   
                   <textarea 
                     value={promptText}
                     onChange={(e) => setPromptText(e.target.value)}
                     onKeyDown={(e) => {
                       if (e.key === 'Enter' && !e.shiftKey) {
                         e.preventDefault();
                         handleSuggestIdeas();
                       }
                     }}
                     placeholder="Describe the campaign you want to create"
                     className="w-full bg-transparent border-none text-[16px] text-on-surface placeholder-outline resize-none min-h-[60px] px-4 pt-4 pb-2 focus:outline-none custom-scrollbar"
                   />

                   <div className="flex flex-wrap items-center gap-2 px-2 pb-2">
                      {!addedProduct ? (
                        <button 
                          onClick={() => setIsAddProductModalOpen(true)}
                          className="flex items-center gap-2 bg-[#282a2c] hover:bg-[#333537] text-[#e2e6be] px-4 py-2 rounded-full font-sans text-[14px] font-medium transition-colors"
                        >
                          <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
                          Product
                        </button>
                      ) : (
                        <div className="flex items-center gap-2 bg-[#333537] text-[#e2e6be] pl-4 pr-2 py-1.5 rounded-full font-sans text-[14px] font-medium border border-[#46483b]">
                          <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
                          <span className="max-w-[100px] truncate">{addedProduct.title}</span>
                          <button 
                            onClick={() => setIsRemoveProductModalOpen(true)}
                            className="material-symbols-outlined text-[18px] hover:text-white flex items-center justify-center rounded-full hover:bg-white/10 w-6 h-6 -mr-1"
                          >
                            close
                          </button>
                        </div>
                      )}

                      {selectedImages.length > 0 ? (
                        <div className="flex items-center gap-2 bg-[#333537] text-[#e2e6be] pl-1.5 pr-2 py-1.5 rounded-full font-sans text-[14px] font-medium border border-[#46483b]">
                          <img src={selectedImages[0]} alt="thumbnail" className="w-6 h-6 rounded-full object-cover" />
                          <span className="pl-1 pr-1">{selectedImages.length} Image{selectedImages.length > 1 ? 's' : ''}</span>
                          <button 
                            onClick={() => setSelectedImages([])}
                            className="material-symbols-outlined text-[18px] hover:text-white flex items-center justify-center rounded-full hover:bg-white/10 w-6 h-6 -mr-1"
                          >
                            close
                          </button>
                        </div>
                      ) : addedProduct ? (
                        <div 
                          onClick={() => {
                            setTempSelectedImages(selectedImages);
                            setIsSelectImagesModalOpen(true);
                          }}
                          className="flex items-center gap-2 bg-[#333537] hover:bg-[#46483b] cursor-pointer text-[#e2e6be] pl-1.5 pr-4 py-1.5 rounded-full font-sans text-[14px] font-medium border border-[#46483b] transition-colors"
                        >
                          <img src={addedProduct.image} alt="thumbnail" className="w-6 h-6 rounded-full object-cover" />
                          1 Image
                        </div>
                      ) : (
                        <button 
                          onClick={() => {
                            setTempSelectedImages(selectedImages);
                            setIsSelectImagesModalOpen(true);
                          }}
                          className="flex items-center gap-2 bg-[#282a2c] hover:bg-[#333537] text-[#e2e6be] px-4 py-2 rounded-full font-sans text-[14px] font-medium transition-colors"
                        >
                          <span className="material-symbols-outlined text-[20px]">image</span>
                          Images
                        </button>
                      )}

                      <button className="flex items-center gap-2 bg-[#282a2c] hover:bg-[#333537] text-[#e2e6be] pl-4 pr-2 py-2 rounded-full font-sans text-[14px] font-medium transition-colors">
                        Aspect Ratio
                        <span className="material-symbols-outlined text-[20px]">arrow_drop_down</span>
                      </button>

                      <div className="flex-1"></div>

                      <button 
                        onClick={handleSuggestIdeas}
                        disabled={!promptText.trim() && !addedProduct && selectedImages.length === 0}
                        className="flex items-center gap-2 bg-[#c1cd7d] hover:bg-[#d0db8e] disabled:opacity-50 disabled:cursor-not-allowed text-[#2c3400] px-5 py-2 rounded-full font-sans text-[14px] font-medium transition-colors shadow-sm"
                      >
                        <span className="material-symbols-outlined text-[20px]">auto_awesome</span>
                        {addedProduct || selectedImages.length > 0 ? "Generate Ideas" : "Suggest Ideas"}
                      </button>
                   </div>
                </div>
                
                <p className="font-sans text-[12px] text-outline text-center mt-1">Pomelli can make mistakes, so double-check it.</p>
              </div>

              {/* Suggestions Grid */}
              <div className="w-full flex flex-col gap-4 animate-slide-up-fade" style={{ animationDelay: '0.3s' }}>
                <h3 className="font-sans text-[16px] text-on-surface-variant px-1">Suggestions based on Business DNA</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                   {campaigns.map((card, idx) => (
                      <div 
                        key={card.id} 
                        className="group relative bg-[#333537] border-2 border-transparent hover:border-primary rounded-[16px] p-5 flex flex-col gap-4 transition-all duration-300 animate-slide-up-fade opacity-0"
                        style={{ animationDelay: `${0.3 + (idx * 0.1)}s` }}
                      >
                         
                         {/* Card overflow menu button - appears on hover */}
                         <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#c5caa3] text-[#2e3317] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-[#ddea97]">
                            <span className="material-symbols-outlined text-[20px]">more_vert</span>
                         </button>

                         <div className="w-full aspect-[9/16] rounded-xl overflow-hidden bg-[#1e1f20] relative cursor-pointer">
                            <img 
                              src={card.image} 
                              alt={card.title} 
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {/* Inner vignette/gradient for text readability if text was overlaid, keeping it for style */}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/40 pointer-events-none"></div>
                         </div>
                         
                         <div className="flex flex-col gap-2 relative">
                           {editingState?.id === card.id && editingState.field === 'title' ? (
                             <input
                               autoFocus
                               value={editingState.value}
                               onChange={(e) => setEditingState({ ...editingState, value: e.target.value })}
                               onBlur={handleEditSave}
                               onKeyDown={(e) => e.key === 'Enter' && handleEditSave()}
                               className="font-sans text-[16px] text-on-surface leading-tight font-medium bg-black/20 border border-primary/50 focus:border-primary rounded outline-none px-2 py-1 -ml-2 w-[calc(100%+16px)]"
                             />
                           ) : (
                             <h4 
                               onClick={(e) => handleEditStart(card.id, 'title', card.title, e)}
                               className="font-sans text-[16px] text-on-surface leading-tight font-medium cursor-text hover:bg-white/5 rounded px-2 py-1 -ml-2 transition-colors border border-transparent hover:border-outline/30"
                               title="Click to edit title"
                             >
                               {card.title}
                             </h4>
                           )}

                           {editingState?.id === card.id && editingState.field === 'description' ? (
                             <textarea
                               autoFocus
                               value={editingState.value}
                               onChange={(e) => setEditingState({ ...editingState, value: e.target.value })}
                               onBlur={handleEditSave}
                               className="font-sans text-[12px] text-on-surface-variant leading-relaxed bg-black/20 border border-primary/50 focus:border-primary rounded outline-none px-2 py-1 -ml-2 w-[calc(100%+16px)] resize-none min-h-[80px] custom-scrollbar"
                             />
                           ) : (
                             <p 
                               onClick={(e) => handleEditStart(card.id, 'description', card.description, e)}
                               className="font-sans text-[12px] text-on-surface-variant leading-relaxed line-clamp-4 cursor-text hover:bg-white/5 rounded px-2 py-1 -ml-2 transition-colors border border-transparent hover:border-outline/30"
                               title="Click to edit description"
                             >
                               {card.description}
                             </p>
                           )}
                         </div>

                      </div>
                   ))}
                </div>
              </div>

           </div>
        </div>

      </main>

      {/* Add Product Modal */}
      {isAddProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#333537] rounded-[24px] w-full max-w-[600px] p-6 shadow-2xl border border-white/10 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h2 className="text-[20px] font-sans font-medium text-on-surface">Add Product from URL</h2>
              <button onClick={() => setIsAddProductModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-on-surface transition-colors">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            
            <p className="text-[14px] font-sans text-on-surface-variant">
              Enter the URL for the product you want to extract. The page should link to one product only and not a collection.
            </p>

            {isExtracting ? (
              <div className="w-full bg-[#1e1f20] border border-primary rounded-[12px] p-4 flex items-center gap-3 mt-2">
                <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                <span className="text-[14px] font-sans text-primary">Extracting...</span>
              </div>
            ) : (
              <div className="flex flex-col gap-2 mt-2">
                <input 
                  type="text"
                  value={productUrl}
                  onChange={(e) => setProductUrl(e.target.value)}
                  placeholder="https://www.yourbusiness.com/products/{product_name}..."
                  className="w-full bg-[#1e1f20] border border-[#46483b] focus:border-primary rounded-[12px] px-4 py-3 text-[14px] text-on-surface placeholder-outline outline-none transition-colors"
                />
                <span className="text-[12px] font-sans text-outline px-1">Starts with http:// or https://</span>
              </div>
            )}

            <div className="flex justify-end mt-2">
              <button 
                onClick={handleExtractProduct}
                disabled={!productUrl.trim() || isExtracting}
                className="bg-white/10 hover:bg-white/20 disabled:bg-white/5 disabled:text-white/30 text-on-surface px-6 py-2 rounded-full font-sans text-[14px] font-medium transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Catalog Modal */}
      {isCatalogModalOpen && extractedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#333537] rounded-[24px] w-full max-w-[700px] p-6 shadow-2xl border border-white/10 flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <h2 className="text-[20px] font-sans font-medium text-on-surface">Catalog</h2>
              <button onClick={() => setIsCatalogModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-on-surface transition-colors">
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>
            
            <div className="flex gap-6">
              <div className="flex flex-col gap-3 w-[280px] shrink-0">
                <div className="w-full aspect-square rounded-[16px] overflow-hidden relative bg-[#1e1f20]">
                  <img src={extractedProduct.image} alt={extractedProduct.title} className="w-full h-full object-cover" />
                  <button className="absolute top-3 right-3 w-8 h-8 bg-[#c1cd7d] hover:bg-[#d0db8e] text-[#2c3400] rounded-full flex items-center justify-center transition-colors shadow-md">
                    <span className="material-symbols-outlined text-[18px]">delete</span>
                  </button>
                </div>
                <div className="flex gap-2">
                  <button className="w-12 h-12 rounded-[8px] border-2 border-primary overflow-hidden">
                    <img src={extractedProduct.image} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-3 flex-1">
                <h3 className="text-[16px] font-sans font-medium text-on-surface">{extractedProduct.title}</h3>
                <p className="text-[14px] font-sans text-on-surface-variant leading-relaxed">
                  {extractedProduct.description}
                </p>
              </div>
            </div>

            <div className="flex justify-end items-center gap-3 mt-2">
              <button 
                onClick={() => setIsCatalogModalOpen(false)}
                className="text-[#c1cd7d] hover:bg-white/5 px-4 py-2 rounded-full font-sans text-[14px] font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleLooksGood}
                className="bg-[#c1cd7d] hover:bg-[#d0db8e] text-[#2c3400] px-6 py-2 rounded-full font-sans text-[14px] font-medium transition-colors"
              >
                Looks Good
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Remove Product Modal */}
      {isRemoveProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#333537] rounded-[24px] w-full max-w-[400px] p-6 shadow-2xl border border-white/10 flex flex-col gap-4">
            <h2 className="text-[16px] font-sans font-medium text-on-surface">Are you sure you want to remove this product?</h2>
            <p className="text-[14px] font-sans text-on-surface-variant">
              You will lose the product you scraped.
            </p>
            <div className="flex justify-end items-center gap-3 mt-2">
              <button 
                onClick={() => setIsRemoveProductModalOpen(false)}
                className="text-[#c1cd7d] hover:bg-white/5 px-4 py-2 rounded-full font-sans text-[14px] font-medium transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  setAddedProduct(null);
                  setIsRemoveProductModalOpen(false);
                }}
                className="bg-white/10 hover:bg-white/20 text-on-surface px-6 py-2 rounded-full font-sans text-[14px] font-medium transition-colors"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Select Images Modal */}
      {isSelectImagesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#333537] rounded-[24px] w-full max-w-[700px] p-6 shadow-2xl border border-white/10 flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div className="flex flex-col gap-1">
                <h2 className="text-[20px] font-sans font-medium text-on-surface">Select images</h2>
                <p className="text-[14px] font-sans text-on-surface-variant">
                  Select images for your campaign.
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[14px] font-sans text-primary">
                  ({tempSelectedImages.length}/6 selected)
                </span>
                <button onClick={() => setIsSelectImagesModalOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-on-surface transition-colors">
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-3 mt-2">
              <button className="aspect-square rounded-[12px] bg-[#46483b]/30 border border-[#46483b] flex flex-col items-center justify-center gap-2 hover:bg-[#46483b]/50 transition-colors">
                <span className="material-symbols-outlined text-primary">upload</span>
                <span className="text-[12px] font-sans text-primary font-medium">Upload Images</span>
              </button>
              
              {EXTRACTED_IMAGES.map((img, idx) => {
                const isSelected = tempSelectedImages.includes(img);
                return (
                  <button 
                    key={idx}
                    onClick={() => {
                      if (isSelected) {
                        setTempSelectedImages(prev => prev.filter(i => i !== img));
                      } else if (tempSelectedImages.length < 6) {
                        setTempSelectedImages(prev => [...prev, img]);
                      }
                    }}
                    className={`aspect-square rounded-[12px] overflow-hidden relative border-2 transition-all ${isSelected ? 'border-primary' : 'border-transparent'}`}
                  >
                    <img src={img} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    {isSelected && (
                      <div className="absolute top-2 left-2 w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-[14px] text-[#2c3400]">check</span>
                      </div>
                    )}
                  </button>
                )
              })}
            </div>

            <div className="flex justify-end items-center gap-4 mt-2">
              <button 
                onClick={() => setTempSelectedImages([])}
                className="text-on-surface-variant hover:text-on-surface font-sans text-[14px] font-medium transition-colors"
              >
                Deselect All
              </button>
              <button 
                onClick={() => {
                  setSelectedImages(tempSelectedImages);
                  setIsSelectImagesModalOpen(false);
                }}
                className="bg-primary hover:bg-[#d0db8e] text-[#2c3400] px-6 py-2 rounded-full font-sans text-[14px] font-medium transition-colors"
              >
                Looks Good
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
