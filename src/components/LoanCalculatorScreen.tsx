import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { LoanParameters, PaymentFrequency, createDefaultLoanParameters } from '../models/LoanParameters';
import { LoanCalculator } from '../models/LoanCalculator';
import { LoanInputForm } from './LoanInputForm';
import { LoanResults } from './LoanResults';

interface LoanCalculatorScreenProps {
  title: string;
  description: string;
  initialParameters: LoanParameters;
}

export const LoanCalculatorScreen: React.FC<LoanCalculatorScreenProps> = ({
  title,
  description,
  initialParameters,
}) => {
  const [parameters, setParameters] = useState<LoanParameters>(initialParameters);

  const result = LoanCalculator.calculate(parameters);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      <LoanInputForm
        parameters={parameters}
        onParametersChange={setParameters}
      />

      <LoanResults result={result} parameters={parameters} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
  },
});