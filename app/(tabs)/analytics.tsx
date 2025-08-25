import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TrendingUp, TrendingDown, Calendar, Clock, CircleCheck as CheckCircle, TriangleAlert as AlertTriangle, ChartBar as BarChart3 } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function AnalyticsScreen() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const periods = [
    { key: 'week', label: 'Week' },
    { key: 'month', label: 'Month' },
    { key: 'quarter', label: 'Quarter' },
    { key: 'year', label: 'Year' },
  ];

  const kpis = [
    {
      title: 'Completion Rate',
      value: '94.2%',
      trend: '+2.1%',
      trendUp: true,
      icon: CheckCircle,
      color: '#059669',
    },
    {
      title: 'Avg Response Time',
      value: '2.4h',
      trend: '-0.3h',
      trendUp: true,
      icon: Clock,
      color: '#2563EB',
    },
    {
      title: 'Equipment Uptime',
      value: '98.7%',
      trend: '+1.2%',
      trendUp: true,
      icon: TrendingUp,
      color: '#059669',
    },
    {
      title: 'Critical Issues',
      value: '2',
      trend: '-1',
      trendUp: true,
      icon: AlertTriangle,
      color: '#DC2626',
    },
  ];

  const maintenanceTypes = [
    { type: 'Preventive', count: 47, percentage: 67, color: '#059669' },
    { type: 'Corrective', count: 18, percentage: 26, color: '#D97706' },
    { type: 'Emergency', count: 5, percentage: 7, color: '#DC2626' },
  ];

  const recentReports = [
    {
      id: 1,
      title: 'Monthly Maintenance Report',
      date: '2024-12-20',
      type: 'Monthly',
      status: 'completed',
    },
    {
      id: 2,
      title: 'Equipment Health Assessment',
      date: '2024-12-18',
      type: 'Assessment',
      status: 'completed',
    },
    {
      id: 3,
      title: 'Cost Analysis Report',
      date: '2024-12-15',
      type: 'Financial',
      status: 'completed',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Analytics & Reports</Text>
        <TouchableOpacity style={styles.exportButton}>
          <BarChart3 size={20} color="#2563EB" />
        </TouchableOpacity>
      </View>

      {/* Period Selector */}
      <ScrollView 
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.periodContainer}
        contentContainerStyle={styles.periodContent}
      >
        {periods.map((period) => (
          <TouchableOpacity
            key={period.key}
            style={[
              styles.periodButton,
              selectedPeriod === period.key && styles.activePeriodButton
            ]}
            onPress={() => setSelectedPeriod(period.key)}
          >
            <Text
              style={[
                styles.periodText,
                selectedPeriod === period.key && styles.activePeriodText
              ]}
            >
              {period.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        {/* KPIs */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Performance Indicators</Text>
          <View style={styles.kpiGrid}>
            {kpis.map((kpi, index) => (
              <View key={index} style={styles.kpiCard}>
                <View style={styles.kpiHeader}>
                  <View style={[styles.kpiIconContainer, { backgroundColor: kpi.color + '20' }]}>
                    <kpi.icon size={16} color={kpi.color} />
                  </View>
                  <View style={styles.trendContainer}>
                    {kpi.trendUp ? (
                      <TrendingUp size={12} color="#059669" />
                    ) : (
                      <TrendingDown size={12} color="#DC2626" />
                    )}
                    <Text style={[styles.trendText, { color: kpi.trendUp ? '#059669' : '#DC2626' }]}>
                      {kpi.trend}
                    </Text>
                  </View>
                </View>
                <Text style={styles.kpiValue}>{kpi.value}</Text>
                <Text style={styles.kpiTitle}>{kpi.title}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Maintenance Breakdown */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Maintenance Breakdown</Text>
          <View style={styles.breakdownCard}>
            {maintenanceTypes.map((type, index) => (
              <View key={index} style={styles.breakdownItem}>
                <View style={styles.breakdownHeader}>
                  <Text style={styles.breakdownType}>{type.type}</Text>
                  <Text style={styles.breakdownCount}>{type.count}</Text>
                </View>
                <View style={styles.progressBar}>
                  <View 
                    style={[
                      styles.progressFill, 
                      { 
                        width: `${type.percentage}%`,
                        backgroundColor: type.color
                      }
                    ]} 
                  />
                </View>
                <Text style={styles.percentageText}>{type.percentage}%</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Recent Reports */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Reports</Text>
            <TouchableOpacity>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {recentReports.map((report) => (
            <TouchableOpacity key={report.id} style={styles.reportCard}>
              <View style={styles.reportInfo}>
                <Text style={styles.reportTitle}>{report.title}</Text>
                <Text style={styles.reportType}>{report.type}</Text>
                <View style={styles.reportMeta}>
                  <Calendar size={12} color="#6B7280" />
                  <Text style={styles.reportDate}>{report.date}</Text>
                </View>
              </View>
              <View style={styles.reportStatus}>
                <CheckCircle size={16} color="#059669" />
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Generate Report Button */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.generateButton}>
            <BarChart3 size={20} color="#FFFFFF" />
            <Text style={styles.generateButtonText}>Generate New Report</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  exportButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  periodContainer: {
    paddingLeft: 20,
    marginVertical: 16,
  },
  periodContent: {
    gap: 8,
    paddingRight: 20,
  },
  periodButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  activePeriodButton: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  periodText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  activePeriodText: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  viewAllText: {
    fontSize: 14,
    color: '#2563EB',
    fontWeight: '600',
  },
  kpiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  kpiCard: {
    width: (width - 52) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  kpiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  kpiIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trendContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  trendText: {
    fontSize: 10,
    fontWeight: '600',
  },
  kpiValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  kpiTitle: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  breakdownCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  breakdownItem: {
    marginBottom: 20,
  },
  breakdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  breakdownType: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  breakdownCount: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    marginBottom: 4,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  percentageText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'right',
  },
  reportCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  reportInfo: {
    flex: 1,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  reportType: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 8,
  },
  reportMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  reportDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  reportStatus: {
    marginLeft: 12,
  },
  generateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    backgroundColor: '#2563EB',
    borderRadius: 12,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  generateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});