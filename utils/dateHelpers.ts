import { AgeDetails, RetirementDetails } from '../types';

export const calculateAge = (dob: Date): AgeDetails => {
  const now = new Date();
  let years = now.getFullYear() - dob.getFullYear();
  let months = now.getMonth() - dob.getMonth();
  let days = now.getDate() - dob.getDate();

  if (days < 0) {
    months--;
    // Get days in previous month
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
    days += prevMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
};

export const calculateRetirement = (dob: Date, retirementAge: number = 58): RetirementDetails => {
  const retirementDate = new Date(dob);
  retirementDate.setFullYear(dob.getFullYear() + retirementAge);

  const now = new Date();
  
  // Check if already retired
  if (now >= retirementDate) {
    return {
      retirementDate,
      yearsLeft: 0,
      monthsLeft: 0,
      daysLeft: 0,
      isRetired: true
    };
  }

  // Calculate remaining time
  let yearsLeft = retirementDate.getFullYear() - now.getFullYear();
  let monthsLeft = retirementDate.getMonth() - now.getMonth();
  let daysLeft = retirementDate.getDate() - now.getDate();

  if (daysLeft < 0) {
    monthsLeft--;
    const prevMonth = new Date(retirementDate.getFullYear(), retirementDate.getMonth(), 0);
    daysLeft += prevMonth.getDate();
  }

  if (monthsLeft < 0) {
    yearsLeft--;
    monthsLeft += 12;
  }

  return {
    retirementDate,
    yearsLeft,
    monthsLeft,
    daysLeft,
    isRetired: false
  };
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
};