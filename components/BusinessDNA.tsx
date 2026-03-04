import React, { useState, DragEvent } from 'react';

// Common Google Fonts List
const GOOGLE_FONTS = [
  'Inter', 'Roboto', 'Open Sans', 'Lato', 'Montserrat', 
  'Playfair Display', 'Merriweather', 'Lora', 'Oswald', 
  'Raleway', 'Poppins', 'Nunito', 'Ubuntu', 'Mukta'
];

// Reusable Tooltip Component
const Tooltip: React.FC<{ content: string; children: React.ReactNode }> = ({ content, children }) => (
  <div className="relative flex items-center group/tooltip cursor-help">
    {children}
    <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-max max-w-[220px] p-2 bg-surface-highest text-on-surface text-xs rounded-lg shadow-lg opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-[100] whitespace-normal text-center border border-white/10">
      {content}
      {/* Tooltip Arrow */}
      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-surface-highest"></div>
    </div>
  </div>
);

// Reusable Edit Button
const EditButton: React.FC<{ onClick?: () => void }> = ({ onClick }) => (
  <button 
    onClick={onClick}
    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#45492c] text-[#e2e6be] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#5a5f39] z-10 shadow-sm"
  >
    <span className="material-symbols-outlined text-[18px]">edit</span>
  </button>
);

// Reusable Drag Handle
const DragHandle: React.FC = () => (
  <div className="absolute top-4 left-4 text-on-surface-variant opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing z-10">
    <span className="material-symbols-outlined text-[20px]">drag_indicator</span>
  </div>
);

// Reusable Card Container
const Card: React.FC<{ 
  children?: React.ReactNode, 
  className?: string, 
  onEdit?: () => void,
  id?: string,
  draggable?: boolean,
  onDragStart?: (e: DragEvent, id: string) => void,
  onDragOver?: (e: DragEvent, id: string) => void,
  onDragLeave?: (e: DragEvent) => void,
  onDrop?: (e: DragEvent, id: string) => void,
  isDragOver?: boolean
}> = ({ children, className = "", onEdit, id, draggable, onDragStart, onDragOver, onDragLeave, onDrop, isDragOver }) => (
  <div 
    draggable={draggable}
    onDragStart={(e) => draggable && id && onDragStart?.(e, id)}
    onDragOver={(e) => draggable && id && onDragOver?.(e, id)}
    onDragLeave={onDragLeave}
    onDrop={(e) => draggable && id && onDrop?.(e, id)}
    className={`bg-surface-highest rounded-[16px] p-7 relative group flex flex-col transition-all duration-300 ${isDragOver ? 'border-2 border-primary border-dashed scale-[0.98] opacity-80' : 'border border-transparent'} ${className}`}
  >
    {draggable && <DragHandle />}
    {children}
    {onEdit && <EditButton onClick={onEdit} />}
  </div>
);

// Reusable Chip
const Chip: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
  <div className="border border-outline rounded-lg px-3 py-1.5 text-on-surface-variant text-sm flex items-center">
    {children}
  </div>
);

type EditModalType = 'name' | 'tagline' | 'overview' | 'values' | 'aesthetic' | 'tone' | 'logo' | 'fonts' | 'colors' | 'image-edit' | null;

interface BrandFont {
  name: string;
  type: string;
}

