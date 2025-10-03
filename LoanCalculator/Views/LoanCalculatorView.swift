import SwiftUI

struct LoanCalculatorView: View {
    let title: String
    let description: String
    @Binding var parameters: LoanParameters

    @FocusState private var focusedField: Field?

    private enum Field: Hashable {
        case amount, rate, years
    }

    private var result: LoanResult {
        LoanCalculator.calculate(for: parameters)
    }

    var body: some View {
        NavigationStack {
            Form {
                Section(header: Text("Overview"), footer: Text(description)) {
                    LabeledContent("Loan type", value: title)
                    LoanMetricsSummary(result: result)
                }

                Section("Loan details") {
                    CurrencyTextField("Loan amount", value: $parameters.loanAmount)
                        .focused($focusedField, equals: .amount)
                        .keyboardType(.decimalPad)

                    PercentageTextField("Interest rate", value: $parameters.interestRate)
                        .focused($focusedField, equals: .rate)
                        .keyboardType(.decimalPad)

                    Stepper(value: $parameters.termYears, in: 1...40, step: 1) {
                        Text("Term: \(parameters.termYears, specifier: "%.0f") years")
                    }

                    Picker("Payment frequency", selection: $parameters.paymentsPerYear) {
                        ForEach(PaymentFrequency.allCases) { frequency in
                            Text(frequency.label).tag(frequency)
                        }
                    }
                    .pickerStyle(.segmented)
                }

                Section("Amortization summary") {
                    LoanBreakdownView(result: result, parameters: parameters)
                }
            }
            .navigationTitle(title)
            .toolbar {
                ToolbarItemGroup(placement: .keyboard) {
                    Spacer()
                    Button("Done") {
                        focusedField = nil
                    }
                }
            }
        }
    }
}

struct LoanCalculatorView_Previews: PreviewProvider {
    static var previews: some View {
        LoanCalculatorView(
            title: "Residential Loan",
            description: "Example",
            parameters: .constant(LoanParameters())
        )
    }
}
