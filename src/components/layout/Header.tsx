import React from 'react';
import { Dumbbell } from 'lucide-react';

export function Header() {
  return (
    <header className="fixed top-0 w-full bg-black/10 backdrop-blur-lg z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Dumbbell className="w-8 h-8 text-purple-500" />
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            GymChain
          </span>
        </div>
        
      </div>
    </header>
  );
}