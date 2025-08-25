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
import { Search, Filter, Plus, MapPin, Calendar, CircleAlert as AlertCircle, CircleCheck as CheckCircle } from 'lucide-react-native';

export default function EquipmentScreen() {
  const [searchQuery, setSearchQuery] = useState('');

  const equipment = [
    {
      id: 1,
      name: 'HVAC Unit #1',
      type: 'Air Conditioning',
      location: 'Building A - Floor 3',
      status: 'operational',
      lastMaintenance: '2024-12-15',
      nextMaintenance: '2024-12-27',
      healthScore: 92,
    },
    {
      id: 2,
      name: 'Generator #2',
      type: 'Emergency Power',
      location: 'Basement - Room B12',
      status: 'warning',
      lastMaintenance: '2024-11-28',
      nextMaintenance: '2024-12-26',
      healthScore: 78,
    },
    {
      id: 3,
      name: 'Fire Pump',
      type: 'Safety Equipment',
      location: 'Utility Room',
      status: 'operational',
      lastMaintenance: '2024-12-10',
      nextMaintenance: '2024-12-28',
      healthScore: 95,
    },
    {
      id: 4,
      name: 'Elevator #1',
      type: 'Transportation',
      location: 'Building A - Central',
      status: 'critical',
      lastMaintenance: '2024-12-01',
      nextMaintenance: '2024-12-25',
      healthScore: 65,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return '#059669';
      case 'warning': return '#D97706';
      case 'critical': return '#DC2626';
      default: return '#6B7280';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return CheckCircle;
      case 'warning': return AlertCircle;
      case 'critical': return AlertCircle;
      default: return CheckCircle;
    }
  };

  const getHealthColor = (score: number) => {
    if (score >= 90) return '#059669';
    if (score >= 70) return '#D97706';
    return '#DC2626';
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Equipment</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={16} color="#6B7280" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search equipment..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={16} color="#6B7280" />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.equipmentList}>
          {equipment.map((item) => {
            const StatusIcon = getStatusIcon(item.status);
            return (
              <TouchableOpacity key={item.id} style={styles.equipmentCard}>
                <View style={styles.equipmentHeader}>
                  <View style={styles.equipmentInfo}>
                    <Text style={styles.equipmentName}>{item.name}</Text>
                    <Text style={styles.equipmentType}>{item.type}</Text>
                  </View>
                  <View style={styles.statusContainer}>
                    <StatusIcon size={16} color={getStatusColor(item.status)} />
                    <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
                      {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                    </Text>
                  </View>
                </View>

                <View style={styles.equipmentDetails}>
                  <View style={styles.detailRow}>
                    <MapPin size={14} color="#6B7280" />
                    <Text style={styles.detailText}>{item.location}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Calendar size={14} color="#6B7280" />
                    <Text style={styles.detailText}>Next: {item.nextMaintenance}</Text>
                  </View>
                </View>

                <View style={styles.healthScoreContainer}>
                  <Text style={styles.healthLabel}>Health Score</Text>
                  <View style={styles.healthScoreBar}>
                    <View 
                      style={[
                        styles.healthScoreFill, 
                        { 
                          width: `${item.healthScore}%`,
                          backgroundColor: getHealthColor(item.healthScore)
                        }
                      ]} 
                    />
                  </View>
                  <Text style={[styles.healthScore, { color: getHealthColor(item.healthScore) }]}>
                    {item.healthScore}%
                  </Text>
                </View>
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
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  searchInputContainer: {
    flex: 1,
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
  filterButton: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  scrollView: {
    flex: 1,
  },
  equipmentList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  equipmentCard: {
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
  equipmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  equipmentInfo: {
    flex: 1,
  },
  equipmentName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  equipmentType: {
    fontSize: 14,
    color: '#6B7280',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  equipmentDetails: {
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
  },
  healthScoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  healthLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    width: 80,
  },
  healthScoreBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  healthScoreFill: {
    height: '100%',
    borderRadius: 3,
  },
  healthScore: {
    fontSize: 12,
    fontWeight: '700',
    width: 35,
    textAlign: 'right',
  },
});