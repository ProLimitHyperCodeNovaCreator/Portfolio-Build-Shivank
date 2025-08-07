'use client';
import React, { useState } from 'react';
import { 
  Menu,
  Sparkles
} from 'lucide-react';

const UltraElegantMenu: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start' 
      });
    }
  };

  const openResume = () => {
    window.open('/pdfs/resume_aditya.pdf', '_blank');
  };
  
  const menuButtons = [
    { 
      label: "Resumé", 
      onClick: openResume,
    },
    { 
      label: "Contact", 
      onClick: () => scrollToSection('footer'),
    },
    { 
      label: "Skills", 
      onClick: () => scrollToSection('skills'),
    },
    { 
      label: "Experience", 
      onClick: () => scrollToSection('experience'),
    },
    { 
      label: "Projects", 
      onClick: () => scrollToSection('projects'),
    },
    {
      label: "About", 
      onClick: () => scrollToSection('about'), 
    }
  ];

  return (
    <div className="fixed top-4 right-4 z-50">
      {/* Mobile Version */}
      <div className="block md:hidden">
        <div 
          className={`
            relative flex flex-col backdrop-blur-md bg-black/30 border-2 border-red-500/40
            rounded-2xl shadow-lg overflow-hidden cursor-pointer
            transition-all duration-500 ease-in-out
            ${isExpanded ? 'w-60 h-auto' : 'w-16 h-16'}
          `}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {/* Background fill on expand */}
          <div className={`absolute inset-0 z-0 bg-gradient-to-b from-red-600/20 to-red-800/30 transition-all duration-500 transform ${isExpanded ? 'scale-y-100 origin-top' : 'scale-y-0 origin-top'}`}></div>

          <button className="relative flex items-center justify-center w-full h-16 text-white font-medium text-base hover:bg-white/5 transition-all duration-300 z-10">
            <Menu 
              size={20} 
              className={`transition-all duration-500 ${isExpanded ? 'rotate-45' : ''}`} 
            />
            
            {/* Sliding text that appears */}
            <span className={`relative z-10 ml-0 w-0 overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'ml-2 w-20' : ''}`}>
              <div className="flex items-center whitespace-nowrap">
                <Sparkles size={14} className="mr-1 text-red-300" />
                <span className="text-sm font-medium text-white">
                  Portfolio
                </span>
              </div>
            </span>
          </button>
          
          {/* Menu options with sliding reveal */}
          <div className={`relative flex flex-col p-3 space-y-2 z-10 transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'opacity-100 max-h-96' : 'opacity-0 max-h-0 p-0'}`}>
            {menuButtons.map((button, index) => (
              <button
                key={index}
                className="group relative flex items-center gap-3 text-white px-4 py-3 rounded-xl text-sm font-medium cursor-pointer transition-all duration-300 hover:scale-102 backdrop-blur-sm border border-white/10 hover:border-red-400/50 overflow-hidden"
                onClick={(e) => {
                  e.stopPropagation();
                  button.onClick();
                  setIsExpanded(false);
                }}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Individual button sliding fill */}
                <span className="absolute inset-0 z-0 bg-gradient-to-r from-red-500/20 via-red-600/30 to-red-700/20 transition-all duration-500 transform scale-x-0 origin-left group-hover:scale-x-100"></span>
                
                <span className="relative z-10">{button.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Version - REDUCED GAP */}
      <div className="hidden md:block">
        <div 
          className={`
            group relative backdrop-blur-md bg-black/30 border-2 border-red-500/40
            rounded-full shadow-lg overflow-hidden
            transition-all duration-500 ease-in-out h-14
            ${isExpanded 
              ? 'w-[620px]' 
              : 'w-28'
            }
          `}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
        >
          {/* Background fill that slides from left to right */}
          <span className={`absolute inset-0 z-0 bg-red-500 transition-all duration-500 transform ${isExpanded ? 'scale-x-100 origin-left' : 'scale-x-0 origin-left'}`}></span>

          {/* Menu icon - always visible */}
          <div className={`absolute right-0 top-0 h-full flex items-center justify-center w-28 z-20 ${isExpanded ? '' : 'cursor-pointer'}`}>
            <Menu 
              size={22} 
              className={`text-white transition-all duration-500 ${isExpanded ? 'rotate-45 scale-110' : ''}`}
            />
          </div>

          <div className={`relative flex gap-1.5 items-center pl-4 h-full z-10 transition-all duration-500 ease-in-out overflow-hidden ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
            {menuButtons.map((button, index) => (
              <button
                key={index}
                className="group/btn relative flex items-center gap-2 text-white px-2.5 py-2 rounded-full text-sm font-medium cursor-pointer whitespace-nowrap transition-all duration-300 hover:scale-115 overflow-hidden"
                onClick={button.onClick}
                style={{ 
                  transitionDelay: `${index * 80}ms`,
                  transform: isExpanded ? 'translateX(0)' : 'translateX(-20px)',
                  opacity: isExpanded ? 1 : 0
                }}
              >
                <span className="relative z-10 text-white">
                  {button.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UltraElegantMenu;
