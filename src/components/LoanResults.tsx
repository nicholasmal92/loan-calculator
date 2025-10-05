import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { LoanResult, AmortizationPayment } from '../models/LoanCalculator';
import { LoanParameters } from '../models/LoanParameters';
import { formatCurrency } from '../utils/formatters';

interface LoanResultsProps {
  result: LoanResult;
  parameters: LoanParameters;
}

export const LoanResults: React.FC<LoanResultsProps> = ({ result, parameters }) => {
  const [showFirstPayments, setShowFirstPayments] = useState(false);
  const [showFinalPayment, setShowFinalPayment] = useState(false);

  const interestShare = result.totalPaid > 0 ? result.totalInterest / result.totalPaid : 0;
  const firstPayments = result.schedule.slice(0, 3);
  const finalPayment = result.schedule[result.schedule.length - 1];

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Loan Summary</Text>
      
      {/* Key Metrics */}
      <View style={styles.metricsContainer}>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>💳 Payment</Text>
          <Text style={styles.metricValue}>{formatCurrency(result.periodicPayment)}</Text>
        </View>
        
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>📈 Total Interest</Text>
          <Text style={styles.metricValue}>{formatCurrency(result.totalInterest)}</Text>
        </View>
        
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>💰 Total Paid</Text>
          <Text style={styles.metricValue}>{formatCurrency(result.totalPaid)}</Text>
        </View>
      </View>

      {/* Interest vs Principal Progress */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressTitle}>Interest vs Principal</Text>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${(interestShare * 100)}%` }
            ]} 
          />
        </View>
        <Text style={styles.progressLabel}>
          {(interestShare * 100).toFixed(1)}% Interest
        </Text>
      </View>

      {/* First Payments Section */}
      {firstPayments.length > 0 && (
        <View style={styles.paymentsSection}>
          <TouchableOpacity 
            style={styles.sectionHeader}
            onPress={() => setShowFirstPayments(!showFirstPayments)}
          >
            <Text style={styles.sectionHeaderText}>First Payments</Text>
            <Text style={styles.sectionToggle}>
              {showFirstPayments ? '▼' : '▶'}
            </Text>
          </TouchableOpacity>
          
          {showFirstPayments && (
            <View style={styles.paymentsContainer}>
              {firstPayments.map((payment) => (
                <PaymentRow key={payment.id} payment={payment} />
              ))}
            </View>
          )}
        </View>
      )}

      {/* Final Payment Section */}
      {finalPayment && (
        <View style={styles.paymentsSection}>
          <TouchableOpacity 
            style={styles.sectionHeader}
            onPress={() => setShowFinalPayment(!showFinalPayment)}
          >
            <Text style={styles.sectionHeaderText}>Final Payment</Text>
            <Text style={styles.sectionToggle}>
              {showFinalPayment ? '▼' : '▶'}
            </Text>
          </TouchableOpacity>
          
          {showFinalPayment && (
            <View style={styles.paymentsContainer}>
              <PaymentRow payment={finalPayment} />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

interface PaymentRowProps {
  payment: AmortizationPayment;
}

const PaymentRow: React.FC<PaymentRowProps> = ({ payment }) => {
  return (
    <View style={styles.paymentRow}>
      <Text style={styles.paymentTitle}>Payment #{payment.paymentNumber}</Text>
      
      <View style={styles.paymentDetail}>
        <Text style={styles.paymentDetailLabel}>💰 Principal</Text>
        <Text style={styles.paymentDetailValue}>{formatCurrency(payment.principalPaid)}</Text>
      </View>
      
      <View style={styles.paymentDetail}>
        <Text style={styles.paymentDetailLabel}>% Interest</Text>
        <Text style={styles.paymentDetailValue}>{formatCurrency(payment.interestPaid)}</Text>
      </View>
      
      <View style={styles.paymentDetail}>
        <Text style={styles.paymentDetailLabel}>📉 Balance</Text>
        <Text style={styles.paymentDetailValue}>{formatCurrency(payment.remainingBalance)}</Text>
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
  metricsContainer: {
    marginBottom: 20,
  },
  metric: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  metricLabel: {
    fontSize: 16,
    color: '#333',
  },
  metricValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FF6B6B',
  },
  progressLabel: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  paymentsSection: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 4,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: '500',
  },
  sectionToggle: {
    fontSize: 14,
    color: '#666',
  },
  paymentsContainer: {
    marginTop: 8,
  },
  paymentRow: {
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderRadius: 4,
    marginBottom: 8,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  paymentDetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  paymentDetailLabel: {
    fontSize: 14,
    color: '#666',
  },
  paymentDetailValue: {
    fontSize: 14,
    fontWeight: '500',
  },
});