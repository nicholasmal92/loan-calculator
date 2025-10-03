import SwiftUI

struct ContentView: View {
    @State private var residentialParameters = LoanParameters(
        loanAmount: 450_000,
        interestRate: 5.75,
        termYears: 30,
        paymentsPerYear: .monthly
    )
    @State private var commercialParameters = LoanParameters(
        loanAmount: 750_000,
        interestRate: 6.5,
        termYears: 20,
        paymentsPerYear: .monthly
    )
    @State private var vehicleParameters = LoanParameters(
        loanAmount: 45_000,
        interestRate: 7.25,
        termYears: 6,
        paymentsPerYear: .monthly
    )

    var body: some View {
        TabView {
            LoanCalculatorView(title: "Residential Loan", description: "Calculate payments for a residential mortgage.", parameters: $residentialParameters)
                .tabItem {
                    Label("Residential", systemImage: "house.fill")
                }

            LoanCalculatorView(title: "Commercial Loan", description: "Estimate repayments on a commercial property loan.", parameters: $commercialParameters)
                .tabItem {
                    Label("Commercial", systemImage: "building.2.fill")
                }

            LoanCalculatorView(title: "Vehicle Loan", description: "Plan out payments on a vehicle purchase.", parameters: $vehicleParameters)
                .tabItem {
                    Label("Vehicle", systemImage: "car.fill")
                }
        }
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
