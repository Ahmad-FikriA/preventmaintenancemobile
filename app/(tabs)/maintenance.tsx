import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Plus, Calendar, Clock, Repeat as RepeatIcon, Settings, CircleCheck as CheckCircle, CircleAlert as AlertCircle } from 'lucide-react-native';

export default function MaintenanceScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const maintenanceSchedules = [
    {
      id: 1,
      title: 'HVAC System Maintenance',
      equipment: 'HVAC Unit #1',
      frequency: 'Monthly',
      lastCompleted: '2024-12-15',
      nextDue: '2024-12-27',
      status: 'upcoming',
      tasks: [
        'Replace air filters',
        'Check refrigerant levels',
        'Clean coils',
        'Inspect belts and connections'
      ],
    },
    {
      id: 2,
      title: 'Generator Service',
      equipment: 'Generator #2',
      frequency: 'Quarterly',
      lastCompleted: '2024-11-28',
      nextDue: '2024-12-26',
      status: 'due',
      tasks: [
        'Change engine oil',
        'Replace oil filter',
        'Check battery',
        'Test automatic start'
      ],
    },
    {
      id: 3,
      title: 'Fire Safety Inspection',
      equipment: 'Fire Pump',
      frequency: 'Monthly',
      lastCompleted: '2024-12-10',
      nextDue: '2024-12-28',
      status: 'upcoming',
      tasks: [
        'Test pump operation',
        'Check pressure levels',
        'Inspect valves',
        'Review control panel'
      ],
    },
    {
      id: 4,
      title: 'Elevator Maintenance',
      equipment: 'Elevator #1',
      frequency: 'Weekly',
      lastCompleted: '2024-12-01',
      nextDue: '2024-12-25',
      status: 'overdue',
      tasks: [
        'Lubricate moving parts',
        'Check safety systems',
        'Test emergency features',
        'Clean and inspect cab'
      ],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return '#2563EB';
      case 'due': return '#D97706';
      case 'overdue': return '#DC2626';
      case 'completed': return '#059669';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'upcoming': return Clock;
      case 'due': return AlertCircle;
      case 'overdue': return AlertCircle;
      case 'completed': return CheckCircle;
      default: return Clock;
    }
  };

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case 'Daily': return '#DC2626';
      case 'Weekly': return '#EA580C';
      case 'Monthly': return '#D97706';
      case 'Quarterly': return '#2563EB';
      case 'Annually': return '#059669';
      default: return '#6B7280';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Maintenance Schedules</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={16} color="#6B7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search schedules..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.schedulesList}>
          {maintenanceSchedules.map((schedule) => {
            const StatusIcon = getStatusIcon(schedule.status);
            return (
              <TouchableOpacity key={schedule.id} style={styles.scheduleCard}>
                <View style={styles.scheduleHeader}>
                  <View style={styles.scheduleInfo}>
                    <Text style={styles.scheduleTitle}>{schedule.title}</Text>
                    <Text style={styles.equipmentName}>{schedule.equipment}</Text>
                  </View>
                  <View style={styles.statusContainer}>
                    <StatusIcon size={16} color={getStatusColor(schedule.status)} />
                    <Text style={[styles.statusText, { color: getStatusColor(schedule.status) }]}>
                      {schedule.status.replace('_', ' ').toUpperCase()}
                    </Text>
                  </View>
                </View>

                <View style={styles.frequencyContainer}>
                  <RepeatIcon size={14} color={getFrequencyColor(schedule.frequency)} />
                  <Text style={[styles.frequencyText, { color: getFrequencyColor(schedule.frequency) }]}>
                    {schedule.frequency}
                  </Text>
                </View>

                <View style={styles.dateContainer}>
                  <View style={styles.dateItem}>
                    <Text style={styles.dateLabel}>Last Completed</Text>
                    <Text style={styles.dateValue}>{schedule.lastCompleted}</Text>
                  </View>
                  <View style={styles.dateItem}>
                    <Text style={styles.dateLabel}>Next Due</Text>
                    <Text style={styles.dateValue}>{schedule.nextDue}</Text>
                  </View>
                </View>

                <View style={styles.tasksContainer}>
                  <Text style={styles.tasksTitle}>Tasks ({schedule.tasks.length})</Text>
                  {schedule.tasks.slice(0, 3).map((task, index) => (
                    <Text key={index} style={styles.taskItem}>• {task}</Text>
                  ))}
                  {schedule.tasks.length > 3 && (
                    <Text style={styles.moreTasksText}>
                      +{schedule.tasks.length - 3} more tasks
                    </Text>
                  )}
                </View>

                <TouchableOpacity style={styles.viewButton}>
                  <Settings size={16} color="#2563EB" />
                  <Text style={styles.viewButtonText}>View Details</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            );
          })}
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
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2563EB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    paddingVertical: 12,
  },
  scrollView: {
    flex: 1,
  },
  schedulesList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  scheduleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  scheduleInfo: {
    flex: 1,
    marginRight: 12,
  },
  scheduleTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  equipmentName: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
  },
  frequencyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 16,
  },
  frequencyText: {
    fontSize: 12,
    fontWeight: '600',
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#F8FAFC',
    borderRadius: 8,
  },
  dateItem: {
    alignItems: 'center',
  },
  dateLabel: {
    fontSize: 11,
    color: '#6B7280',
    fontWeight: '500',
    marginBottom: 4,
  },
  dateValue: {
    fontSize: 12,
    color: '#374151',
    fontWeight: '600',
  },
  tasksContainer: {
    marginBottom: 16,
  },
  tasksTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  taskItem: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
    lineHeight: 16,
  },
  moreTasksText: {
    fontSize: 12,
    color: '#2563EB',
    fontWeight: '500',
    marginTop: 4,
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#2563EB',
  },
  viewButtonText: {
    color: '#2563EB',
    fontSize: 14,
    fontWeight: '600',
  },
});