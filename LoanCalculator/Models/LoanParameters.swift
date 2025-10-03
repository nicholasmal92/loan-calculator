import Foundation

struct LoanParameters: Equatable {
    var loanAmount: Double
    var interestRate: Double
    var termYears: Double
    var paymentsPerYear: PaymentFrequency

    init(
        loanAmount: Double = 350_000,
        interestRate: Double = 5.5,
        termYears: Double = 30,
        paymentsPerYear: PaymentFrequency = .monthly
    ) {
        self.loanAmount = loanAmount
        self.interestRate = interestRate
        self.termYears = termYears
        self.paymentsPerYear = paymentsPerYear
    }
}

enum PaymentFrequency: Int, CaseIterable, Identifiable, Codable {
    case monthly = 12
    case biWeekly = 26
    case weekly = 52

    var id: Int { rawValue }

    var label: String {
        switch self {
        case .monthly: return "Monthly"
        case .biWeekly: return "Bi-Weekly"
        case .weekly: return "Weekly"
        }
    }
}
