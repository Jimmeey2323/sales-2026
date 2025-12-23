// Pricing data and utilities
export interface PricingData {
  id: number;
  name: string;
  price: number;
  location: 'Mumbai' | 'Bengaluru';
  type: string;
  duration: number;
  durationUnit: string;
}

// Mumbai pricing data
export const mumbaiPricing: PricingData[] = [
  { id: 33609, name: "Studio Open Barre Class", price: 0, location: "Mumbai", type: "package-events", duration: 14, durationUnit: "days" },
  { id: 27845, name: "Studio Single Class", price: 1500, location: "Mumbai", type: "package-events", duration: 7, durationUnit: "days" },
  { id: 25768, name: "Studio 4 Class Package", price: 5350, location: "Mumbai", type: "package-events", duration: 14, durationUnit: "days" },
  { id: 97883, name: "Studio 8 Class Package", price: 10200, location: "Mumbai", type: "subscription", duration: 30, durationUnit: "days" },
  { id: 97885, name: "Studio 12 Class Package", price: 15050, location: "Mumbai", type: "subscription", duration: 45, durationUnit: "days" },
  { id: 27848, name: "Studio Newcomers 2 Week Unlimited Membership", price: 7500, location: "Mumbai", type: "package-events", duration: 14, durationUnit: "days" },
  { id: 27849, name: "Studio 2 Week Unlimited Membership", price: 9916.5, location: "Mumbai", type: "package-events", duration: 14, durationUnit: "days" },
  { id: 65342, name: "Studio Private Class", price: 5000, location: "Mumbai", type: "package-events", duration: 7, durationUnit: "days" },
  { id: 69064, name: "Studio 1 Month Unlimited Membership", price: 17750, location: "Mumbai", type: "subscription", duration: 1, durationUnit: "months" },
  { id: 69065, name: "Studio 3 Month Unlimited Membership", price: 50750, location: "Mumbai", type: "subscription", duration: 3, durationUnit: "months" },
  { id: 97972, name: "Studio 6 Month Unlimited Membership", price: 99750, location: "Mumbai", type: "subscription", duration: 6, durationUnit: "months" },
  { id: 69067, name: "Studio Annual Unlimited Membership", price: 192500, location: "Mumbai", type: "subscription", duration: 12, durationUnit: "months" },
  { id: 98510, name: "Studio 20 Single Class Pack", price: 30000, location: "Mumbai", type: "subscription", duration: 105, durationUnit: "days" },
  { id: 98513, name: "Studio 10 Single Class Pack", price: 15000, location: "Mumbai", type: "subscription", duration: 70, durationUnit: "days" },
  { id: 98515, name: "Studio 30 Single Class Pack", price: 45000, location: "Mumbai", type: "subscription", duration: 140, durationUnit: "days" },
  { id: 121839, name: "Studio Private Class X 10", price: 50000, location: "Mumbai", type: "package-events", duration: 70, durationUnit: "days" },
  { id: 240932, name: "Newcomers 2 For 1", price: 1500, location: "Mumbai", type: "package-events", duration: 14, durationUnit: "days" },
  { id: 495695, name: "Barre 1 month Unlimited", price: 15250, location: "Mumbai", type: "subscription", duration: 30, durationUnit: "days" },
  { id: 495696, name: "powerCycle 1 month Unlimited", price: 15250, location: "Mumbai", type: "subscription", duration: 30, durationUnit: "days" },
  { id: 495697, name: "Strength Lab 1 month Unlimited", price: 15250, location: "Mumbai", type: "subscription", duration: 30, durationUnit: "days" }
];

