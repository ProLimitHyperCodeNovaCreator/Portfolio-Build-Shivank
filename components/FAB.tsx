'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Mail, Star, User } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const mainButtonVariants = {
    initial: { 
      scale: 1, 
      rotate: 0,
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
    },
    hover: { 
      scale: 1.05,
      boxShadow: '0 20px 35px -5px rgba(0, 0, 0, 0.15), 0 10px 15px -5px rgba(0, 0, 0, 0.1)'
    },
    tap: { scale: 0.95 }
  };

  const iconVariants = {
    initial: { rotate: 0 },
    expanded: { rotate: 45 }
  };

  const childButtonVariants = {
    initial: { 
      scale: 0, 
      opacity: 0,
      y: 20,
      boxShadow: '0 4px 15px -3px rgba(0, 0, 0, 0.1)'
    },
    animate: (i: number) => ({
      scale: 1,
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
        delay: i * 0.1
      }
    }),
    hover: {
      scale: 1.1,
      boxShadow: '0 8px 25px -5px rgba(0, 0, 0, 0.15)'
    },
    exit: (i: number) => ({
      scale: 0,
      opacity: 0,
      y: 20,
      transition: {
        delay: (2 - i) * 0.05
      }
    })
  };

  const overlayVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const actionButtons = [
    { 
      icon: Mail, 
      label: 'Messages', 
      color: 'text-blue-600',
      href: '/messages',
      external: false
    },
    { 
      icon: Star, 
      label: 'Favorites', 
      color: 'text-yellow-600',
      href: '/favorites',
      external: false
    },
    { 
      icon: User, 
      label: 'Profile', 
      color: 'text-green-600',
      href: '/profile',
      external: false
    }
  ];

  const handleActionClick = (href: string, external: boolean) => {
    setIsOpen(false);
    
    if (external) {
      window.open(href, '_blank', 'noopener,noreferrer');
    } else {
      router.push(href);
    }
  };

  return (
    <>
      {/* Backdrop overlay when expanded */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/10 backdrop-blur-[1px]"
            variants={overlayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* FAB Container */}
      <div className="fixed top-6 right-6 z-50 flex flex-col items-end space-y-4">
        {/* Child Action Buttons */}
        <AnimatePresence mode="popLayout">
          {isOpen && actionButtons.map(({ icon: Icon, label, color, href, external }, index) => (
            <motion.button
              key={label}
              className={`
                group relative w-12 h-12 rounded-full 
                bg-white/20 backdrop-blur-xl border border-white/30
                flex items-center justify-center
                transition-all duration-200 ease-out
                ${color}
                cursor-pointer hover:bg-white/30
              `}
              variants={childButtonVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              whileHover="hover"
              whileTap={{ scale: 0.9 }}
              custom={index}
              onClick={() => handleActionClick(href, external)}
              aria-label={`Navigate to ${label}`}
            >
              <Icon size={18} className="relative z-10" />
              
              {/* Tooltip */}
              <div className="
                absolute right-full mr-3 px-3 py-1.5 
                bg-gray-900/90 backdrop-blur-sm text-white text-xs 
                rounded-lg whitespace-nowrap
                opacity-0 group-hover:opacity-100 
                transition-opacity duration-200
                pointer-events-none
                flex items-center gap-1
              ">
                {label}
                {external && (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                )}
              </div>
            </motion.button>
          ))}
        </AnimatePresence>

        {/* Main FAB Button */}
        <motion.button
          className="
            relative w-16 h-16 rounded-full 
            bg-gradient-to-br from-white/25 to-white/10 
            backdrop-blur-xl border border-white/20
            flex items-center justify-center
            text-gray-700 
            transition-all duration-200 ease-out
            hover:border-white/40
          "
          variants={mainButtonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle action menu"
          aria-expanded={isOpen}
        >
          <motion.div
            variants={iconVariants}
            initial="initial"
            animate={isOpen ? "expanded" : "initial"}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Plus size={24} strokeWidth={2.5} />
          </motion.div>

          {/* Ripple effect on click */}
          <motion.div
            className="absolute inset-0 rounded-full bg-white/20"
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 0, opacity: 0.5 }}
            whileTap={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </div>
    </>
  );
};

export default FloatingActionButton;
