import SwiftUI

struct CurrencyTextField: View {
    private let title: String
    @Binding private var value: Double

    init(_ title: String, value: Binding<Double>) {
        self.title = title
        self._value = value
    }

    var body: some View {
        TextField(title, value: $value, formatter: Formatters.currency)
    }
}
