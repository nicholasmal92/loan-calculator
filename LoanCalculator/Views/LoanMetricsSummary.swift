import SwiftUI

struct LoanMetricsSummary: View {
    let result: LoanResult

    var body: some View {
        VStack(alignment: .leading, spacing: 8) {
            HStack {
                Label("Payment", systemImage: "creditcard")
                Spacer()
                Text(result.periodicPayment, format: .currency(code: Locale.current.currency?.identifier ?? "USD"))
                    .bold()
            }

            HStack {
                Label("Total interest", systemImage: "chart.line.uptrend.xyaxis")
                Spacer()
                Text(result.totalInterest, format: .currency(code: Locale.current.currency?.identifier ?? "USD"))
            }

            HStack {
                Label("Total paid", systemImage: "banknote")
                Spacer()
                Text(result.totalPaid, format: .currency(code: Locale.current.currency?.identifier ?? "USD"))
            }
        }
    }
}

struct LoanMetricsSummary_Previews: PreviewProvider {
    static var previews: some View {
        LoanMetricsSummary(result: LoanResult(
            periodicPayment: 2000,
            totalInterest: 120_000,
            totalPaid: 470_000,
            schedule: []
        ))
        .padding()
        .previewLayout(.sizeThatFits)
    }
}
