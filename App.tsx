import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { LoanCalculatorScreen } from './src/components/LoanCalculatorScreen';
import { createDefaultLoanParameters, PaymentFrequency } from './src/models/LoanParameters';

type LoanType = 'residential' | 'commercial' | 'vehicle';

export default function App() {
  const [selectedLoanType, setSelectedLoanType] = useState<LoanType>('residential');

  const loanConfigs = {
    residential: {
      title: 'Residential Loan',
      description: 'Calculate payments for a residential mortgage.',
      parameters: createDefaultLoanParameters(450_000, 5.75, 30, PaymentFrequency.MONTHLY),
    },
    commercial: {
      title: 'Commercial Loan', 
      description: 'Estimate repayments on a commercial property loan.',
      parameters: createDefaultLoanParameters(750_000, 6.5, 20, PaymentFrequency.MONTHLY),
    },
    vehicle: {
      title: 'Vehicle Loan',
      description: 'Plan out payments on a vehicle purchase.',
      parameters: createDefaultLoanParameters(45_000, 7.25, 6, PaymentFrequency.MONTHLY),
    },
  };

  const currentConfig = loanConfigs[selectedLoanType];

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedLoanType === 'residential' && styles.activeTab]}
          onPress={() => setSelectedLoanType('residential')}
        >
          <Text style={[styles.tabText, selectedLoanType === 'residential' && styles.activeTabText]}>
            🏠 Residential
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, selectedLoanType === 'commercial' && styles.activeTab]}
          onPress={() => setSelectedLoanType('commercial')}
        >
          <Text style={[styles.tabText, selectedLoanType === 'commercial' && styles.activeTabText]}>
            🏢 Commercial
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, selectedLoanType === 'vehicle' && styles.activeTab]}
          onPress={() => setSelectedLoanType('vehicle')}
        >
          <Text style={[styles.tabText, selectedLoanType === 'vehicle' && styles.activeTabText]}>
            🚗 Vehicle
          </Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <LoanCalculatorScreen
        key={selectedLoanType} // Force re-render when switching tabs
        title={currentConfig.title}
        description={currentConfig.description}
        initialParameters={currentConfig.parameters}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingTop: 50, // Account for status bar
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: '#007AFF',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#007AFF',
    fontWeight: '600',
  },
});