// Bengaluru pricing data
export const bengaluruPricing: PricingData[] = [
  { id: 111528, name: "Studio Single Class", price: 1200, location: "Bengaluru", type: "package-events", duration: 7, durationUnit: "days" },
  { id: 111529, name: "Studio Open Barre Class", price: 0, location: "Bengaluru", type: "package-events", duration: 14, durationUnit: "days" },
  { id: 111530, name: "Studio 4 Class Package", price: 4450, location: "Bengaluru", type: "package-events", duration: 14, durationUnit: "days" },
  { id: 111531, name: "Studio Newcomers 2 Week Unlimited Membership", price: 5750, location: "Bengaluru", type: "package-events", duration: 14, durationUnit: "days" },
  { id: 111532, name: "Studio 2 Week Unlimited", price: 7200, location: "Bengaluru", type: "package-events", duration: 14, durationUnit: "days" },
  { id: 111533, name: "Studio 1 Month Unlimited Membership", price: 13900, location: "Bengaluru", type: "subscription", duration: 1, durationUnit: "months" },
  { id: 111534, name: "Studio 3 Month Unlimited Membership", price: 40200, location: "Bengaluru", type: "subscription", duration: 3, durationUnit: "months" },
  { id: 111535, name: "Studio Annual Unlimited Membership", price: 148800, location: "Bengaluru", type: "subscription", duration: 1, durationUnit: "years" },
  { id: 111536, name: "Studio 6 Month Unlimited Membership", price: 78300, location: "Bengaluru", type: "subscription", duration: 6, durationUnit: "months" },
  { id: 111537, name: "Studio 8 Class Package", price: 8300, location: "Bengaluru", type: "subscription", duration: 1, durationUnit: "months" },
  { id: 111538, name: "Studio 12 Class Package", price: 12500, location: "Bengaluru", type: "subscription", duration: 45, durationUnit: "days" },
  { id: 138426, name: "Studio 20 Single Class Pack", price: 24000, location: "Bengaluru", type: "package-events", duration: 105, durationUnit: "days" },
  { id: 159880, name: "Studio 10 Single Class Pack", price: 12000, location: "Bengaluru", type: "subscription", duration: 70, durationUnit: "days" },
  { id: 159882, name: "Studio 30 Single Class Pack", price: 36000, location: "Bengaluru", type: "subscription", duration: 140, durationUnit: "days" },
  { id: 173094, name: "Studio Private Class", price: 3925, location: "Bengaluru", type: "package-events", duration: 7, durationUnit: "days" },
  { id: 302239, name: "Studio Newcomer 2 for 1", price: 1200, location: "Bengaluru", type: "package-events", duration: 7, durationUnit: "days" },
  { id: 395193, name: "New Studio 10 Single Class Pack", price: 12000, location: "Bengaluru", type: "subscription", duration: 90, durationUnit: "days" },
  { id: 426898, name: "Kickstarter Pack - 5 classes in 10 days", price: 4900, location: "Bengaluru", type: "package-events", duration: 10, durationUnit: "days" },
  { id: 426901, name: "Newcomer 8 Class Package", price: 8300, location: "Bengaluru", type: "subscription", duration: 60, durationUnit: "days" }
];

export const allPricing = [...mumbaiPricing, ...bengaluruPricing];

// Utility functions
export const calculateVAT = (price: number, vatRate: number = 5): number => {
  return (price * vatRate) / 100;
};

export const calculateFinalPrice = (rackPrice: number, discount: number = 0, vatRate: number = 5): { 
  rack: number; 
  vat: number; 
  discount: number; 
  final: number; 
} => {
  const discountAmount = (rackPrice * discount) / 100;
  const discountedPrice = rackPrice - discountAmount;
  const vat = calculateVAT(discountedPrice, vatRate);
  const final = discountedPrice + vat;
  
  return {
    rack: rackPrice,
    vat: vat,
    discount: discount,
    final: final
  };
};

export const getPricingByLocation = (location: 'Mumbai' | 'Bengaluru'): PricingData[] => {
  return location === 'Mumbai' ? mumbaiPricing : bengaluruPricing;
};

export const getMembershipNames = (location: 'Mumbai' | 'Bengaluru'): string[] => {
  return getPricingByLocation(location).map(item => item.name).sort();
};

export const getPricingByName = (name: string, location: 'Mumbai' | 'Bengaluru'): PricingData | null => {
  return getPricingByLocation(location).find(item => item.name === name) || null;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
};