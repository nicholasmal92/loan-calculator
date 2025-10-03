import SwiftUI

struct LoanBreakdownView: View {
    let result: LoanResult
    let parameters: LoanParameters

    private var totalPrincipal: Double { parameters.loanAmount }
    private var interestShare: Double {
        guard result.totalPaid > 0 else { return 0 }
        return result.totalInterest / result.totalPaid
    }

    private var firstPayments: [AmortizationPayment] {
        Array(result.schedule.prefix(3))
    }

    private var finalPayment: AmortizationPayment? {
        result.schedule.last
    }

    private var totalPaidForProgress: Double {
        max(result.totalPaid, 1)
    }

    private var interestProgress: Double {
        min(result.totalInterest, totalPaidForProgress)
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            ProgressView(value: interestProgress, total: totalPaidForProgress) {
                Text("Interest vs principal")
                    .font(.headline)
            } currentValueLabel: {
                Text(interestShare.formatted(.percent.precision(.fractionLength(0...1))))
                    .monospacedDigit()
                    .foregroundStyle(.secondary)
            }

            LabeledContent("Principal", value: totalPrincipal, format: .currency(code: Locale.current.currency?.identifier ?? "USD"))
            LabeledContent("Interest", value: result.totalInterest, format: .currency(code: Locale.current.currency?.identifier ?? "USD"))
            LabeledContent("Total paid", value: result.totalPaid, format: .currency(code: Locale.current.currency?.identifier ?? "USD"))

            if !firstPayments.isEmpty {
                DisclosureGroup("First payments") {
                    ForEach(firstPayments) { payment in
                        PaymentRow(payment: payment)
                    }
                }
            }

            if let finalPayment {
                DisclosureGroup("Final payment") {
                    PaymentRow(payment: finalPayment)
                }
            }
        }
    }
}

private struct PaymentRow: View {
    let payment: AmortizationPayment

    var body: some View {
        VStack(alignment: .leading, spacing: 4) {
            Text("Payment #\(payment.paymentNumber)")
                .font(.headline)

            HStack {
                Label("Principal", systemImage: "dollarsign.circle")
                Spacer()
                Text(payment.principalPaid, format: .currency(code: Locale.current.currency?.identifier ?? "USD"))
            }
            .font(.subheadline)

            HStack {
                Label("Interest", systemImage: "percent")
                Spacer()
                Text(payment.interestPaid, format: .currency(code: Locale.current.currency?.identifier ?? "USD"))
            }
            .font(.subheadline)

            HStack {
                Label("Balance", systemImage: "chart.line.downtrend.xyaxis")
                Spacer()
                Text(payment.remainingBalance, format: .currency(code: Locale.current.currency?.identifier ?? "USD"))
            }
            .font(.subheadline)
        }
        .padding(.vertical, 4)
    }
}

struct LoanBreakdownView_Previews: PreviewProvider {
    static var previews: some View {
        let parameters = LoanParameters(loanAmount: 300_000, interestRate: 5.5, termYears: 30, paymentsPerYear: .monthly)
        let result = LoanCalculator.calculate(for: parameters)

        Form {
            Section {
                LoanBreakdownView(result: result, parameters: parameters)
            }
        }
    }
}
