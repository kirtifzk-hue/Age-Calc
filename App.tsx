import React, { useState, useEffect, useCallback } from 'react';
import { calculateAge, calculateRetirement, formatDate } from './utils/dateHelpers';
import { CalculationResult, GeminiInsightData } from './types';
import { getRetirementInsight } from './services/geminiService';
import { ResultCard } from './components/ResultCard';
import { FutureInsight } from './components/FutureInsight';

const App: React.FC = () => {
  const [dob, setDob] = useState<string>('');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [insight, setInsight] = useState<GeminiInsightData | null>(null);
  const [loadingInsight, setLoadingInsight] = useState<boolean>(false);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDob(e.target.value);
    setInsight(null); // Reset insight on new date
  };

  const calculate = useCallback(async () => {
    if (!dob) return;

    const dobDate = new Date(dob);
    // Basic validation to prevent future dates or extremely old dates causing issues
    if (isNaN(dobDate.getTime()) || dobDate > new Date()) {
      alert("Please enter a valid date of birth in the past.");
      return;
    }

    const ageDetails = calculateAge(dobDate);
    const retirementDetails = calculateRetirement(dobDate, 58); // Service limit 58 years

    const newResult = {
      age: ageDetails,
      retirement: retirementDetails
    };

    setResult(newResult);

    // Fetch AI Insight
    setLoadingInsight(true);
    try {
      const retirementYear = retirementDetails.retirementDate.getFullYear();
      const aiData = await getRetirementInsight(retirementYear, retirementDetails.isRetired);
      setInsight(aiData);
    } catch (err) {
      console.error("Failed to load insight", err);
    } finally {
      setLoadingInsight(false);
    }
  }, [dob]);

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-inter text-slate-900">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-500 mb-2">
            Retirement Calculator
          </h1>
          <p className="text-slate-500 text-lg">
            Track your service timeline (58 years) and see what the future holds.
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-8">
          <label htmlFor="dob" className="block text-sm font-medium text-slate-700 mb-2">
            Select Date of Birth
          </label>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="date"
              id="dob"
              value={dob}
              onChange={handleDateChange}
              className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-lg p-3 border"
            />
            <button
              onClick={calculate}
              disabled={!dob}
              className="w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors shadow-md flex items-center justify-center gap-2"
            >
              Calculate
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Results Grid */}
        {result && (
          <div className="space-y-6 animate-fade-in-up">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Age Card */}
              <ResultCard 
                title="Current Age"
                colorClass="border-blue-500 text-blue-600"
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                }
                data={{
                  main: `${result.age.years} Years`,
                  sub: `${result.age.months} Months, ${result.age.days} Days`,
                  detail: "You are in your prime!"
                }}
              />

              {/* Retirement Card */}
              <ResultCard 
                title={result.retirement.isRetired ? "Retired Since" : "Retirement Date"}
                colorClass={result.retirement.isRetired ? "border-green-500 text-green-600" : "border-orange-500 text-orange-600"}
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                }
                data={{
                  main: formatDate(result.retirement.retirementDate),
                  sub: result.retirement.isRetired 
                    ? "Enjoy your freedom!" 
                    : `${result.retirement.yearsLeft} years, ${result.retirement.monthsLeft} months left`,
                  detail: result.retirement.isRetired 
                    ? "Service Completed" 
                    : `Retiring at age 58`
                }}
              />
            </div>

            {/* Gemini Insight Component */}
            <FutureInsight 
              data={insight} 
              loading={loadingInsight} 
              retirementYear={result.retirement.retirementDate.getFullYear()} 
            />
          </div>
        )}

      </div>
    </div>
  );
};

export default App;