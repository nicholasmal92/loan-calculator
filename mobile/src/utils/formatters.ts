export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export const formatPercentage = (value: number): string => {
  return `${value.toFixed(3)}%`;
};

export const parseCurrency = (value: string): number => {
  // Remove all non-digit characters except decimal point
  const cleaned = value.replace(/[^\d.]/g, '');
  return parseFloat(cleaned) || 0;
};

export const parsePercentage = (value: string): number => {
  // Remove % symbol and parse
  const cleaned = value.replace('%', '');
  return parseFloat(cleaned) || 0;
};