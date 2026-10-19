import React from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight,
  Clock
} from 'lucide-react';
import { ProtestRecord } from '../data/protestData';

interface GlassDossierProps {
  country: ProtestRecord;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  currentIndex: number;
  totalCount: number;
}

export default function GlassDossier({
  country,
  onClose,
  onPrev,
  onNext,
  currentIndex,
  totalCount,
}: GlassDossierProps) {
  const stepNumber = String(currentIndex + 1).padStart(2, '0');
  const totalNumber = String(totalCount).padStart(2, '0');

  return (
    <aside 
      className="fixed top-6 right-6 bottom-6 z-30 pointer-events-auto w-full max-w-[420px] select-none font-sans flex flex-col justify-center"
      role="dialog"
      aria-labelledby="dossier-title"
    >
      {/* Tall Frosted Glass Card with increased height and zero scrollbar */}
      <div className="w-full h-[calc(100vh-3rem)] max-h-[820px] flex flex-col justify-between rounded-3xl bg-black/60 backdrop-blur-3xl border border-white/15 p-6 sm:p-7 shadow-[0_30px_70px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.2)] text-white overflow-hidden relative">
        
        {/* Subtle White Ambient Light Only (no colors) */}
        <div 
          className="absolute -top-24 -right-24 w-52 h-52 rounded-full blur-3xl pointer-events-none bg-white/[0.05]"
        />

        {/* 1. Header: Step Counter & Close */}
        <div className="flex items-center justify-between pb-3 text-xs font-mono shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span className="text-orange-400 font-medium tracking-[0.22em] text-[10px] uppercase">
              Timeline {stepNumber} / {totalNumber}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white transition-all border border-white/10 cursor-pointer"
            aria-label="Close Dossier"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 2. Content Body: Ample room, scrollbars fully hidden */}
        <div 
          className="flex-1 overflow-y-auto no-scrollbar py-1 space-y-3.5 pr-0.5"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Country Name & Timeline */}
          <div className="space-y-1">
            <h2 
              id="dossier-title"
              className="text-3xl font-display font-medium tracking-tight text-white"
            >
              {country.country}
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-orange-400 font-mono tracking-wide">
              <Clock className="w-3.5 h-3.5 text-orange-400" />
              <span>{country.timeline}</span>
            </div>
          </div>

          {/* Movement Callout */}
          <div className="space-y-1.5">
            <span className="text-[9px] font-mono uppercase tracking-[0.25em] text-gray-400 block font-medium">
              Movement
            </span>
            <p className="text-[15px] font-medium text-white leading-snug">
              {country.movement}
            </p>
            <p className="text-xs text-gray-300 font-light">
              {country.classification}
            </p>
            
            <div className="pt-0.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-white/20 bg-white/[0.06] text-[11px] font-mono text-white">
                <span className="w-1.5 h-1.5 rounded-full bg-white" />
                {country.statusCategory}
              </span>
            </div>
          </div>

          {/* Triggers & Demands */}
          <div className="space-y-1">
            <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-orange-400 block font-medium">
              Triggers & Demands
            </span>
            <p className="text-xs text-gray-200 font-light leading-relaxed">
              {country.triggersAndDemands}
            </p>
          </div>

          {/* Outcome & Current State */}
          <div className="space-y-1">
            <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-gray-400 block font-medium">
              Outcome (Oct 2026)
            </span>
            <p className="text-xs text-gray-300 font-light leading-relaxed">
              {country.statusOutcome}
            </p>
          </div>
        </div>

        {/* 3. Bottom Navigation Bar */}
        <div className="pt-3 flex items-center justify-between text-xs font-mono border-t border-white/10 shrink-0">
          <button
            onClick={onPrev}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all border border-white/10 hover:border-orange-500/40 cursor-pointer"
            aria-label="Previous movement"
          >
            <ChevronLeft className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-[11px]">Prev</span>
          </button>

          <span className="text-[10px] text-gray-400 font-mono tracking-widest">
            {country.lat.toFixed(1)}°, {country.lng.toFixed(1)}°
          </span>

          <button
            onClick={onNext}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all border border-white/10 hover:border-orange-500/40 cursor-pointer"
            aria-label="Next movement"
          >
            <span className="text-[11px]">Next</span>
            <ChevronRight className="w-3.5 h-3.5 text-orange-400" />
          </button>
        </div>

      </div>
    </aside>
  );
}
