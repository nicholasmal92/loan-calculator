import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { 
  LoanParameters, 
  PaymentFrequency, 
  getPaymentFrequencyLabel, 
  getAllPaymentFrequencies 
} from '../models/LoanParameters';
import { formatCurrency, formatPercentage, parseCurrency, parsePercentage } from '../utils/formatters';

interface LoanInputFormProps {
  parameters: LoanParameters;
  onParametersChange: (parameters: LoanParameters) => void;
}

export const LoanInputForm: React.FC<LoanInputFormProps> = ({
  parameters,
  onParametersChange,
}) => {
  const updateParameter = (key: keyof LoanParameters, value: any) => {
    onParametersChange({
      ...parameters,
      [key]: value,
    });
  };

  const handleLoanAmountChange = (text: string) => {
    const value = parseCurrency(text);
    updateParameter('loanAmount', value);
  };

  const handleInterestRateChange = (text: string) => {
    const value = parsePercentage(text);
    updateParameter('interestRate', value);
  };

  const adjustTermYears = (increment: number) => {
    const newValue = Math.max(1, Math.min(40, parameters.termYears + increment));
    updateParameter('termYears', newValue);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Loan Details</Text>
      
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Loan Amount</Text>
        <TextInput
          style={styles.input}
          value={formatCurrency(parameters.loanAmount)}
          onChangeText={handleLoanAmountChange}
          keyboardType="numeric"
          placeholder="Enter loan amount"
        />
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Interest Rate</Text>
        <View style={styles.percentageContainer}>
          <TextInput
            style={[styles.input, styles.percentageInput]}
            value={parameters.interestRate.toFixed(3)}
            onChangeText={handleInterestRateChange}
            keyboardType="numeric"
            placeholder="Enter interest rate"
          />
          <Text style={styles.percentageSymbol}>%</Text>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Term: {parameters.termYears} years</Text>
        <View style={styles.stepperContainer}>
          <TouchableOpacity
            style={styles.stepperButton}
            onPress={() => adjustTermYears(-1)}
          >
            <Text style={styles.stepperButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.stepperValue}>{parameters.termYears}</Text>
          <TouchableOpacity
            style={styles.stepperButton}
            onPress={() => adjustTermYears(1)}
          >
            <Text style={styles.stepperButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.label}>Payment Frequency</Text>
        <Picker
          selectedValue={parameters.paymentsPerYear}
          style={styles.picker}
          onValueChange={(value) => updateParameter('paymentsPerYear', value)}
        >
          {getAllPaymentFrequencies().map((frequency) => (
            <Picker.Item
              key={frequency}
              label={getPaymentFrequencyLabel(frequency)}
              value={frequency}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  percentageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  percentageInput: {
    flex: 1,
    marginRight: 8,
  },
  percentageSymbol: {
    fontSize: 16,
    color: '#666',
  },
  stepperContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperButton: {
    backgroundColor: '#007AFF',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  stepperButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  stepperValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 20,
    minWidth: 40,
    textAlign: 'center',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
});