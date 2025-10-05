import { LoanParameters } from './LoanParameters';

export interface AmortizationPayment {
  id: number;
  paymentNumber: number;
  paymentAmount: number;
  interestPaid: number;
  principalPaid: number;
  remainingBalance: number;
}

export interface LoanResult {
  periodicPayment: number;
  totalInterest: number;
  totalPaid: number;
  schedule: AmortizationPayment[];
}

export class LoanCalculator {
  static calculate(parameters: LoanParameters): LoanResult {
    const principal = Math.max(parameters.loanAmount, 0);
    const paymentsPerYear = parameters.paymentsPerYear;
    const numberOfPayments = Math.round(parameters.termYears * paymentsPerYear);

    if (numberOfPayments <= 0) {
      return {
        periodicPayment: 0,
        totalInterest: 0,
        totalPaid: 0,
        schedule: [],
      };
    }

    const ratePerPeriod = (parameters.interestRate / 100) / paymentsPerYear;
    let paymentAmount: number;

    if (ratePerPeriod === 0) {
      paymentAmount = principal / numberOfPayments;
    } else {
      const factor = Math.pow(1 + ratePerPeriod, numberOfPayments);
      paymentAmount = principal * (ratePerPeriod * factor) / (factor - 1);
    }

    let remainingBalance = principal;
    const schedule: AmortizationPayment[] = [];
    let totalInterest = 0;
    let totalPaid = 0;

    for (let paymentNumber = 1; paymentNumber <= numberOfPayments; paymentNumber++) {
      const interestPayment = remainingBalance * ratePerPeriod;
      let principalPayment = paymentAmount - interestPayment;
      principalPayment = Math.min(Math.max(principalPayment, 0), remainingBalance);

      if (paymentNumber === numberOfPayments) {
        principalPayment = remainingBalance;
      }

      const actualPayment = principalPayment + Math.max(interestPayment, 0);

      remainingBalance -= principalPayment;
      remainingBalance = Math.max(remainingBalance, 0);

      totalInterest += Math.max(interestPayment, 0);
      totalPaid += actualPayment;

      const amortizationPayment: AmortizationPayment = {
        id: paymentNumber,
        paymentNumber,
        paymentAmount: actualPayment,
        interestPaid: Math.max(interestPayment, 0),
        principalPaid: principalPayment,
        remainingBalance,
      };
      schedule.push(amortizationPayment);
    }

    return {
      periodicPayment: paymentAmount,
      totalInterest,
      totalPaid,
      schedule,
    };
  }
}