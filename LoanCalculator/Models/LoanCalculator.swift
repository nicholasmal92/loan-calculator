import Foundation

struct LoanResult: Equatable {
    let periodicPayment: Double
    let totalInterest: Double
    let totalPaid: Double
    let schedule: [AmortizationPayment]
}

struct AmortizationPayment: Identifiable, Equatable {
    let id: Int
    let paymentNumber: Int
    let paymentAmount: Double
    let interestPaid: Double
    let principalPaid: Double
    let remainingBalance: Double
}

enum LoanCalculator {
    static func calculate(for parameters: LoanParameters) -> LoanResult {
        let principal = max(parameters.loanAmount, 0)
        let paymentsPerYear = Double(parameters.paymentsPerYear.rawValue)
        let numberOfPayments = Int((parameters.termYears * paymentsPerYear).rounded())

        guard numberOfPayments > 0 else {
            return LoanResult(
                periodicPayment: 0,
                totalInterest: 0,
                totalPaid: 0,
                schedule: []
            )
        }

        let ratePerPeriod = (parameters.interestRate / 100) / paymentsPerYear
        let paymentAmount: Double

        if ratePerPeriod.isZero {
            paymentAmount = principal / Double(numberOfPayments)
        } else {
            let factor = pow(1 + ratePerPeriod, Double(numberOfPayments))
            paymentAmount = principal * (ratePerPeriod * factor) / (factor - 1)
        }

        var remainingBalance = principal
        var schedule: [AmortizationPayment] = []
        var totalInterest: Double = 0
        var totalPaid: Double = 0

        for paymentNumber in 1...numberOfPayments {
            let interestPayment = remainingBalance * ratePerPeriod
            var principalPayment = paymentAmount - interestPayment
            principalPayment = min(max(principalPayment, 0), remainingBalance)

            if paymentNumber == numberOfPayments {
                principalPayment = remainingBalance
            }

            let actualPayment = principalPayment + max(interestPayment, 0)

            remainingBalance -= principalPayment
            remainingBalance = max(remainingBalance, 0)

            totalInterest += max(interestPayment, 0)
            totalPaid += actualPayment

            let amortizationPayment = AmortizationPayment(
                id: paymentNumber,
                paymentNumber: paymentNumber,
                paymentAmount: actualPayment,
                interestPaid: max(interestPayment, 0),
                principalPaid: principalPayment,
                remainingBalance: remainingBalance
            )
            schedule.append(amortizationPayment)
        }

        return LoanResult(
            periodicPayment: paymentAmount,
            totalInterest: totalInterest,
            totalPaid: totalPaid,
            schedule: schedule
        )
    }
}
