import React from 'react';
import { GeminiInsightData } from '../types';

interface FutureInsightProps {
  data: GeminiInsightData | null;
  loading: boolean;
  retirementYear: number;
}

export const FutureInsight: React.FC<FutureInsightProps> = ({ data, loading, retirementYear }) => {
  if (loading) {
    return (
      <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100 animate-pulse">
        <div className="h-6 w-1/3 bg-indigo-200 rounded mb-4"></div>
        <div className="h-4 w-full bg-indigo-100 rounded mb-2"></div>
        <div className="h-4 w-5/6 bg-indigo-100 rounded"></div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="mt-8 bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl p-6 text-white shadow-xl">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-white/20 rounded-lg backdrop-blur-sm">
          <svg className="w-6 h-6 text-yellow-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">Vision for {retirementYear}</h3>
          <p className="text-indigo-100 mb-4 text-sm leading-relaxed italic">
            "{data.prediction}"
          </p>
          <div className="h-px w-full bg-indigo-500/50 mb-4"></div>
          <p className="text-white font-medium text-sm">
            💡 {data.motivation}
          </p>
          <div className="mt-4 flex justify-end">
             <span className="text-[10px] text-indigo-300 uppercase tracking-widest">Powered by Gemini 3 Flash</span>
          </div>
        </div>
      </div>
    </div>
  );
};