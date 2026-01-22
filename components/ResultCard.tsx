import React from 'react';

interface ResultCardProps {
  title: string;
  icon: React.ReactNode;
  data: {
    main: string;
    sub?: string;
    detail?: string;
  };
  colorClass: string;
}

export const ResultCard: React.FC<ResultCardProps> = ({ title, icon, data, colorClass }) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg border-l-4 ${colorClass} p-6 transition-all duration-300 hover:shadow-xl`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-slate-700">{title}</h3>
        <div className={`p-2 rounded-full ${colorClass.replace('border-', 'bg-').replace('500', '100')}`}>
          {icon}
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-3xl font-bold text-slate-800">{data.main}</p>
        {data.sub && <p className="text-sm font-medium text-slate-500">{data.sub}</p>}
        {data.detail && <p className="text-xs text-slate-400 mt-2">{data.detail}</p>}
      </div>
    </div>
  );
};