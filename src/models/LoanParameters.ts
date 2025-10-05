export enum PaymentFrequency {
  MONTHLY = 12,
  BI_WEEKLY = 26,
  WEEKLY = 52,
}

export interface LoanParameters {
  loanAmount: number;
  interestRate: number;
  termYears: number;
  paymentsPerYear: PaymentFrequency;
}

export const createDefaultLoanParameters = (
  loanAmount: number = 350_000,
  interestRate: number = 5.5,
  termYears: number = 30,
  paymentsPerYear: PaymentFrequency = PaymentFrequency.MONTHLY
): LoanParameters => ({
  loanAmount,
  interestRate,
  termYears,
  paymentsPerYear,
});

export const getPaymentFrequencyLabel = (frequency: PaymentFrequency): string => {
  switch (frequency) {
    case PaymentFrequency.MONTHLY:
      return 'Monthly';
    case PaymentFrequency.BI_WEEKLY:
      return 'Bi-Weekly';
    case PaymentFrequency.WEEKLY:
      return 'Weekly';
    default:
      return 'Monthly';
  }
};

export const getAllPaymentFrequencies = () => [
  PaymentFrequency.MONTHLY,
  PaymentFrequency.BI_WEEKLY,
  PaymentFrequency.WEEKLY,
];