export const BusinessDNA: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  // Main Content State
  const [businessName, setBusinessName] = useState("Muse Cheesecakes & Bakery");
  const [tagline, setTagline] = useState("Burnt Basque Cheesecake: A Unique Twist on a Classic Dessert");
  const [overview, setOverview] = useState("Muse Cheesecakes & Bakery is a San Diego-based artisanal bakery specializing in the Burnt Basque cheesecake. They offer a wide variety of unique flavor variations, from traditional recipes to innovative combinations like Ube, Miso, and Black Sesame, all characterized by a caramelized exterior and creamy interior.");
  
  const [brandValues, setBrandValues] = useState(["Craftsmanship", "Culinary Tradition", "Innovation", "Quality"]);
  const [brandAesthetics, setBrandAesthetics] = useState(["modern", "minimalist", "artisanal", "sophisticated", "indulgent"]);
  const [brandTones, setBrandTones] = useState(["Informative", "Sophisticated", "Inviting"]);
  const [brandLogo, setBrandLogo] = useState("https://labs.google.com/pomelli_downloads/accounts/96vAwBU0h4J9OjW11fL_Qm/thumbnails_medium/8U2HOn-M65G2yBy0DjyOB5?authuser=0");
  const [brandColors, setBrandColors] = useState(["#ffffff", "#000000", "#760808", "#ebe6e0"]);
  const [brandFonts, setBrandFonts] = useState<BrandFont[]>([{ name: 'Inter', type: 'Primary' }, { name: 'Playfair Display', type: 'Secondary' }]);

  const [galleryImages, setGalleryImages] = useState([
    "https://labs.google.com/pomelli_downloads/accounts/96vAwBU0h4J9OjW11fL_Qm/thumbnails_small/8U2HOn-M65G2yBy0DjyOB5?authuser=0",
    "https://labs.google.com/pomelli_downloads/accounts/96vAwBU0h4J9OjW11fL_Qm/thumbnails_small/aY6c0isVvls6L2z635zOvd?authuser=0",
    "https://labs.google.com/pomelli_downloads/accounts/96vAwBU0h4J9OjW11fL_Qm/thumbnails_small/8kQuu5st8SI4GStNWes_LO?authuser=0",
    "https://labs.google.com/pomelli_downloads/accounts/96vAwBU0h4J9OjW11fL_Qm/thumbnails_small/8kFRtqeoGRD7Vd65WVuOTn?authuser=0",
    "https://labs.google.com/pomelli_downloads/accounts/96vAwBU0h4J9OjW11fL_Qm/thumbnails_small/8NSKvgjLyEKflDnFX4jO_f?authuser=0",
    "https://labs.google.com/pomelli_downloads/accounts/96vAwBU0h4J9OjW11fL_Qm/thumbnails_small/81lwtsrRf9ne1oRIbN_OgK?authuser=0",
    "https://labs.google.com/pomelli_downloads/accounts/96vAwBU0h4J9OjW11fL_Qm/thumbnails_small/bYhtuN75VNE4wXu0Sjx_Oq?authuser=0",
    "https://labs.google.com/pomelli_downloads/accounts/96vAwBU0h4J9OjW11fL_Qm/thumbnails_small/9L04XCwlI220WBIkc244SB?authuser=0"
  ]);

  const [selectedImages, setSelectedImages] = useState<Set<number>>(new Set());

  // Layout State (Drag and Drop)
  const [cardOrder, setCardOrder] = useState(['logo', 'fonts', 'colors', 'tagline', 'values', 'aesthetic', 'tone', 'overview']);
  const [draggedCard, setDraggedCard] = useState<string | null>(null);
  const [dragOverCard, setDragOverCard] = useState<string | null>(null);

  // Modal State
  const [activeModal, setActiveModal] = useState<EditModalType>(null);
  const [tempText, setTempText] = useState("");
  const [tempList, setTempList] = useState<string[]>([]);
  const [tempColors, setTempColors] = useState<string[]>([]);
  const [tempFonts, setTempFonts] = useState<BrandFont[]>([]);
  const [newItemText, setNewItemText] = useState("");

  const openModal = (type: EditModalType) => {
    setActiveModal(type);
    setNewItemText("");
    switch(type) {
      case 'name': setTempText(businessName); break;
      case 'tagline': setTempText(tagline); break;
      case 'overview': setTempText(overview); break;
      case 'values': setTempList([...brandValues]); break;
      case 'aesthetic': setTempList([...brandAesthetics]); break;
      case 'tone': setTempList([...brandTones]); break;
      case 'logo': setTempText(brandLogo); break;
      case 'colors': setTempColors([...brandColors]); break;
      case 'fonts': setTempFonts([...brandFonts]); break;
    }
  };

  const handleApply = () => {
    switch(activeModal) {
      case 'name': if (tempText.trim()) setBusinessName(tempText.trim()); break;
      case 'tagline': if (tempText.trim()) setTagline(tempText.trim()); break;
      case 'overview': if (tempText.trim()) setOverview(tempText.trim()); break;
      case 'values': setBrandValues([...tempList]); break;
      case 'aesthetic': setBrandAesthetics([...tempList]); break;
      case 'tone': setBrandTones([...tempList]); break;
      case 'logo': if (tempText.trim()) setBrandLogo(tempText.trim()); break;
      case 'colors': setBrandColors([...tempColors]); break;
      case 'fonts': setBrandFonts([...tempFonts]); break;
      case 'image-edit': setSelectedImages(new Set()); break; // Just mock applying edits
    }
    setActiveModal(null);
  };

  // Generic List Handlers
  const addListItem = () => {
    if (newItemText.trim() && !tempList.includes(newItemText.trim())) {
      setTempList([...tempList, newItemText.trim()]);
      setNewItemText("");
    }
  };

  const removeListItem = (itemToRemove: string) => setTempList(tempList.filter(i => i !== itemToRemove));
  
  // Colors Handlers
  const updateTempColor = (index: number, newColor: string) => {
    const updated = [...tempColors];
    updated[index] = newColor;
    setTempColors(updated);
  };
  const addTempColor = () => setTempColors([...tempColors, '#cccccc']);
  const removeTempColor = (index: number) => setTempColors(tempColors.filter((_, i) => i !== index));

  // Fonts Handlers
  const updateTempFont = (index: number, field: keyof BrandFont, value: string) => {
    const updated = [...tempFonts];
    updated[index] = { ...updated[index], [field]: value };
    setTempFonts(updated);
  };
  const addTempFont = () => setTempFonts([...tempFonts, { name: GOOGLE_FONTS[0], type: 'Custom' }]);
  const removeTempFont = (index: number) => setTempFonts(tempFonts.filter((_, i) => i !== index));

  // Utility to check changes
  const hasChanges = () => {
    if (['name', 'tagline', 'overview', 'logo'].includes(activeModal as string)) {
      const original = activeModal === 'name' ? businessName : activeModal === 'tagline' ? tagline : activeModal === 'logo' ? brandLogo : overview;
      return tempText.trim() !== original && tempText.trim() !== "";
    }
    if (['values', 'aesthetic', 'tone'].includes(activeModal as string)) {
      const original = activeModal === 'values' ? brandValues : activeModal === 'aesthetic' ? brandAesthetics : brandTones;
      return JSON.stringify(tempList) !== JSON.stringify(original);
    }
    if (activeModal === 'colors') return JSON.stringify(tempColors) !== JSON.stringify(brandColors);
    if (activeModal === 'fonts') return JSON.stringify(tempFonts) !== JSON.stringify(brandFonts);
    if (activeModal === 'image-edit') return true;
    return false;
  };

  // Drag and Drop Logic
  const handleDragStart = (e: DragEvent, id: string) => {
    setDraggedCard(id);
    e.dataTransfer.effectAllowed = 'move';
    // Small delay to allow CSS dragging clone to generate cleanly
    setTimeout(() => {
      const el = e.target as HTMLElement;
      if (el) el.style.opacity = '0.5';
    }, 0);
  };

  const handleDragOver = (e: DragEvent, id: string) => {
    e.preventDefault();
    if (draggedCard !== id) setDragOverCard(id);
  };

  const handleDragLeave = () => setDragOverCard(null);

  const handleDrop = (e: DragEvent, id: string) => {
    e.preventDefault();
    setDragOverCard(null);
    const draggedEl = document.querySelector('[style*="opacity: 0.5"]') as HTMLElement;
    if (draggedEl) draggedEl.style.opacity = '1';

    if (!draggedCard || draggedCard === id) return;
    
    const newOrder = [...cardOrder];
    const draggedIdx = newOrder.indexOf(draggedCard);
    const dropIdx = newOrder.indexOf(id);
    newOrder.splice(draggedIdx, 1);
    newOrder.splice(dropIdx, 0, draggedCard);
    setCardOrder(newOrder);
    setDraggedCard(null);
  };

  // Image Selection Logic
  const toggleImageSelection = (index: number) => {
    const newSet = new Set(selectedImages);
    if (newSet.has(index)) newSet.delete(index);
    else newSet.add(index);
    setSelectedImages(newSet);
  };

  const deleteSelectedImages = () => {
    setGalleryImages(galleryImages.filter((_, i) => !selectedImages.has(i)));
    setSelectedImages(newSet => new Set());
  };

  // Component Map for Rendering Order
  const renderCard = (id: string) => {
    const dragProps = {
      id,
      draggable: true,
      onDragStart: handleDragStart,
      onDragOver: handleDragOver,
      onDragLeave: handleDragLeave,
      onDrop: handleDrop,
      isDragOver: dragOverCard === id
    };

    switch(id) {
      case 'logo':
        return (
          <div {...dragProps} key={id} className={`bg-[#760808] rounded-[16px] p-4 relative group flex items-center justify-center md:col-span-2 min-h-[140px] overflow-hidden transition-all duration-300 ${dragProps.isDragOver ? 'border-2 border-primary border-dashed scale-[0.98]' : ''}`}>
            {dragProps.draggable && <DragHandle />}
            
            <div className="absolute top-4 left-10 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <Tooltip content="Your brand's primary visual identity.">
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant bg-black/30 rounded-full p-1 cursor-help">info</span>
              </Tooltip>
            </div>

            <img src={brandLogo} alt="Logo" className="max-w-[80%] max-h-[100px] object-contain mix-blend-screen opacity-90 pointer-events-none" />
            <EditButton onClick={() => openModal('logo')} />
          </div>
        );
      case 'fonts':
        return (
          <Card {...dragProps} key={id} className="md:col-span-4 min-h-[140px] justify-center" onEdit={() => openModal('fonts')}>
            <div className="flex items-center gap-2 mb-4 pl-6">
              <h3 className="text-on-surface font-medium">Fonts</h3>
              <Tooltip content="Typography choices that define your brand's character.">
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant cursor-help">info</span>
              </Tooltip>
            </div>
            {/* Dynamic style for actual fonts to display in the main card too if desired, relying on the modal's injection or standard web safe fonts. */}
            <div className="flex flex-wrap items-center justify-center gap-6">
              {brandFonts.map((font, idx) => (
                <div key={idx} className="flex flex-col items-center gap-1">
                  <span className="text-primary text-[36px] leading-none" style={{fontFamily: font.name}}>{font.name.charAt(0)}a</span>
                  <span className="text-on-surface text-xs text-center">{font.name}</span>
                </div>
              ))}
            </div>
          </Card>
        );
      case 'colors':
        return (
          <Card {...dragProps} key={id} className="md:col-span-6" onEdit={() => openModal('colors')}>
            <div className="flex items-center gap-2 mb-4 pl-6">
              <h3 className="text-on-surface font-medium">Colors</h3>
              <Tooltip content="Your brand's core color palette used across all media.">
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant cursor-help">info</span>
              </Tooltip>
            </div>
            <div className="flex flex-wrap justify-center gap-6 px-4">
              {brandColors.map((color, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2">
                  <div className="w-[50px] h-[50px] rounded-full border border-outline/20 shadow-inner" style={{backgroundColor: color}}></div>
                  <span className="text-on-surface text-xs uppercase">{color}</span>
                </div>
              ))}
            </div>
          </Card>
        );
      case 'tagline':
        return (
          <Card {...dragProps} key={id} className="md:col-span-3" onEdit={() => openModal('tagline')}>
            <div className="flex items-center gap-2 mb-4 pl-6">
              <h3 className="text-on-surface font-medium">Tagline</h3>
              <Tooltip content="A short, memorable phrase used in marketing.">
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant cursor-help">info</span>
              </Tooltip>
            </div>
            <p className="text-primary font-playfair italic text-2xl leading-tight px-2">{tagline}</p>
          </Card>
        );
      case 'values':
        return (
          <Card {...dragProps} key={id} className="md:col-span-3" onEdit={() => openModal('values')}>
            <div className="flex items-center gap-2 mb-4 pl-6">
              <h3 className="text-on-surface font-medium">Brand values</h3>
              <Tooltip content="Core principles that guide your business.">
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant cursor-help">info</span>
              </Tooltip>
            </div>
            <div className="flex flex-wrap gap-2 px-2">
              {brandValues.map((value, idx) => <Chip key={idx}>{value}</Chip>)}
            </div>
          </Card>
        );
      case 'aesthetic':
        return (
          <Card {...dragProps} key={id} className="md:col-span-3" onEdit={() => openModal('aesthetic')}>
            <div className="flex items-center gap-2 mb-4 pl-6">
              <h3 className="text-on-surface font-medium">Brand aesthetic</h3>
              <Tooltip content="Visual keywords that describe your brand's look and feel.">
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant cursor-help">info</span>
              </Tooltip>
            </div>
            <div className="flex flex-wrap gap-2 px-2">
              {brandAesthetics.map((aesthetic, idx) => <Chip key={idx}>{aesthetic}</Chip>)}
            </div>
          </Card>
        );
      case 'tone':
        return (
          <Card {...dragProps} key={id} className="md:col-span-3" onEdit={() => openModal('tone')}>
            <div className="flex items-center gap-2 mb-4 pl-6">
              <h3 className="text-on-surface font-medium">Brand tone of voice</h3>
              <Tooltip content="How your brand communicates and sounds to your audience.">
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant cursor-help">info</span>
              </Tooltip>
            </div>
            <div className="flex flex-wrap gap-2 px-2">
              {brandTones.map((tone, idx) => <Chip key={idx}>{tone}</Chip>)}
            </div>
          </Card>
        );
      case 'overview':
        return (
          <Card {...dragProps} key={id} className="md:col-span-6" onEdit={() => openModal('overview')}>
            <div className="flex items-center gap-2 mb-4 pl-6">
              <h3 className="text-on-surface font-medium">Business overview</h3>
              <Tooltip content="A brief summary of your business, its products, and mission.">
                <span className="material-symbols-outlined text-[16px] text-on-surface-variant cursor-help">info</span>
              </Tooltip>
            </div>
            <p className="text-on-surface-variant text-[15px] leading-relaxed px-2 whitespace-pre-wrap">{overview}</p>
          </Card>
        );
      default: return null;
    }
  };

  const modalTitles = {
    name: { title: 'Business Name', subtitle: 'Edit your business name', label: 'Business Name *' },
    tagline: { title: 'Tagline', subtitle: 'Edit your business tagline', label: 'Tagline *' },
    overview: { title: 'Business Overview', subtitle: 'Edit your business overview', label: 'Overview *' },
    values: { title: 'Brand Values', subtitle: 'Add, edit or remove brand values', label: 'Brand Value' },
    aesthetic: { title: 'Brand Aesthetic', subtitle: 'Add, edit or remove brand aesthetic tags', label: 'Aesthetic Tag' },
    tone: { title: 'Brand Tone of Voice', subtitle: 'Add, edit or remove tone of voice tags', label: 'Tone of Voice' },
    logo: { title: 'Brand Logo', subtitle: 'Upload or select a new logo', label: 'Logo URL' },
    colors: { title: 'Brand Colors', subtitle: 'Manage your brand color palette', label: '' },
    fonts: { title: 'Brand Fonts', subtitle: 'Manage your brand typography (Google Fonts)', label: '' },
    'image-edit': { title: 'Edit Images', subtitle: 'Crop or apply filters to selected images', label: '' }
  };

  return (
    <div className="w-full max-w-[1400px] mx-auto animate-slide-up-fade opacity-0 h-full flex flex-col pb-4 min-h-0">
      
      {/* Header Section */}
      <div className="flex flex-col items-center text-center mb-6 gap-2 shrink-0">
        <span className="material-symbols-outlined text-[28px] text-on-surface">genetics</span>
        <h1 className="font-playfair italic text-4xl text-on-surface">Your Business DNA</h1>
        <p className="text-on-surface-variant text-[15px] max-w-lg mt-1">
          Here is a snapshot of your business that we'll use to create social media campaigns.<br/>
          Feel free to edit this at anytime.
        </p>
      </div>

      {/* Main Content Grid */}
      <div className="bg-surface-high rounded-[24px] p-6 lg:p-8 flex-1 flex flex-col overflow-hidden relative min-h-0">
        <div className="flex flex-col lg:flex-row gap-8 flex-1 overflow-y-auto pr-2 custom-scrollbar pb-28 min-h-0">
          
          {/* Left Column (Details) */}
          <div className="flex-1 flex flex-col gap-2 min-w-[55%] lg:min-w-[60%]">
            
            {/* Business Name Card */}
            <div className="bg-surface-highest rounded-[16px] p-7 relative group flex flex-col mb-2">
              <div className="flex items-center gap-3 mb-4">
                <h2 className="text-4xl text-on-surface font-sans">{businessName}</h2>
              </div>
              <div className="flex items-center gap-2 text-on-surface text-sm">
                <span className="material-symbols-outlined text-[20px]">link</span>
                <a className="hover:underline cursor-pointer">https://www.musecheesecakes.us/</a>
              </div>
              <EditButton onClick={() => openModal('name')} />
            </div>

            {/* Draggable Grid */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-2 relative">
              {/* Dynamic Google Fonts injection for the main page rendering */}
              <style>
                {brandFonts.map(f => `@import url('https://fonts.googleapis.com/css2?family=${f.name.replace(/ /g, '+')}&display=swap');`).join('\n')}
              </style>

              {cardOrder.map(id => renderCard(id))}
            </div>
          </div>

          {/* Right Column (Images Gallery) */}
          <div className="flex-[0.8] lg:min-w-[400px] flex flex-col relative h-full">
            
            {/* Image Selection Action Bar */}
            <div className={`transition-all duration-300 overflow-hidden ${selectedImages.size > 0 ? 'h-[64px] mb-3 opacity-100' : 'h-0 mb-0 opacity-0'}`}>
              <div className="bg-primary text-on-primary rounded-[16px] px-5 py-3 flex justify-between items-center shadow-md">
                <div className="flex items-center gap-2 font-medium">
                  <span className="material-symbols-outlined text-[20px]">check_circle</span>
                  <span>{selectedImages.size} selected</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openModal('image-edit')} className="bg-black/10 hover:bg-black/20 px-4 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">crop</span> Edit
                  </button>
                  <button onClick={deleteSelectedImages} className="bg-black/10 hover:bg-black/20 px-4 py-1.5 rounded-full text-sm font-medium transition-colors flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">delete</span> Delete
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3 flex-1 overflow-y-auto custom-scrollbar">
              <h3 className="text-on-surface text-[15px] font-medium px-2 mb-1 flex justify-between items-center shrink-0">
                <div className="flex items-center gap-2">
                  <span>Images</span>
                  <Tooltip content="A collection of your business images and assets.">
                    <span className="material-symbols-outlined text-[16px] text-on-surface-variant cursor-help">info</span>
                  </Tooltip>
                </div>
                {selectedImages.size > 0 && (
                  <button onClick={() => setSelectedImages(new Set())} className="text-xs text-primary hover:underline">Clear selection</button>
                )}
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                
                {/* Upload Button */}
                <div className="bg-surface-highest/40 border border-outline/30 border-dashed rounded-[16px] aspect-square flex flex-col items-center justify-center text-on-surface-variant cursor-pointer hover:bg-surface-highest hover:text-on-surface transition-colors group relative">
                   <span className="material-symbols-outlined text-[28px] mb-2 opacity-80 group-hover:opacity-100 transition-opacity">upload</span>
                   <span className="text-[12px] font-medium text-center leading-tight opacity-80 group-hover:opacity-100 transition-opacity">Upload<br/>Images</span>
                </div>

                {/* Image Thumbnails */}
                {galleryImages.map((src, index) => {
                  const isSelected = selectedImages.has(index);
                  return (
                    <div 
                      key={index} 
                      onClick={() => toggleImageSelection(index)}
                      className={`relative aspect-square rounded-[16px] overflow-hidden group shadow-sm cursor-pointer border-2 transition-all duration-200 ${isSelected ? 'border-primary scale-[0.95]' : 'border-transparent bg-surface-highest'}`}
                    >
                      <img 
                        src={src} 
                        alt={`Asset ${index}`} 
                        className={`w-full h-full object-cover transition-transform duration-500 ${isSelected ? 'scale-105' : 'group-hover:scale-110'}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                      
                      {/* Selection Indicator */}
                      <div className={`absolute top-2 left-2 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'bg-primary border-primary text-on-primary' : 'border-white/50 text-transparent opacity-0 group-hover:opacity-100'}`}>
                        <span className="material-symbols-outlined text-[16px]">{isSelected ? 'check' : ''}</span>
                      </div>
                      
                      <button 
                        onClick={(e) => { e.stopPropagation(); setGalleryImages(galleryImages.filter((_, i) => i !== index)); selectedImages.delete(index); }}
                        className="absolute top-2 right-2 w-7 h-7 bg-black/40 backdrop-blur-md text-[#e2e6be] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#ff5252]"
                      >
                        <span className="material-symbols-outlined text-[16px]">close</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar Gradient overlay and actions */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-surface-high via-surface-high/90 to-transparent flex items-end justify-between px-8 py-6 rounded-b-[24px] pointer-events-none">
           <div className="w-full flex items-center justify-end gap-6 pointer-events-auto">
             <span className="text-on-surface-variant text-[15px] drop-shadow-md">
               Next we'll use your Business DNA to generate social media campaigns
             </span>
             <button onClick={onComplete} className="bg-[#c1cd7d] hover:bg-[#d0db8e] text-[#2c3400] font-medium text-[15px] px-8 py-3.5 rounded-full transition-all duration-300 shadow-lg min-w-[160px]">
               Looks good
             </button>
           </div>
        </div>
      </div>

      {/* Generic Edit Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60">
          <div className={`bg-surface-highest ${['overview', 'image-edit', 'fonts'].includes(activeModal) ? 'w-[750px]' : 'w-[500px]'} max-w-[90vw] rounded-[24px] p-6 shadow-2xl relative flex flex-col animate-slide-up-fade border border-white/5`}>
            
            <div className="flex justify-between items-start mb-6">
              <div className="flex flex-col gap-1">
                <h2 className="text-on-surface text-[18px] font-sans font-medium tracking-wide">
                  {modalTitles[activeModal].title}
                </h2>
                <p className="text-on-surface-variant text-[13px]">
                  {modalTitles[activeModal].subtitle}
                </p>
              </div>
              <button
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 rounded-full bg-[#404244] flex items-center justify-center hover:bg-[#4a4d4f] transition-colors"
              >
                <span className="material-symbols-outlined text-[18px] text-on-surface-variant">close</span>
              </button>
            </div>

            {/* Content for Single-line Text (Name, Tagline, Logo) */}
            {['name', 'tagline', 'logo'].includes(activeModal) && (
              <div className="relative mb-6">
                <label className="absolute -top-[8px] left-3 bg-surface-highest px-1 text-[11px] text-on-surface-variant z-10 leading-none tracking-wide">
                  {modalTitles[activeModal].label}
                </label>
                <input
                  type="text"
                  value={tempText}
                  onChange={(e) => setTempText(e.target.value)}
                  className="w-full bg-transparent border border-[#5d5f61] hover:border-outline focus:border-on-surface rounded-[8px] px-4 py-3.5 text-on-surface text-[15px] focus:outline-none transition-colors"
                />
                
                {activeModal === 'logo' && (
                  <div className="mt-6 border-t border-outline/20 pt-4">
                    <p className="text-sm text-on-surface-variant mb-3">Or choose from gallery:</p>
                    <div className="grid grid-cols-4 gap-2 max-h-[200px] overflow-y-auto custom-scrollbar p-1">
                      {galleryImages.map((src, i) => (
                        <img 
                          key={i} 
                          src={src} 
                          onClick={() => setTempText(src)}
                          className={`aspect-square object-cover rounded-lg cursor-pointer border-2 transition-all ${tempText === src ? 'border-primary' : 'border-transparent hover:border-outline'}`}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Content for Multi-line Text (Overview) */}
            {activeModal === 'overview' && (
              <div className="relative mb-6">
                <label className="absolute -top-[8px] left-3 bg-surface-highest px-1 text-[11px] text-on-surface-variant z-10 leading-none tracking-wide">
                  {modalTitles[activeModal].label}
                </label>
                <textarea
                  value={tempText}
                  onChange={(e) => setTempText(e.target.value)}
                  rows={8}
                  className="w-full bg-transparent border border-[#5d5f61] hover:border-outline focus:border-on-surface rounded-[8px] px-4 py-3.5 text-on-surface text-[14px] leading-relaxed focus:outline-none transition-colors resize-none custom-scrollbar"
                />
              </div>
            )}

            {/* Content for Lists (Values, Aesthetic, Tone) */}
            {['values', 'aesthetic', 'tone'].includes(activeModal) && (
              <div className="flex flex-col gap-4 mb-4">
                <div className="relative">
                  <label className="absolute -top-[8px] left-3 bg-surface-highest px-1 text-[11px] text-on-surface-variant z-10 leading-none tracking-wide">
                    Add new {modalTitles[activeModal].label.toLowerCase()}
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newItemText}
                      onChange={(e) => setNewItemText(e.target.value)}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addListItem(); } }}
                      className="flex-1 bg-transparent border border-[#5d5f61] hover:border-outline focus:border-on-surface rounded-[8px] px-4 py-2.5 text-on-surface text-[14px] focus:outline-none transition-colors"
                      placeholder="Type and press enter..."
                    />
                    <button
                      onClick={addListItem}
                      disabled={!newItemText.trim()}
                      className="px-5 py-2.5 bg-surface-high hover:bg-surface border border-[#5d5f61] hover:border-outline rounded-[8px] text-on-surface text-[14px] font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 max-h-[200px] overflow-y-auto custom-scrollbar p-1">
                  {tempList.length === 0 ? (
                    <span className="text-on-surface-variant text-[13px] italic">No items added yet.</span>
                  ) : (
                    tempList.map((item, idx) => (
                      <div key={idx} className="border border-outline/60 bg-surface-high rounded-lg pl-3 pr-1 py-1 text-on-surface text-[13px] flex items-center gap-1 shadow-sm group/chip">
                        <span className="mr-1">{item}</span>
                        <button
                          onClick={() => removeListItem(item)}
                          className="w-6 h-6 rounded-full hover:bg-surface-highest flex items-center justify-center text-on-surface-variant hover:text-[#ff8a8a] transition-colors"
                        >
                          <span className="material-symbols-outlined text-[14px]">close</span>
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* Content for Colors */}
            {activeModal === 'colors' && (
              <div className="flex flex-col gap-4 mb-4">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                   {tempColors.map((color, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-surface-high border border-outline/20 p-2 rounded-xl">
                        {/* Native color picker masked behind a custom circle */}
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-outline/30 shrink-0 shadow-inner">
                          <input 
                            type="color" 
                            value={color} 
                            onChange={(e) => updateTempColor(idx, e.target.value)}
                            className="absolute top-[-10px] left-[-10px] w-[60px] h-[60px] cursor-pointer"
                          />
                        </div>
                        <input 
                           type="text" 
                           value={color}
                           onChange={(e) => updateTempColor(idx, e.target.value)}
                           className="bg-transparent border-b border-outline/50 focus:border-primary text-on-surface text-sm uppercase w-20 px-1 py-0.5 focus:outline-none transition-colors"
                        />
                        <button onClick={() => removeTempColor(idx)} className="ml-auto w-8 h-8 rounded-full hover:bg-surface-highest flex items-center justify-center text-on-surface-variant hover:text-[#ff8a8a]">
                          <span className="material-symbols-outlined text-[18px]">delete</span>
                        </button>
                      </div>
                   ))}
                 </div>
                 <button onClick={addTempColor} className="flex items-center justify-center gap-2 border border-dashed border-outline/50 hover:border-outline hover:bg-surface-high text-on-surface-variant py-3 rounded-xl transition-colors text-sm font-medium">
                   <span className="material-symbols-outlined text-[18px]">add</span> Add Color
                 </button>
              </div>
            )}

            {/* Content for Fonts (Google Fonts Preview) */}
            {activeModal === 'fonts' && (
              <div className="flex flex-col gap-4 mb-4">
                {/* Dynamically inject styles for the previews based on currently selected temp fonts */}
                <style>
                  {tempFonts.map(f => `@import url('https://fonts.googleapis.com/css2?family=${f.name.replace(/ /g, '+')}&display=swap');`).join('\n')}
                </style>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                  {tempFonts.map((font, idx) => (
                    <div key={idx} className="flex flex-col gap-4 bg-surface-high border border-outline/20 p-4 rounded-xl">
                      <div className="flex gap-3">
                        <div className="flex-1 w-full relative">
                          <label className="text-[10px] text-on-surface-variant uppercase tracking-wider mb-1 block">Font Family</label>
                          <select 
                            value={font.name}
                            onChange={(e) => updateTempFont(idx, 'name', e.target.value)}
                            className="w-full bg-surface-highest border border-outline/30 rounded-lg px-3 py-2 text-sm text-on-surface focus:border-primary focus:outline-none appearance-none cursor-pointer"
                          >
                            {GOOGLE_FONTS.map(gf => (
                              <option key={gf} value={gf}>{gf}</option>
                            ))}
                          </select>
                        </div>
                        <div className="w-[100px] relative">
                          <label className="text-[10px] text-on-surface-variant uppercase tracking-wider mb-1 block">Type</label>
                          <select 
                            value={font.type}
                            onChange={(e) => updateTempFont(idx, 'type', e.target.value)}
                            className="w-full bg-surface-highest border border-outline/30 rounded-lg px-3 py-2 text-sm text-on-surface focus:border-primary focus:outline-none appearance-none cursor-pointer"
                          >
                            <option>Primary</option>
                            <option>Secondary</option>
                            <option>Accent</option>
                          </select>
                        </div>
                      </div>

                      {/* Font Preview Area */}
                      <div className="w-full bg-surface-highest rounded-lg p-4 border border-outline/10 overflow-hidden text-center">
                        <p style={{ fontFamily: font.name }} className="text-2xl text-on-surface truncate mb-2">
                          Ag
                        </p>
                        <p style={{ fontFamily: font.name }} className="text-[15px] text-on-surface truncate">
                          The quick brown fox jumps over the lazy dog
                        </p>
                        <p style={{ fontFamily: font.name }} className="text-xs text-on-surface-variant mt-2 tracking-widest">
                          0123456789
                        </p>
                      </div>

                      <button onClick={() => removeTempFont(idx)} className="w-full h-8 rounded-lg bg-surface-highest hover:bg-surface flex items-center justify-center text-on-surface-variant hover:text-[#ff8a8a] text-sm gap-2 transition-colors">
                        <span className="material-symbols-outlined text-[16px]">delete</span> Remove Font
                      </button>
                    </div>
                  ))}
                </div>
                <button onClick={addTempFont} className="flex items-center justify-center gap-2 border border-dashed border-outline/50 hover:border-outline hover:bg-surface-high text-on-surface-variant py-3 rounded-xl transition-colors text-sm font-medium">
                  <span className="material-symbols-outlined text-[18px]">add</span> Add Font
                </button>
              </div>
            )}

            {/* Content for Image Edit (Mock Crop/Filter) */}
            {activeModal === 'image-edit' && selectedImages.size > 0 && (
              <div className="flex flex-col md:flex-row gap-6 mb-4">
                {/* Mock Image Viewport */}
                <div className="flex-1 bg-black/40 rounded-xl overflow-hidden relative flex items-center justify-center min-h-[300px]">
                  <img 
                    src={galleryImages[Array.from(selectedImages)[0]]} 
                    className="max-w-full max-h-[400px] object-contain"
                  />
                  {/* Mock Crop Overlay */}
                  <div className="absolute inset-8 border border-white/50 border-dashed pointer-events-none">
                    <div className="absolute top-[-5px] left-[-5px] w-2.5 h-2.5 bg-white rounded-sm"></div>
                    <div className="absolute top-[-5px] right-[-5px] w-2.5 h-2.5 bg-white rounded-sm"></div>
                    <div className="absolute bottom-[-5px] left-[-5px] w-2.5 h-2.5 bg-white rounded-sm"></div>
                    <div className="absolute bottom-[-5px] right-[-5px] w-2.5 h-2.5 bg-white rounded-sm"></div>
                  </div>
                </div>

                {/* Edit Controls Sidebar */}
                <div className="w-full md:w-[240px] flex flex-col gap-6 shrink-0">
                  
                  {/* Tool selection tabs */}
                  <div className="flex bg-surface-high p-1 rounded-lg">
                    <button className="flex-1 bg-surface-highest rounded-md py-1.5 text-sm font-medium text-primary shadow-sm">Crop</button>
                    <button className="flex-1 py-1.5 text-sm font-medium text-on-surface-variant hover:text-on-surface">Filters</button>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between text-xs text-on-surface-variant">
                        <span>Aspect Ratio</span>
                      </div>
                      <select className="bg-surface-high border border-outline/30 rounded-lg px-3 py-2 text-sm text-on-surface focus:outline-none">
                        <option>Freeform</option>
                        <option>Square (1:1)</option>
                        <option>Portrait (4:5)</option>
                        <option>Landscape (16:9)</option>
                      </select>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between text-xs text-on-surface-variant">
                        <span>Brightness</span>
                        <span>0%</span>
                      </div>
                      <input type="range" className="w-full accent-primary" />
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between text-xs text-on-surface-variant">
                        <span>Contrast</span>
                        <span>0%</span>
                      </div>
                      <input type="range" className="w-full accent-primary" />
                    </div>
                  </div>
                  
                  <div className="mt-auto text-xs text-on-surface-variant italic">
                    Note: Adjustments apply to all {selectedImages.size} selected image(s).
                  </div>

                </div>
              </div>
            )}

            <div className="flex justify-end mt-2 pt-4 border-t border-outline/10">
              <button
                onClick={handleApply}
                disabled={!hasChanges()}
                className="px-6 py-2 rounded-full font-sans font-medium text-[13px] transition-colors disabled:bg-[#46484a] disabled:text-[#747678] bg-[#c1cd7d] text-[#2c3400] hover:bg-[#d0db8e]"
              >
                Apply
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};
